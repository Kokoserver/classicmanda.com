export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: ProductCategory;
	images: string[];
	specifications: Record<string, string>;
	inStock: boolean;
	featured: boolean;
	popular: boolean;
	recent: boolean;
	createdAt: string;
	updatedAt: string;
}

export enum ProductCategory {
	SOLAR_PANELS = 'solar-panels',
	DISHWASHERS = 'dishwashers',
	CHANDELIERS = 'chandeliers',
	BUILDING_MATERIALS = 'building-materials',
	TOOLS = 'tools'
}

export interface ProductFilter {
	category?: ProductCategory;
	minPrice?: number;
	maxPrice?: number;
	inStock?: boolean;
	featured?: boolean;
	popular?: boolean;
	recent?: boolean;
	search?: string;
}
