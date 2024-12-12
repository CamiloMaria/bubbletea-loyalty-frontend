import apiClient from './axios';
import type { Customer, PurchaseHistory, FindCustomersParams, CustomersResponse } from '../types/api';

export const customersApi = {
    async getAll(params: FindCustomersParams = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, value.toString());
            }
        });

        const { data } = await apiClient.get<CustomersResponse>(`/customers?${queryParams.toString()}`);
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

    async getPurchaseHistory(id: string) {
        const { data } = await apiClient.get<PurchaseHistory[]>(`/customers/${id}/history`);
        return data;
    }
};
