
export enum Severity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export enum IncidentStatus {
  DETECTED = 'Detected',
  INVESTIGATING = 'Investigating',
  ESCALATED = 'Escalated',
  MITIGATED = 'Mitigated',
  CLOSED = 'Closed'
}

export enum AirportZone {
  PASSENGER_SERVICES = 'Passenger Services Network',
  AIRPORT_OPERATIONS = 'Airport Operations Network',
  AIR_TRAFFIC_SUPPORT = 'Air Traffic Support Systems',
  RESTRICTED_SECURITY = 'Restricted Security Zones'
}

export enum UserRole {
  ANALYST = 'SOC Analyst',
  LEAD = 'SOC Lead',
  ADMIN = 'System Admin'
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationSystem: string;
  zone: AirportZone;
  eventType: string;
  severity: Severity;
}

export interface Incident {
  id: string;
  detectionTime: string;
  zone: AirportZone;
  severity: Severity;
  status: IncidentStatus;
  analystNotes: string;
  mitreMapping: {
    tactic: string;
    technique: string;
  };
  timeline: { time: string; event: string }[];
}

export interface ZoneStatus {
  zone: AirportZone;
  riskLevel: 'Secure' | 'Warning' | 'High Risk' | 'Critical';
  incidentCount: number;
}
