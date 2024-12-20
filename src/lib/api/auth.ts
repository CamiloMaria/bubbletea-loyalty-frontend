import apiClient from './axios';
import type { LoginCredentials, LoginResponse, Profile } from '../types/api';

export const authApi = {
    async login(credentials: LoginCredentials) {
        const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
        return data;
    },

    async logout() {
        const { data } = await apiClient.post('/auth/logout');
        return data;
    },

    async getProfile() {
        const { data } = await apiClient.get<Profile>('/auth/profile');
        return data;
    },

    async renewToken() {
        const { data } = await apiClient.get<LoginResponse>('/auth/renew');
        return data;
    },
};