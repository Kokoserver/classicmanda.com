import type { Product, ProductFilter } from '../types/product.js';
import { ProductCategory } from '../types/product.js';
import { apiClient } from '../api/client.js';
import { config } from '../config/env.js';
import { mockProducts } from '../data/mockProducts.js';

export class ProductService {
	async getProducts(filter?: ProductFilter): Promise<Product[]> {
		if (config.useMockData) {
			return this.filterMockProducts(filter);
		}

		try {
			const response = await apiClient.get<Product[]>('/products');
			if (response.success) {
				return response.data;
			}
			throw new Error(response.error || 'Failed to fetch products');
		} catch (error) {
			return this.filterMockProducts(filter);
		}
	}

	async getProduct(id: string): Promise<Product | null> {
		if (config.useMockData) {
			return mockProducts.find((p) => p.id === id) || null;
		}

		try {
			const response = await apiClient.get<Product>(`/products/${id}`);
			if (response.success) {
				return response.data;
			}
			return null;
		} catch (error) {
			return mockProducts.find((p) => p.id === id) || null;
		}
	}

	async getFeaturedProducts(): Promise<Product[]> {
		const products = await this.getProducts({ featured: true });
		return products.slice(0, 6);
	}

	async getPopularProducts(): Promise<Product[]> {
		const products = await this.getProducts({ popular: true });
		return products.slice(0, 6);
	}

	async getRecentProducts(): Promise<Product[]> {
		const products = await this.getProducts({ recent: true });
		return products.slice(0, 6);
	}

	async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
		return this.getProducts({ category });
	}

	async searchProducts(query: string): Promise<Product[]> {
		const products = await this.getProducts();
		return products.filter(
			(product) =>
				product.name.toLowerCase().includes(query.toLowerCase()) ||
				product.description.toLowerCase().includes(query.toLowerCase())
		);
	}

	private filterMockProducts(filter?: ProductFilter): Product[] {
		let products = [...mockProducts];

		if (!filter) return products;

		if (filter.category) {
			products = products.filter((p) => p.category === filter.category);
		}

		if (filter.minPrice !== undefined) {
			products = products.filter((p) => p.price >= filter.minPrice!);
		}

		if (filter.maxPrice !== undefined) {
			products = products.filter((p) => p.price <= filter.maxPrice!);
		}

		if (filter.inStock !== undefined) {
			products = products.filter((p) => p.inStock === filter.inStock);
		}

		if (filter.featured !== undefined) {
			products = products.filter((p) => p.featured === filter.featured);
		}

		if (filter.popular !== undefined) {
			products = products.filter((p) => p.popular === filter.popular);
		}

		if (filter.recent !== undefined) {
			products = products.filter((p) => p.recent === filter.recent);
		}

		if (filter.search) {
			const query = filter.search.toLowerCase();
			products = products.filter(
				(p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
			);
		}

		return products;
	}
}

export const productService = new ProductService();
