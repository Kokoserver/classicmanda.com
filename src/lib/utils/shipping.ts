/**
 * Dynamic shipping utility that determines free shipping eligibility
 * based on order volume and random thresholds
 */

interface ShippingStatus {
	isFreeShipping: boolean;
	message: string;
	ordersLeft?: number;
	nextThreshold?: number;
}

class ShippingManager {
	private static instance: ShippingManager;
	private orderCount: number = 0;
	private currentThreshold: number = 0;
	private lastUpdate: number = 0;

	private constructor() {
		this.loadFromStorage();
		this.generateNewThreshold();
	}

	static getInstance(): ShippingManager {
		if (!ShippingManager.instance) {
			ShippingManager.instance = new ShippingManager();
		}
		return ShippingManager.instance;
	}

	private loadFromStorage(): void {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('velvetsupply-shipping');
			if (stored) {
				const data = JSON.parse(stored);
				this.orderCount = data.orderCount || 0;
				this.currentThreshold = data.currentThreshold || 0;
				this.lastUpdate = data.lastUpdate || 0;
			}
		}
	}

	private saveToStorage(): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem('velvetsupply-shipping', JSON.stringify({
				orderCount: this.orderCount,
				currentThreshold: this.currentThreshold,
				lastUpdate: this.lastUpdate
			}));
		}
	}

	private generateNewThreshold(): void {
		// Generate random threshold between 5-25 orders
		this.currentThreshold = Math.floor(Math.random() * 21) + 5;
		this.lastUpdate = Date.now();
		this.saveToStorage();
	}

	// Simulate adding an order (call this when someone places an order)
	addOrder(): void {
		this.orderCount++;
		this.saveToStorage();
	}

	// Check if we should reset the threshold (every 24 hours)
	private checkForReset(): void {
		const now = Date.now();
		const hoursSinceUpdate = (now - this.lastUpdate) / (1000 * 60 * 60);
		
		if (hoursSinceUpdate >= 24) {
			this.orderCount = 0;
			this.generateNewThreshold();
		}
	}

	getShippingStatus(): ShippingStatus {
		this.checkForReset();

		const ordersLeft = Math.max(0, this.currentThreshold - this.orderCount);
		const isFreeShipping = this.orderCount >= this.currentThreshold;

		if (isFreeShipping) {
			return {
				isFreeShipping: true,
				message: "🎉 FREE SHIPPING UNLOCKED! All orders ship free today!"
			};
		}

		// Create urgency messages based on how close we are
		let message: string;
		if (ordersLeft <= 3) {
			message = `🔥 Only ${ordersLeft} more orders needed for FREE SHIPPING for everyone!`;
		} else if (ordersLeft <= 10) {
			message = `⚡ ${ordersLeft} orders away from FREE SHIPPING for all customers!`;
		} else {
			message = `📦 ${ordersLeft} more orders needed to unlock FREE SHIPPING!`;
		}

		return {
			isFreeShipping: false,
			message,
			ordersLeft,
			nextThreshold: this.currentThreshold
		};
	}

	// Get current stats for admin
	getStats() {
		return {
			currentOrders: this.orderCount,
			threshold: this.currentThreshold,
			ordersLeft: Math.max(0, this.currentThreshold - this.orderCount),
			lastReset: new Date(this.lastUpdate).toLocaleString()
		};
	}

	// Admin function to manually trigger free shipping
	forceActivateFreeShipping(): void {
		this.orderCount = this.currentThreshold;
		this.saveToStorage();
	}

	// Admin function to reset the system
	reset(): void {
		this.orderCount = 0;
		this.generateNewThreshold();
	}
}

export const shippingManager = ShippingManager.getInstance();
export type { ShippingStatus };
