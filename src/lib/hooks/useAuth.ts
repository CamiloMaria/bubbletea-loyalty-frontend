import { create } from 'zustand';
import { authApi } from '../api/auth';
import { Employee, LoginCredentials, LoginResponse } from '../types/api';

interface AuthState {
    user: Employee | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<LoginResponse>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async (credentials) => {
        try {
            const response = await authApi.login(credentials);
            set({
                user: response.user,
                isAuthenticated: true
            });
            console.log('response', response)
            return response; 
        } catch (error) {
            set({ user: null, isAuthenticated: false })
            throw error
        }
    },
    logout: async () => {
        try {
            await authApi.logout();
            set({ user: null, isAuthenticated: false });
            window.location.href = '/login';
        } catch (error) {
            console.error('Error during logout:', error)
        }
    },
    checkAuth: async () => {
        try {
            set({ isLoading: true })
            const user = await authApi.getProfile()
            set({
                user: {
                    ...user,
                    id: user._id,
                },
                isAuthenticated: true
            })
        } catch {
            set({ user: null, isAuthenticated: false })
        } finally {
            set({ isLoading: false })
        }
    },
}))