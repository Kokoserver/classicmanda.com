<script lang="ts">

    import { page } from '$app/state';
	import type { Product } from '$lib/types/product.js';
	import { ProductCategory } from '$lib/types/product.js';
	import { products } from '$lib/stores/products.svelte.js';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { Search, Funnel, Grid3x3, List } from 'lucide-svelte';

	let allProducts = $state<Product[]>([]);
	let loading = $state(true);
	let searchQuery = $state('');
	let selectedCategory = $state('');
	let sortBy = $state('name');
	let viewMode = $state('grid'); // 'grid' or 'list'
	let currentPage = $state(1);
	let itemsPerPage = $state(12);
	let minPrice = $state('');
	let maxPrice = $state('');

	// Get URL parameters
	$effect(() => {
			const urlParams = new URLSearchParams(page.url.search);
			searchQuery = urlParams.get('search') || '';
			selectedCategory = urlParams.get('category') || '';
			sortBy = urlParams.get('sort') || 'name';
			currentPage = parseInt(urlParams.get('page') || '1');
			itemsPerPage = parseInt(urlParams.get('limit') || '12');
		
	});

	// Filter and sort products using $derived
	let filteredProducts = $derived((() => {
		let filtered = [...allProducts];

		// Filter by search query
		if (searchQuery) {
			filtered = filtered.filter(
				(product) =>
					product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.category.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		// Filter by category
		if (selectedCategory && selectedCategory !== 'all') {
			filtered = filtered.filter(
				(product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
			);
		}

		// Filter by price range
		if (minPrice && !isNaN(Number(minPrice))) {
			filtered = filtered.filter((product) => product.price >= Number(minPrice));
		}
		if (maxPrice && !isNaN(Number(maxPrice))) {
			filtered = filtered.filter((product) => product.price <= Number(maxPrice));
		}

		// Sort products (using slice to avoid mutation)
		return [...filtered].sort((a, b) => {
			switch (sortBy) {
				case 'price-low':
					return a.price - b.price;
				case 'price-high':
					return b.price - a.price;
				case 'name':
					return a.name.localeCompare(b.name);
				case 'newest':
					return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
				default:
					return 0;
			}
		});
	})());

	// Pagination using $derived
	let totalPages = $derived(Math.ceil(filteredProducts.length / itemsPerPage));
	let paginatedProducts = $derived(filteredProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	));
	$inspect(allProducts);

	// Categories for filter dropdown
	const categories = [
		{ value: 'all', label: 'All Categories' },
		{ value: ProductCategory.SOLAR_PANELS, label: 'Solar Panels' },
		{ value: ProductCategory.DISHWASHERS, label: 'Dishwashers' },
		{ value: ProductCategory.CHANDELIERS, label: 'Chandeliers' },
		{ value: ProductCategory.BUILDING_MATERIALS, label: 'Building Materials' },
		{ value: ProductCategory.TOOLS, label: 'Tools' }
	];

	const sortOptions = [
		{ value: 'name', label: 'Name (A-Z)' },
		{ value: 'price-low', label: 'Price (Low to High)' },
		{ value: 'price-high', label: 'Price (High to Low)' },
		{ value: 'newest', label: 'Newest First' }
	];

	$effect(() => {
		(async () => {
			try {
				await products.loadAll();
				allProducts = products.products;
			
				
			} catch (error) {
				console.error('Failed to load products:', error);
			} finally {
				loading = false;
			}
		})();
	});

	function handleSearch() {
		currentPage = 1;
		updateURL();
	}

	function handleCategoryChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedCategory = target.value;
		currentPage = 1;
		updateURL();
	}

	function handleSortChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		sortBy = target.value;
		updateURL();
	}

	function handlePageChange(page: number) {
		currentPage = page;
		updateURL();
		// Scroll to top
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function updateURL() {
		const params = new URLSearchParams();
		if (searchQuery) params.set('search', searchQuery);
		if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
		if (sortBy !== 'name') params.set('sort', sortBy);
		if (currentPage > 1) params.set('page', currentPage.toString());

		const newURL = `/products${params.toString() ? '?' + params.toString() : ''}`;
		window.history.replaceState({}, '', newURL);
	}

	function clearFilters() {
		searchQuery = '';
		selectedCategory = '';
		sortBy = 'name';
		currentPage = 1;
		updateURL();
	}
</script>

<svelte:head>
	<title>Products - Velvet supply</title>
	<meta name="description" content="Browse our complete collection of premium products including solar panels, dishwashers, chandeliers, building materials, and tools." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-foreground mb-2">All Products</h1>
		<p class="text-muted-foreground">
			Discover our complete collection of premium products for your home and business
		</p>
	</div>

	<!-- Filters and Controls -->
	<div class="bg-card border rounded-lg p-6 mb-8">
		<div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
			<!-- Search -->
			<div class="flex-1 max-w-md">
				<div class="relative">
					<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
					<Input
						type="text"
						placeholder="Search products..."
						bind:value={searchQuery}
						oninput={handleSearch}
						class="pl-10"
					/>
				</div>
			</div>

			<!-- Filters -->
			<div class="flex flex-wrap gap-4 items-center">
				<!-- Category Filter -->
				<div class="flex items-center gap-2">
					<Funnel class="w-4 h-4 text-muted-foreground" />
					<select
						bind:value={selectedCategory}
						onchange={handleCategoryChange}
						class="border border-input rounded-md px-3 py-2 text-sm bg-background"
					>
						{#each categories as category (category.value)}
							<option value={category.value}>{category.label}</option>
						{/each}
					</select>
				</div>

				<!-- Sort -->
				<select
					bind:value={sortBy}
					onchange={handleSortChange}
					class="border border-input rounded-md px-3 py-2 text-sm bg-background"
				>
					{#each sortOptions as option (option.value)}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>

				<!-- View Mode Toggle -->
				<div class="flex border border-input rounded-md">
					<button
						type="button"
						class="p-2 {viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}"
						onclick={() => (viewMode = 'grid')}
					>
						<Grid3x3 class="w-4 h-4" />
					</button>
					<button
						type="button"
						class="p-2 {viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}"
						onclick={() => (viewMode = 'list')}
					>
						<List class="w-4 h-4" />
					</button>
				</div>

				<!-- Clear Filters -->
				{#if searchQuery || selectedCategory || sortBy !== 'name'}
					<Button variant="outline" size="sm" onclick={clearFilters}>
						Clear Filters
					</Button>
				{/if}
			</div>
		</div>

		<!-- Results Info -->
		<div class="mt-4 pt-4 border-t border-border">
			<p class="text-sm text-muted-foreground">
				Showing {paginatedProducts.length} of {filteredProducts.length} products
				{#if searchQuery}
					for "{searchQuery}"
				{/if}
				{#if selectedCategory && selectedCategory !== 'all'}
					in {categories.find(c => c.value === selectedCategory)?.label}
				{/if}
			</p>
		</div>
	</div>

	<!-- Loading State -->
	{#if loading}
		<div class="flex justify-center items-center py-12">
			<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
		</div>
	{:else if filteredProducts.length === 0}
		<!-- No Results -->
		<div class="text-center py-12">
			<h3 class="text-lg font-semibold text-foreground mb-2">No products found</h3>
			<p class="text-muted-foreground mb-4">
				Try adjusting your search terms or filters to find what you're looking for.
			</p>
			<Button onclick={clearFilters}>Clear All Filters</Button>
		</div>
	{:else}
		<!-- Products Grid/List -->
		<div class="mb-8">
			{#if viewMode === 'grid'}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{#each paginatedProducts as product (product.id)}
						<ProductCard {product} />
					{/each}
				</div>
			{:else}
				<div class="space-y-4">
					{#each paginatedProducts as product (product.id)}
						<div class="bg-card border rounded-lg p-4 flex gap-4">
							<img
								src={product.images[0]}
								alt={product.name}
								class="w-24 h-24 object-cover rounded-md"
							/>
							<div class="flex-1">
								<h3 class="font-semibold text-foreground mb-1">
									<a href="/product/{product.id}" class="hover:text-primary">
										{product.name}
									</a>
								</h3>
								<p class="text-sm text-muted-foreground mb-2 line-clamp-2">
									{product.description}
								</p>
								<div class="flex items-center justify-between">
									<span class="text-lg font-bold text-primary">
										${product.price.toLocaleString()}
									</span>
									<Button size="sm">
										<a href="/product/{product.id}">View Details</a>
									</Button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="flex justify-center items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					disabled={currentPage === 1}
					onclick={() => handlePageChange(currentPage - 1)}
				>
					Previous
				</Button>

				{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page (page)}
					{#if page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)}
						<Button
							variant={page === currentPage ? 'default' : 'outline'}
							size="sm"
							onclick={() => handlePageChange(page)}
						>
							{page}
						</Button>
					{:else if page === currentPage - 3 || page === currentPage + 3}
						<span class="px-2 text-muted-foreground">...</span>
					{/if}
				{/each}

				<Button
					variant="outline"
					size="sm"
					disabled={currentPage === totalPages}
					onclick={() => handlePageChange(currentPage + 1)}
				>
					Next
				</Button>
			</div>
		{/if}
	{/if}
</div>
