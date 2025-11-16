export interface User {
    id: string;
    email: string;
    created_at: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    created_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    product_id: string;
    quantity: number;
    created_at: string;
}

export interface AuthResponse {
    user: User;
    access_token: string;
}

export interface ApiResponse<T> {
    data: T;
    error: string | null;
}