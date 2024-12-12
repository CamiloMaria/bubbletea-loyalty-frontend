import apiClient from './axios';
import type { LoginCredentials, LoginResponse } from '../types/api';

export const authApi = {
    async login(credentials: LoginCredentials) {
        const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.employee));
        return data;
    },

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    async getProfile() {
        const { data } = await apiClient.get('/auth/profile');
        return data;
    },

    async renewToken() {
        const { data } = await apiClient.get<LoginResponse>('/auth/renew');
        localStorage.setItem('token', data.access_token);
        return data;
    },
};