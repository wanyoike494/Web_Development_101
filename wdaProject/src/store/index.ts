import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AppState {
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  
  // Data State
  selectedCountry: string | null;
  selectedYear: number;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  setSelectedCountry: (country: string | null) => void;
  setSelectedYear: (year: number) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial State
      sidebarOpen: true,
      theme: 'light',
      loading: false,
      selectedCountry: null,
      selectedYear: new Date().getFullYear(),
      
      // Actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      setLoading: (loading) => set({ loading }),
      setSelectedCountry: (country) => set({ selectedCountry: country }),
      setSelectedYear: (year) => set({ selectedYear: year }),
    }),
    {
      name: 'app-store',
    }
  )
);

export default useAppStore;
