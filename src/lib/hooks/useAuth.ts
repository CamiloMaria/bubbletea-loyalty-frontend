import { create } from 'zustand';
import { authApi } from '../api/auth';
import { Employee, LoginCredentials } from '../types/api';

interface AuthState {
    user: Employee | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async (credentials: LoginCredentials) => {
        try {
            const response = await authApi.login(credentials);
            set({
                user: response.employee,
                isAuthenticated: true
            });
        } catch (error) {
            set({ user: null, isAuthenticated: false });
            throw error;
        }
    },
    logout: async () => {
        await authApi.logout();
        set({ user: null, isAuthenticated: false });
    },
    checkAuth: async () => {
        try {
            set({ isLoading: true });
            const user = localStorage.getItem('user');
            if (user) {
                set({
                    user: JSON.parse(user),
                    isAuthenticated: true
                });
            }
        } catch {
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isLoading: false });
        }
    },
}));