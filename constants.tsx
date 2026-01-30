
import { Severity, AirportZone, IncidentStatus, SecurityLog, Incident, UserRole } from './types';

export const SEVERITY_JUSTIFICATION = {
  [Severity.LOW]: 'Reconnaissance or routine scanning activity. No direct threat to critical services.',
  [Severity.MEDIUM]: 'Repeated failed authentication or unusual patterns. Potential probing of service boundaries.',
  [Severity.HIGH]: 'Unauthorized access attempts or significant traffic anomalies in operational networks.',
  [Severity.CRITICAL]: 'Confirmed breach, DoS, or unauthorized access to restricted security zones or ATC systems.'
};

export const ZONE_IMPACT = {
  [AirportZone.PASSENGER_SERVICES]: {
    impact: 'Operational/Publicity',
    description: 'Affects passenger convenience, public Wi-Fi, and information displays. Low safety risk.'
  },
  [AirportZone.AIRPORT_OPERATIONS]: {
    impact: 'Business Continuity',
    description: 'Impacts logistics, baggage handling, and ground movement. High economic impact.'
  },
  [AirportZone.AIR_TRAFFIC_SUPPORT]: {
    impact: 'Life-Safety Critical',
    description: 'Affects primary radar, navigation aids, and ATC communications. Absolute priority.'
  },
  [AirportZone.RESTRICTED_SECURITY]: {
    impact: 'Physical Security',
    description: 'Risk of unauthorized physical access to airside or sensitive infrastructure.'
  }
};

export const INITIAL_LOGS: SecurityLog[] = [
  {
    id: 'log-1',
    timestamp: new Date().toISOString(),
    sourceIp: '192.168.1.45',
    destinationSystem: 'Check-in Counter #4',
    zone: AirportZone.PASSENGER_SERVICES,
    eventType: 'Repeated Login Failure',
    severity: Severity.MEDIUM
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    sourceIp: '10.0.4.12',
    destinationSystem: 'ATC Primary Radar Interface',
    zone: AirportZone.AIR_TRAFFIC_SUPPORT,
    eventType: 'Unauthorized Access Attempt',
    severity: Severity.CRITICAL
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    sourceIp: '172.16.0.8',
    destinationSystem: 'Baggage Handling Controller',
    zone: AirportZone.AIRPORT_OPERATIONS,
    eventType: 'Unusual Traffic Spike',
    severity: Severity.HIGH
  }
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2024-001',
    detectionTime: new Date(Date.now() - 3600000).toISOString(),
    zone: AirportZone.AIR_TRAFFIC_SUPPORT,
    severity: Severity.CRITICAL,
    status: IncidentStatus.INVESTIGATING,
    analystNotes: 'Initial investigation shows brute force attempt from internal IP. ATC systems isolated.',
    mitreMapping: {
      tactic: 'Credential Access',
      technique: 'Brute Force (T1110)'
    },
    timeline: [
      { time: new Date(Date.now() - 3600000).toISOString(), event: 'Incident Detected via SIEM' },
      { time: new Date(Date.now() - 3300000).toISOString(), event: 'Automated Playbook: Network Isolation Triggered' },
      { time: new Date(Date.now() - 3000000).toISOString(), event: 'Assigned to Senior Analyst Sarah Connor' }
    ]
  },
  {
    id: 'INC-2024-002',
    detectionTime: new Date(Date.now() - 7200000).toISOString(),
    zone: AirportZone.PASSENGER_SERVICES,
    severity: Severity.MEDIUM,
    status: IncidentStatus.CLOSED,
    analystNotes: 'Resolved as false positive from scheduled baggage system maintenance.',
    mitreMapping: {
      tactic: 'Discovery',
      technique: 'Network Service Scanning (T1046)'
    },
    timeline: [
      { time: new Date(Date.now() - 7200000).toISOString(), event: 'Alert Triggered: Port Scan Detected' },
      { time: new Date(Date.now() - 6000000).toISOString(), event: 'Maintenance Logs Verified' },
      { time: new Date(Date.now() - 3600000).toISOString(), event: 'Resolution Verified and Closed' }
    ]
  }
];
