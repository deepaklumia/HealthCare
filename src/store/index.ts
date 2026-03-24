import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';
import { Patient, ViewMode } from '../types';
import { mockPatients } from '../lib/mockData';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

interface PatientState {
  patients: Patient[];
  viewMode: ViewMode;
  searchQuery: string;
  selectedPatient: Patient | null;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setSelectedPatient: (patient: Patient | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
    }),
    { name: 'auth-store', partialize: (state) => ({ user: state.user }) }
  )
);

export const usePatientStore = create<PatientState>((set) => ({
  patients: mockPatients,
  viewMode: 'grid',
  searchQuery: '',
  selectedPatient: null,
  setViewMode: (viewMode) => set({ viewMode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedPatient: (selectedPatient) => set({ selectedPatient }),
}));
