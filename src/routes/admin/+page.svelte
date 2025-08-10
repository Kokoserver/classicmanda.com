<script lang="ts">

	import { ProductCategory } from '$lib/types/product.js';
	import type { Product } from '$lib/types/product.js';
	import { shippingManager } from '$lib/utils/shipping.js';
	import type { ShippingStatus } from '$lib/utils/shipping.js';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { config } from '$lib/config/env.js';
	import { Plus, Trash2, Upload, Lock, Truck, ChartColumn } from 'lucide-svelte';

	// State using Svelte 5 runes
	let isAuthenticated = $state(false);
	let password = $state('');
	let authError = $state('');

	let newProduct = $state<Partial<Product> & { price: number | undefined }>({
		name: '',
		description: '',
		price: undefined,
		category: ProductCategory.TOOLS,
		images: [''],
		specifications: {} as Record<string, string>,
		inStock: true,
		featured: false,
		popular: false,
		recent: true
	});

	let specKey = $state('');
	let specValue = $state('');
	let imageUrl = $state('');
	let isSubmitting = $state(false);
	let submitMessage = $state('');
	
	// Shipping management state
	let shippingStatus: ShippingStatus = $state({
		isFreeShipping: false,
		message: 'Loading shipping status...'
	});
	let shippingStats = $state({
		currentOrders: 0,
		threshold: 0,
		ordersLeft: 0,
		lastReset: ''
	});

	// Computed values using Svelte 5 runes
	let isSuccess = $derived(submitMessage.includes('success'));
	let messageClasses = $derived(`mb-8 p-4 rounded-xl border-l-4 backdrop-blur-sm ${
		isSuccess ? 'bg-green-50/80 border-green-500' : 'bg-red-50/80 border-red-500'
	}`);
	let textClasses = $derived(`font-semibold ${
		isSuccess ? 'text-green-800' : 'text-red-800'
	}`);

	$effect(() => {
		// Check if already authenticated in session
		const authenticated = sessionStorage.getItem('admin-authenticated');
		if (authenticated === 'true') {
			isAuthenticated = true;
		}
		
		// Initialize shipping status
		updateShippingInfo();
	});

	function authenticate() {
		if (password === config.adminPassword) {
			isAuthenticated = true;
			authError = '';
			sessionStorage.setItem('admin-authenticated', 'true');
		} else {
			authError = 'Invalid password';
		}
	}

	function logout() {
		isAuthenticated = false;
		sessionStorage.removeItem('admin-authenticated');
		password = '';
	}

	function addSpecification() {
		if (specKey.trim() && specValue.trim()) {
			newProduct.specifications = {
				...newProduct.specifications,
				[specKey.trim()]: specValue.trim()
			};
			specKey = '';
			specValue = '';
		}
	}

	function removeSpecification(key: string) {
		if (newProduct.specifications) {
			const { [key]: removed, ...rest } = newProduct.specifications;
			newProduct.specifications = rest;
		}
	}

	function addImageUrl() {
		if (newProduct.images) {
			newProduct.images = [...newProduct.images, ''];
		}
	}

	function removeImageUrl(index: number) {
		if (newProduct.images && newProduct.images.length > 1) {
			newProduct.images = newProduct.images.filter((_, i) => i !== index);
		}
	}

	function updateImageUrl(index: number, url: string) {
		if (newProduct.images) {
			newProduct.images[index] = url;
		}
	}

	async function submitProduct() {
		// Validate required fields
		if (
			!newProduct.name?.trim() ||
			!newProduct.description?.trim() ||
			!newProduct.price ||
			newProduct.price <= 0
		) {
			submitMessage = 'Please fill in all required fields';
			return;
		}

		if (!newProduct.images?.some((img) => img.trim())) {
			submitMessage = 'Please provide at least one image URL';
			return;
		}

		isSubmitting = true;
		submitMessage = '';

		try {
			// In a real app, this would make an API call
			// For now, we'll just simulate success
			await new Promise((resolve) => setTimeout(resolve, 1000));

			submitMessage = 'Product added successfully!';

			// Reset form
			newProduct = {
				name: '',
				description: '',
				price: 0,
				category: ProductCategory.TOOLS,
				images: [''],
				specifications: {},
				inStock: true,
				featured: false,
				popular: false,
				recent: true
			};
		} catch (error) {
			submitMessage = 'Error adding product. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	// Shipping management functions
	function updateShippingInfo() {
		shippingStatus = shippingManager.getShippingStatus();
		shippingStats = shippingManager.getStats();
	}

	function activateFreeShipping() {
		shippingManager.forceActivateFreeShipping();
		updateShippingInfo();
	}

	function resetShippingSystem() {
		shippingManager.reset();
		updateShippingInfo();
	}

	function simulateOrder() {
		shippingManager.addOrder();
		updateShippingInfo();
	}

	const categoryOptions = [
		{ value: ProductCategory.SOLAR_PANELS, label: 'Solar Panels' },
		{ value: ProductCategory.DISHWASHERS, label: 'Dishwashers' },
		{ value: ProductCategory.CHANDELIERS, label: 'Chandeliers' },
		{ value: ProductCategory.BUILDING_MATERIALS, label: 'Building Materials' },
		{ value: ProductCategory.TOOLS, label: 'Tools' }
	];
</script>

<svelte:head>
	<title>Admin Panel - Classicmanda</title>
	<meta name="description" content="Admin panel for managing Classicmanda products." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-luxury-cream to-white">
	<div class="container mx-auto px-4 py-8">
		{#if !isAuthenticated}
			<!-- Authentication -->
			<div class="max-w-md mx-auto pt-20">
				<Card class="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
					<div class="text-center mb-8">
						<div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mb-6">
							<Lock class="h-8 w-8 text-white" />
						</div>
						<h1 class="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">Admin Access</h1>
						<p class="text-muted-foreground">Enter your credentials to access the luxury admin panel</p>
					</div>

					<div class="space-y-6">
						<div>
							<label for="password" class="block text-sm font-semibold mb-2 text-luxury-navy">Password</label>
							<Input
								id="password"
								type="password"
								bind:value={password}
								placeholder="Enter admin password"
								class="h-12 border-2 border-luxury-gold/20 focus:border-primary transition-colors"
								onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && authenticate()}
							/>
							{#if authError}
								<p class="text-sm text-red-600 mt-2 font-medium">{authError}</p>
							{/if}
						</div>

						<Button 
							class="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
							onclick={authenticate}
						>
							Access Admin Panel
						</Button>
					</div>
				</Card>
			</div>
		{:else}
			<!-- Admin Panel -->
			<div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-luxury-gold/20 shadow-xl">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl">
							<Upload class="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Admin Panel</h1>
							<p class="text-luxury-navy/70 font-medium">Manage ClassicManda Products</p>
						</div>
					</div>
					<Button 
						variant="outline" 
						class="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-6 py-2 font-semibold"
						onclick={logout}
					>
						Logout
					</Button>
				</div>
			</div>

			<!-- Shipping Management Section -->
			<div class="max-w-5xl mx-auto mb-8">
				<Card class="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
					<div class="flex items-center gap-3 mb-6">
						<div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
							<Truck class="h-5 w-5 text-white" />
						</div>
						<h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shipping Management</h2>
					</div>

					<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<!-- Current Status -->
						<div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
							<h3 class="font-semibold text-blue-800 mb-3 flex items-center gap-2">
								<ChartColumn class="h-4 w-4" />
								Current Status
							</h3>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-600">Current Orders:</span>
									<span class="font-semibold">{shippingStats.currentOrders}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">Threshold:</span>
									<span class="font-semibold">{shippingStats.threshold}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">Orders Left:</span>
									<span class="font-semibold {shippingStats.ordersLeft === 0 ? 'text-green-600' : 'text-orange-600'}">
										{shippingStats.ordersLeft}
									</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">Last Reset:</span>
									<span class="font-semibold text-xs">{shippingStats.lastReset}</span>
								</div>
							</div>
							
							<!-- Status Message -->
							<div class="mt-4 p-3 rounded-lg {shippingStatus.isFreeShipping ? 'bg-green-100 border border-green-300' : 'bg-orange-100 border border-orange-300'}">
								<p class="text-sm font-medium {shippingStatus.isFreeShipping ? 'text-green-800' : 'text-orange-800'}">
									{shippingStatus.message}
								</p>
							</div>
						</div>

						<!-- Admin Controls -->
						<div class="space-y-4">
							<h3 class="font-semibold text-gray-800 mb-3">Admin Controls</h3>
							
							<Button 
								variant="outline" 
								class="w-full border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300"
								onclick={activateFreeShipping}
							>
								<Truck class="h-4 w-4 mr-2" />
								Activate Free Shipping
							</Button>

							<Button 
								variant="outline" 
								class="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
								onclick={simulateOrder}
							>
								<Plus class="h-4 w-4 mr-2" />
								Simulate Order (+1)
							</Button>

							<Button 
								variant="outline" 
								class="w-full border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300"
								onclick={resetShippingSystem}
							>
								<ChartColumn class="h-4 w-4 mr-2" />
								Reset System
							</Button>

							<Button 
								variant="ghost" 
								class="w-full text-gray-600 hover:bg-gray-100 transition-all duration-300"
								onclick={updateShippingInfo}
							>
								Refresh Status
							</Button>
						</div>
					</div>
				</Card>
			</div>

			<div class="max-w-5xl mx-auto">
				<Card class="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
					<div class="flex items-center gap-3 mb-8">
						<div class="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
							<Plus class="h-5 w-5 text-white" />
						</div>
						<h2 class="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Add New Product</h2>
					</div>

					{#if submitMessage}
						<div class={messageClasses}>
							<p class={textClasses}>
								{submitMessage}
							</p>
						</div>
					{/if}

					<div class="space-y-8">
						<!-- Basic Information -->
						<div class="bg-gradient-to-r from-luxury-cream/30 to-white/50 p-6 rounded-2xl border border-luxury-gold/20">
							<h3 class="text-xl font-bold text-luxury-navy mb-6 flex items-center gap-2">
								<div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
									<span class="text-white text-xs font-bold">1</span>
								</div>
								Basic Information
							</h3>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label for="name" class="block text-sm font-semibold mb-2 text-luxury-navy">Product Name *</label>
									<Input
										id="name"
										bind:value={newProduct.name}
										placeholder="Enter product name"
										class="h-12 border-2 border-luxury-gold/20 focus:border-primary transition-colors"
									/>
								</div>

								<div>
									<label for="price" class="block text-sm font-semibold mb-2 text-luxury-navy">Price (USD) *</label>
									<Input
										id="price"
										type="number"
										value={newProduct.price?.toString() ?? ''}
										oninput={(e: Event) => {
											const target = e.target as HTMLInputElement;
											const value = target.value;
											newProduct.price = value === '' ? undefined : Number(value);
										}}
										placeholder="0.00"
										min="0"
										step="0.01"
										class="h-12 border-2 border-luxury-gold/20 focus:border-primary transition-colors"
									/>
								</div>
							</div>

							<div>
								<label for="description" class="block text-sm font-semibold mb-2 text-luxury-navy">Description *</label>
								<textarea
									id="description"
									bind:value={newProduct.description}
									placeholder="Enter detailed product description"
									rows="4"
									class="w-full px-4 py-3 border-2 border-luxury-gold/20 focus:border-primary rounded-xl focus:outline-none focus:ring-0 resize-none transition-colors"
								></textarea>
							</div>

							<div>
								<label for="category" class="block text-sm font-semibold mb-2 text-luxury-navy">Category *</label>
								<select
									id="category"
									bind:value={newProduct.category}
									class="w-full h-12 px-4 py-3 border-2 border-luxury-gold/20 focus:border-primary rounded-xl focus:outline-none focus:ring-0 transition-colors bg-white"
								>
									{#each categoryOptions as option}
										<option value={option.value}>{option.label}</option>
									{/each}
								</select>
							</div>
						</div>

						<!-- Product Images -->
						<div class="bg-gradient-to-r from-luxury-cream/30 to-white/50 p-6 rounded-2xl border border-luxury-gold/20">
							<h3 class="text-xl font-bold text-luxury-navy mb-6 flex items-center gap-2">
								<div class="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
									<span class="text-white text-xs font-bold">2</span>
								</div>
								Product Images
							</h3>
							<div class="space-y-3">
								{#each newProduct.images || [''] as imageUrl, index}
									<div class="flex gap-3">
										<Input
											value={imageUrl}
											placeholder="Enter image URL"
											oninput={(e: Event) => updateImageUrl(index, (e.target as HTMLInputElement).value)}
											class="flex-1 h-12 border-2 border-luxury-gold/20 focus:border-primary transition-colors"
										/>
										{#if (newProduct.images?.length || 0) > 1}
											<Button variant="outline" size="icon" class="h-12 w-12 border-2 border-red-300 text-red-600 hover:bg-red-50" onclick={() => removeImageUrl(index)}>
												<Trash2 class="h-4 w-4" />
											</Button>
										{/if}
									</div>
								{/each}
								<Button variant="outline" class="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300" onclick={addImageUrl}>
									<Plus class="h-4 w-4 mr-2" />
									Add Image URL
								</Button>
							</div>
						</div>

						<!-- Specifications -->
						<div class="bg-gradient-to-r from-luxury-cream/30 to-white/50 p-6 rounded-2xl border border-luxury-gold/20">
							<h3 class="text-xl font-bold text-luxury-navy mb-6 flex items-center gap-2">
								<div class="w-6 h-6 bg-luxury-charcoal rounded-full flex items-center justify-center">
									<span class="text-white text-xs font-bold">3</span>
								</div>
								Specifications
							</h3>
							<div class="space-y-4">
								<!-- Add specification -->
								<div class="flex gap-3">
									<Input 
										bind:value={specKey} 
										placeholder="Specification name" 
										class="flex-1 h-12 border-2 border-luxury-gold/20 focus:border-primary transition-colors" 
									/>
									<Input 
										bind:value={specValue} 
										placeholder="Specification value" 
										class="flex-1 h-12 border-2 border-luxury-gold/20 focus:border-primary transition-colors" 
									/>
									<Button variant="outline" class="h-12 px-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300" onclick={addSpecification}>
										<Plus class="h-4 w-4" />
									</Button>
								</div>

								<!-- Existing specifications -->
								{#if newProduct.specifications && Object.keys(newProduct.specifications).length > 0}
									<div class="border-2 border-luxury-gold/20 rounded-xl p-4 space-y-3 bg-white/50">
										{#each Object.entries(newProduct.specifications) as [key, value]}
											<div class="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-luxury-gold/10">
												<span class="font-medium text-luxury-navy"><strong>{key}:</strong> {value}</span>
												<Button variant="ghost" size="icon" class="text-red-600 hover:bg-red-50" onclick={() => removeSpecification(key)}>
													<Trash2 class="h-4 w-4" />
												</Button>
											</div>
										{/each}
									</div>
								{/if}
							</div>
						</div>

						<!-- Product Flags -->
						<div class="bg-gradient-to-r from-luxury-cream/30 to-white/50 p-6 rounded-2xl border border-luxury-gold/20">
							<h3 class="text-xl font-bold text-luxury-navy mb-6 flex items-center gap-2">
								<div class="w-6 h-6 bg-luxury-rose rounded-full flex items-center justify-center">
									<span class="text-white text-xs font-bold">4</span>
								</div>
								Product Settings
							</h3>
							<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
								<label class="flex items-center space-x-3 p-3 bg-white/60 rounded-xl border border-luxury-gold/10 hover:bg-white/80 transition-colors cursor-pointer">
									<input
										type="checkbox"
										bind:checked={newProduct.inStock}
										class="w-5 h-5 text-primary border-2 border-luxury-gold/30 rounded focus:ring-primary focus:ring-2"
									/>
									<span class="font-medium text-luxury-navy">In Stock</span>
								</label>

								<label class="flex items-center space-x-3 p-3 bg-white/60 rounded-xl border border-luxury-gold/10 hover:bg-white/80 transition-colors cursor-pointer">
									<input
										type="checkbox"
										bind:checked={newProduct.featured}
										class="w-5 h-5 text-primary border-2 border-luxury-gold/30 rounded focus:ring-primary focus:ring-2"
									/>
									<span class="font-medium text-luxury-navy">Featured</span>
								</label>

								<label class="flex items-center space-x-3 p-3 bg-white/60 rounded-xl border border-luxury-gold/10 hover:bg-white/80 transition-colors cursor-pointer">
									<input
										type="checkbox"
										bind:checked={newProduct.popular}
										class="w-5 h-5 text-primary border-2 border-luxury-gold/30 rounded focus:ring-primary focus:ring-2"
									/>
									<span class="font-medium text-luxury-navy">Popular</span>
								</label>

								<label class="flex items-center space-x-3 p-3 bg-white/60 rounded-xl border border-luxury-gold/10 hover:bg-white/80 transition-colors cursor-pointer">
									<input
										type="checkbox"
										bind:checked={newProduct.recent}
										class="w-5 h-5 text-primary border-2 border-luxury-gold/30 rounded focus:ring-primary focus:ring-2"
									/>
									<span class="font-medium text-luxury-navy">Recent</span>
								</label>
							</div>
						</div>

						<!-- Submit Button -->
						<div class="pt-6">
							<Button 
								size="lg" 
								class="w-full h-14 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl" 
								onclick={submitProduct} 
								disabled={isSubmitting}
							>
								{#if isSubmitting}
									Adding Product...
								{:else}
									<Upload class="h-5 w-5 mr-3" />
									Add Product to ClassicManda
								{/if}
							</Button>
						</div>
					</div>
				</Card>
			</div>
		{/if}
	</div>
</div>
