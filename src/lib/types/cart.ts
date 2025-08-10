import type { Product } from './product.js';

export interface CartItem {
	product: Product;
	quantity: number;
	addedAt: string;
}

export interface Cart {
	items: CartItem[];
	total: number;
	itemCount: number;
}

export interface CheckoutData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
	};
	notes?: string;
}
