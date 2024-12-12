import apiClient from './axios';
import type { Customer } from '../types/api';

export const customersApi = {
    async getAll() {
        const { data } = await apiClient.get<Customer[]>('/customers');
        return data;
    },

    async getOne(id: string) {
        const { data } = await apiClient.get<Customer>(`/customers/${id}`);
        return data;
    },

    async create(customerData: Partial<Customer>) {
        const { data } = await apiClient.post<Customer>('/customers', customerData);
        return data;
    },

    async addPurchase(id: string) {
        const { data } = await apiClient.put<Customer>(`/customers/${id}/purchase`);
        return data;
    },

    async redeemFreeDrink(id: string) {
        const { data } = await apiClient.put<Customer>(`/customers/${id}/redeem`);
        return data;
    },

    async verifyQR(code: string) {
        const { data } = await apiClient.get<Customer>(`/customers/verify/${code}`);
        return data;
    },
};
