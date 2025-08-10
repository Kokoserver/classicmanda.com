import type { Product, ProductFilter } from '../types/product.js';
import { ProductCategory } from '../types/product.js';
import { productService } from '../services/productService.js';

class ProductsStore {
	private _products = $state<Product[]>([]);

	get products() {
		return this._products;
	}

	async loadAll() {
		const products = await productService.getProducts();
		this._products = products;
		return products;
	}

	async loadProducts(filter?: ProductFilter) {
		const products = await productService.getProducts(filter);
		this._products = products;
		return products;
	}

	async loadFeatured() {
		const products = await productService.getFeaturedProducts();
		return products;
	}

	async loadPopular() {
		const products = await productService.getPopularProducts();
		return products;
	}

	async loadRecent() {
		const products = await productService.getRecentProducts();
		return products;
	}

	async loadByCategory(category: ProductCategory) {
		const products = await productService.getProductsByCategory(category);
		this._products = products;
		return products;
	}

	async search(query: string) {
		const products = await productService.searchProducts(query);
		this._products = products;
		return products;
	}
}

export const products = new ProductsStore();
