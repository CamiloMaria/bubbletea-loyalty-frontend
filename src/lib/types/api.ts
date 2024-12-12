export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

export interface LoginResponse {
    access_token: string;
    employee: {
        id: string;
        email: string;
        name: string;
        role: string;
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

export interface Customer {
    _id: string;
    name: string;
    email: string;
    qrCode: string;
    purchaseCount: number;
    hasFreeDrink: boolean;
    isActive: boolean;
    history?: PurchaseHistory[];
    createdAt: string;
    updatedAt: string;
}

export interface Employee {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive?: boolean;
}