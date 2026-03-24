export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  status: 'Active' | 'Inactive' | 'Critical';
  lastVisit: string;
  doctor: string;
  email: string;
  phone: string;
}

export interface AnalyticsData {
  month: string;
  patients: number;
  appointments: number;
  revenue: number;
}

export type ViewMode = 'grid' | 'list';
