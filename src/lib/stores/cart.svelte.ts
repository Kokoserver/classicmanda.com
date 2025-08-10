import type { Cart } from '../types/cart.js';
import type { Product } from '../types/product.js';
import { cartService } from '../services/cartService.js';

class CartStore {
	private _cart = $state<Cart>({ items: [], total: 0, itemCount: 0 });

	get cart() {
		return this._cart;
	}

	init() {
		const cart = cartService.getCart();
		this._cart = cart;
	}

	addItem(product: Product, quantity: number = 1) {
		const updatedCart = cartService.addToCart(product, quantity);
		this._cart = updatedCart;
	}

	removeItem(productId: string) {
		const updatedCart = cartService.removeFromCart(productId);
		this._cart = updatedCart;
	}

	updateQuantity(productId: string, quantity: number) {
		const updatedCart = cartService.updateQuantity(productId, quantity);
		this._cart = updatedCart;
	}

	clear() {
		const emptyCart = cartService.clearCart();
		this._cart = emptyCart;
	}
}

export const cart = new CartStore();
