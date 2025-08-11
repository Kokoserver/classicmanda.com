import type { Cart } from '../types/cart.js';
import type { Product } from '../types/product.js';

export class CartService {
	private storageKey = 'velvetsupply_cart';

	getCart(): Cart {
		if (typeof window === 'undefined') {
			return { items: [], total: 0, itemCount: 0 };
		}

		try {
			const stored = localStorage.getItem(this.storageKey);
			if (stored) {
				const cart = JSON.parse(stored) as Cart;
				return this.calculateTotals(cart);
			}
		} catch (error) {
			console.error('Error loading cart:', error);
		}

		return { items: [], total: 0, itemCount: 0 };
	}

	addToCart(product: Product, quantity: number = 1): Cart {
		const cart = this.getCart();
		const existingItem = cart.items.find((item) => item.product.id === product.id);

		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			cart.items.push({
				product,
				quantity,
				addedAt: new Date().toISOString()
			});
		}

		const updatedCart = this.calculateTotals(cart);
		this.saveCart(updatedCart);
		return updatedCart;
	}

	removeFromCart(productId: string): Cart {
		const cart = this.getCart();
		cart.items = cart.items.filter((item) => item.product.id !== productId);

		const updatedCart = this.calculateTotals(cart);
		this.saveCart(updatedCart);
		return updatedCart;
	}

	updateQuantity(productId: string, quantity: number): Cart {
		const cart = this.getCart();
		const item = cart.items.find((item) => item.product.id === productId);

		if (item) {
			if (quantity <= 0) {
				return this.removeFromCart(productId);
			}
			item.quantity = quantity;
		}

		const updatedCart = this.calculateTotals(cart);
		this.saveCart(updatedCart);
		return updatedCart;
	}

	clearCart(): Cart {
		const emptyCart = { items: [], total: 0, itemCount: 0 };
		this.saveCart(emptyCart);
		return emptyCart;
	}

	private calculateTotals(cart: Cart): Cart {
		cart.total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
		cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
		return cart;
	}

	private saveCart(cart: Cart): void {
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem(this.storageKey, JSON.stringify(cart));
			} catch (error) {
				console.error('Error saving cart:', error);
			}
		}
	}
}

export const cartService = new CartService();
