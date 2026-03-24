import { Patient, AnalyticsData } from '../types';

export const mockPatients: Patient[] = [
  { id: '1', name: 'Alice Johnson', age: 34, gender: 'Female', condition: 'Hypertension', status: 'Active', lastVisit: '2024-05-10', doctor: 'Dr. Smith', email: 'alice@example.com', phone: '+1-555-0101' },
  { id: '2', name: 'Bob Martinez', age: 52, gender: 'Male', condition: 'Diabetes Type 2', status: 'Active', lastVisit: '2024-05-08', doctor: 'Dr. Patel', email: 'bob@example.com', phone: '+1-555-0102' },
  { id: '3', name: 'Carol White', age: 28, gender: 'Female', condition: 'Asthma', status: 'Inactive', lastVisit: '2024-04-20', doctor: 'Dr. Lee', email: 'carol@example.com', phone: '+1-555-0103' },
  { id: '4', name: 'David Brown', age: 67, gender: 'Male', condition: 'Cardiac Arrhythmia', status: 'Critical', lastVisit: '2024-05-12', doctor: 'Dr. Smith', email: 'david@example.com', phone: '+1-555-0104' },
  { id: '5', name: 'Eva Garcia', age: 45, gender: 'Female', condition: 'Migraine', status: 'Active', lastVisit: '2024-05-01', doctor: 'Dr. Patel', email: 'eva@example.com', phone: '+1-555-0105' },
  { id: '6', name: 'Frank Wilson', age: 39, gender: 'Male', condition: 'Anxiety Disorder', status: 'Active', lastVisit: '2024-04-28', doctor: 'Dr. Lee', email: 'frank@example.com', phone: '+1-555-0106' },
  { id: '7', name: 'Grace Kim', age: 58, gender: 'Female', condition: 'Osteoporosis', status: 'Inactive', lastVisit: '2024-03-15', doctor: 'Dr. Smith', email: 'grace@example.com', phone: '+1-555-0107' },
  { id: '8', name: 'Henry Davis', age: 71, gender: 'Male', condition: 'COPD', status: 'Critical', lastVisit: '2024-05-11', doctor: 'Dr. Patel', email: 'henry@example.com', phone: '+1-555-0108' },
];

export const analyticsData: AnalyticsData[] = [
  { month: 'Jan', patients: 120, appointments: 180, revenue: 45000 },
  { month: 'Feb', patients: 135, appointments: 200, revenue: 52000 },
  { month: 'Mar', patients: 148, appointments: 220, revenue: 58000 },
  { month: 'Apr', patients: 162, appointments: 245, revenue: 63000 },
  { month: 'May', patients: 175, appointments: 260, revenue: 71000 },
  { month: 'Jun', patients: 190, appointments: 285, revenue: 78000 },
];
