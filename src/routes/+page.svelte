<script lang="ts">
	import { products } from '$lib/stores/products.svelte.js';
	import type { Product } from '$lib/types/product.js';
	import { ProductCategory } from '$lib/types/product.js';
	import ProductCarousel from '$lib/components/ProductCarousel.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
	import HeroCarousel from '$lib/components/HeroCarousel.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { Search, Star, Clock, TrendingUp } from 'lucide-svelte';

	let featuredProducts = $state<Product[]>([]);
	let popularProducts = $state<Product[]>([]);
	let recentProducts = $state<Product[]>([]);
	let allProducts = $state<Product[]>([]);
	let filteredProducts = $state<Product[]>([]);
	let loading = $state(true);
	let searchQuery = $state('');
	let selectedCategory = $state('');


	$effect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		searchQuery = urlParams.get('search') || '';
		selectedCategory = urlParams.get('category') || '';
		(async () => {
		try {
	
			[featuredProducts, popularProducts, recentProducts, allProducts] = await Promise.all([
				products.loadFeatured(),
				products.loadPopular(),
				products.loadRecent(),
				products.loadProducts()
			]);

			if (searchQuery) {
				filteredProducts = await products.search(searchQuery);
			} else if (selectedCategory) {
				filteredProducts = await products.loadByCategory(selectedCategory as ProductCategory);
			} else {
				filteredProducts = allProducts;
			}
		} catch (error) {
		} finally {
			loading = false;
		}
	})()
	});

	function getCategoryLabel(category: string): string {
		return category
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	const categories = [
		{ value: '', label: 'All Categories', icon: '🏠' },
		{ value: 'solar-panels', label: 'Solar Panels', icon: '☀️' },
		{ value: 'dishwashers', label: 'Dishwashers', icon: '🍽️' },
		{ value: 'chandeliers', label: 'Chandeliers', icon: '💡' },
		{ value: 'building-materials', label: 'Building Materials', icon: '🧱' },
		{ value: 'tools', label: 'Tools', icon: '🔧' }
	];
</script>

<svelte:head>
	<title>Classicmanda - Premium Products for Your Home & Business</title>
	<meta
		name="description"
		content="Discover premium solar panels, dishwashers, chandeliers, building materials, and tools at Classicmanda. Quality products for your home and business needs."
	/>
</svelte:head>

{#if loading}
	<div class="container mx-auto px-4 py-12">
		<div class="flex min-h-[400px] items-center justify-center">
			<div class="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
		</div>
	</div>
{:else}
	<!-- Hero Carousel -->
	{#if !searchQuery && !selectedCategory}
		<HeroCarousel />
	{/if}

	<div class="container mx-auto px-4 py-8">
		<!-- Search Results Header -->
		{#if searchQuery || selectedCategory}
			<div class="mb-8">
				<h1 class="mb-2 text-3xl font-bold">
					{#if searchQuery}
						Search Results for "{searchQuery}"
					{:else if selectedCategory}
						{getCategoryLabel(selectedCategory)}
					{/if}
				</h1>
				<p class="text-muted-foreground">
					Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
				</p>
			</div>
		{/if}

		<!-- Category Filter -->
		<section class="mb-16" id="categories">
			<div class="mb-12 text-center">
				<h2
					class="mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
				>
					Shop by Category
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
					Explore our premium product categories designed for your home and business needs
				</p>
			</div>
			<div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
				{#each categories as category}
					<div
						class="group cursor-pointer"
						role="button"
						tabindex="0"
						aria-label="Filter by {category.label} category"
						onclick={() => {
							if (category.value) {
								window.location.href = `/?category=${category.value}`;
							} else {
								window.location.href = '/';
							}
						}}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								if (category.value) {
									window.location.href = `/?category=${category.value}`;
								} else {
									window.location.href = '/';
								}
							}
						}}
					>
						<div
							class="relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:shadow-lg {selectedCategory ===
							category.value
								? 'bg-gradient-to-br from-primary/5 to-blue-50 ring-2 ring-primary'
								: ''}"
						>
							<div
								class="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							></div>
							<span
								class="mb-2 transform text-3xl transition-transform duration-300 group-hover:scale-110"
								>{category.icon}</span
							>
							<span
								class="text-center text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-primary"
								>{category.label}</span
							>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Featured Products Carousel -->
		{#if !searchQuery && !selectedCategory && featuredProducts.length > 0}
			<ProductCarousel products={featuredProducts} title="Featured Products" autoPlay={true} />
		{/if}
	</div>

	<!-- Testimonials Section -->
	{#if !searchQuery && !selectedCategory}
		<TestimonialsSection />
	{/if}

	<div class="container mx-auto px-4 py-8">
		<!-- Popular Products -->
		{#if !searchQuery && !selectedCategory && popularProducts.length > 0}
			<section class="mb-16 rounded-3xl bg-gradient-to-r from-gray-50 to-blue-50/30 py-16">
				<div class="container mx-auto px-6">
					<div class="mb-12 text-center">
						<div class="mb-4 flex items-center justify-center gap-3">
							<div class="rounded-lg bg-primary/10 p-2">
								<TrendingUp class="h-6 w-6 text-primary" />
							</div>
							<h2
								class="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
							>
								Popular Products
							</h2>
						</div>
						<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
							Discover our most loved products chosen by thousands of satisfied customers
						</p>
					</div>
					<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						{#each popularProducts.slice(0, 4) as product}
							<div class="transform transition-transform duration-300 hover:scale-105">
								<ProductCard {product} />
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}

		<!-- Recent Products -->
		{#if !searchQuery && !selectedCategory && recentProducts.length > 0}
			<section class="py-16">
				<div class="mb-12 text-center">
					<div class="mb-4 flex items-center justify-center gap-3">
						<div class="rounded-lg bg-green-100 p-2">
							<Clock class="h-6 w-6 text-green-600" />
						</div>
						<h2
							class="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
						>
							New Arrivals
						</h2>
					</div>
					<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
						Fresh additions to our premium collection - be the first to experience innovation
					</p>
				</div>
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{#each recentProducts.slice(0, 4) as product}
						<div class="group">
							<div class="relative">
								<div
									class="absolute -right-2 -top-2 z-10 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white"
								>
									NEW
								</div>
								<div class="transform transition-transform duration-300 group-hover:scale-105">
									<ProductCard {product} />
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- All Products / Search Results -->
		<section class="py-8" id="products">
			{#if searchQuery || selectedCategory}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{#each filteredProducts as product}
						<ProductCard {product} />
					{/each}
				</div>
				{#if filteredProducts.length === 0}
					<div class="py-12 text-center">
						<Search class="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
						<h3 class="mb-2 text-xl font-semibold">No products found</h3>
						<p class="mb-4 text-muted-foreground">
							{#if searchQuery}
								Try adjusting your search terms
							{:else}
								No products available in this category
							{/if}
						</p>
						<Button onclick={() => (window.location.href = '/')}>View All Products</Button>
					</div>
				{/if}
			{:else}
				<div class="rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-8">
					<div class="mb-12 text-center">
						<div class="mb-4 flex items-center justify-center gap-3">
							<div class="rounded-lg bg-primary/10 p-2">
								<Star class="h-6 w-6 text-primary" />
							</div>
							<h2
								class="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
							>
								All Products
							</h2>
						</div>
						<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
							Explore our complete collection of premium products for every need
						</p>
					</div>
					<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						{#each allProducts.slice(0, 8) as product}
							<div class="transform transition-transform duration-300 hover:scale-105">
								<ProductCard {product} />
							</div>
						{/each}
					</div>
					{#if allProducts.length > 8}
						<div class="mt-12 text-center">
							<Button
								variant="outline"
								class="border-2 border-primary bg-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:bg-primary hover:text-white"
								onclick={() => (window.location.href = '/products')}
							>
								View All Products
							</Button>
						</div>
					{/if}
				</div>
			{/if}
		</section>
	</div>
{/if}
