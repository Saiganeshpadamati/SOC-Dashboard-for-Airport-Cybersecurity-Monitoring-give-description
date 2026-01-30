
import React, { useState, useEffect } from 'react';
import { Severity, IncidentStatus, AirportZone, SecurityLog, Incident, UserRole } from './types';
import { INITIAL_LOGS, INITIAL_INCIDENTS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import LogsView from './views/LogsView';
import IncidentsView from './views/IncidentsView';
import ComplianceView from './views/ComplianceView';
import SettingsView from './views/SettingsView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'logs' | 'incidents' | 'compliance' | 'settings'>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ANALYST);
  const [logs, setLogs] = useState<SecurityLog[]>(INITIAL_LOGS);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [autoPromotion, setAutoPromotion] = useState(true);

  // Simulate incoming logs
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: SecurityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        sourceIp: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        destinationSystem: 'Simulation Node',
        zone: Object.values(AirportZone)[Math.floor(Math.random() * 4)],
        eventType: ['Port Scan', 'SQL Injection Attempt', 'Beaconing Detected', 'Large Data Transfer'][Math.floor(Math.random() * 4)],
        severity: Object.values(Severity)[Math.floor(Math.random() * 4)]
      };
      
      setLogs(prev => {
        const updatedLogs = [newLog, ...prev.slice(0, 49)];
        // Auto-promotion logic simulation
        if (autoPromotion && newLog.severity === Severity.CRITICAL) {
           setTimeout(() => createIncidentFromLog(newLog), 500);
        }
        return updatedLogs;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [autoPromotion]);

  const handleResetSystem = () => {
    setLogs(INITIAL_LOGS);
    setIncidents(INITIAL_INCIDENTS);
    setActiveTab('dashboard');
    console.log("SOC System State Reset to Defaults.");
  };

  const updateIncidentStatus = (id: string, newStatus: IncidentStatus, notes: string) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === id ? { 
        ...inc, 
        status: newStatus, 
        analystNotes: notes,
        timeline: [...inc.timeline, { time: new Date().toISOString(), event: `Status updated to ${newStatus}` }]
      } : inc
    ));
  };

  const createIncidentFromLog = (log: SecurityLog) => {
    setIncidents(prev => {
      // Prevent duplicate incidents for the same log ID
      if (prev.some(inc => inc.analystNotes.includes(log.id))) return prev;

      const newIncident: Incident = {
        id: `INC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        detectionTime: log.timestamp,
        zone: log.zone,
        severity: log.severity,
        status: IncidentStatus.DETECTED,
        analystNotes: `[Ref: ${log.id}] Auto-generated from log entry: ${log.eventType}`,
        mitreMapping: {
          tactic: 'Initial Access',
          technique: 'Exploit Public-Facing Application (T1190)'
        },
        timeline: [{ time: new Date().toISOString(), event: 'Incident Created from Security Log' }]
      };
      return [newIncident, ...prev];
    });
    
    // Only navigate if it wasn't an auto-promotion background task
    if (activeTab === 'logs') setActiveTab('incidents');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header userRole={userRole} setUserRole={setUserRole} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && <DashboardView logs={logs} incidents={incidents} />}
          {activeTab === 'logs' && <LogsView logs={logs} onCreateIncident={createIncidentFromLog} />}
          {activeTab === 'incidents' && (
            <IncidentsView 
              incidents={incidents} 
              userRole={userRole} 
              onUpdateStatus={updateIncidentStatus} 
            />
          )}
          {activeTab === 'compliance' && <ComplianceView />}
          {activeTab === 'settings' && (
            <SettingsView 
              userRole={userRole} 
              setUserRole={setUserRole} 
              onReset={handleResetSystem}
              autoPromotion={autoPromotion}
              setAutoPromotion={setAutoPromotion}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
