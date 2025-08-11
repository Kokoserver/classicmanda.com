import type { Order, OrderStatus, ContactForm } from '../types/order.js';
import type { Cart, CheckoutData } from '../types/cart.js';
import { apiClient } from '../api/client.js';

// Use mock data for development
const useMockData = true;

export class OrderService {
	async createOrder(cart: Cart, customerInfo: CheckoutData): Promise<Order> {
		const order: Order = {
			id: this.generateOrderId(),
			items: cart.items,
			customerInfo,
			total: cart.total,
			status: 'pending' as OrderStatus,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		if (useMockData) {
			return order;
		}

		try {
			const response = await apiClient.post<Order>('/orders', order);
			if (response.success) {
				return response.data;
			}
			throw new Error(response.error || 'Failed to create order');
		} catch (error) {
			return order;
		}
	}

	async submitContactForm(contactData: ContactForm): Promise<boolean> {
		if (useMockData) {
			return true;
		}

		try {
			const response = await apiClient.post<{ success: boolean }>('/contact', contactData);
			return response.success && response.data.success;
		} catch (error) {
			return false;
		}
	}

	private generateOrderId(): string {
		const timestamp = Date.now().toString(36);
		const random = Math.random().toString(36).substr(2, 5);
		return `CM-${timestamp}-${random}`.toUpperCase();
	}
}

export const orderService = new OrderService();
