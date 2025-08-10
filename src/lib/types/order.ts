import type { CartItem, CheckoutData } from './cart.js';

export interface Order {
	id: string;
	items: CartItem[];
	customerInfo: CheckoutData;
	total: number;
	status: OrderStatus;
	createdAt: string;
	updatedAt: string;
}

export enum OrderStatus {
	PENDING = 'pending',
	CONFIRMED = 'confirmed',
	PROCESSING = 'processing',
	SHIPPED = 'shipped',
	DELIVERED = 'delivered',
	CANCELLED = 'cancelled'
}

export interface ContactForm {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
}
