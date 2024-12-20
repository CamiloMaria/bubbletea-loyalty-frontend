export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

export interface LoginResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
        type: string;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface PurchaseHistory {
    _id: string;
    customerId: string;
    type: 'PURCHASE' | 'REDEEM';
    employeeName: string;
    createdAt: string;
}

export interface Profile {
    _id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
}

export interface Customer {
    _id: string;
    name: string;
    email: string;
    qrCode: string;
    totalPurchases: number;
    hasFreeDrink: boolean;
    isActive: boolean;
    history?: PurchaseHistory[];
    createdAt: string;
    updatedAt: string;
}

export interface CustomersResponse {
    data: Customer[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface FindCustomersParams {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface Employee {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive?: boolean;
}