<script lang="ts">

	import { page } from '$app/state';
	import { cart } from '$lib/stores/cart.svelte.js';
	import { productService } from '$lib/services/productService.js';
	import { shippingManager } from '$lib/utils/shipping.js';
	import type { Product } from '$lib/types/product.js';
	import type { ShippingStatus } from '$lib/utils/shipping.js';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { ShoppingCart, ArrowLeft, Truck, Shield, RefreshCw } from 'lucide-svelte';

	let product = $state<Product | null>(null);
	let relatedProducts = $state<Product[]>([]);
	let loading = $state(true);
	let selectedImageIndex = $state(0);
	let quantity = $state(1);
	let shippingStatus = $state<ShippingStatus>({
		isFreeShipping: false,
		message: 'Loading shipping status...'
	});

	$effect(() => {
		(async () => {
			const productId = page.params.id;

			try {
				[product, relatedProducts] = await Promise.all([
					productService.getProduct(productId!),
					productService.getProducts()
				]);

				if (product) {
					// Filter related products by same category, excluding current product
					relatedProducts = relatedProducts
						.filter((p) => p.category === product!.category && p.id !== product!.id)
						.slice(0, 4);
				}
			} catch (error) {
				console.error('Error loading product:', error);
			} finally {
				loading = false;
			}
			
			// Initialize shipping status
			shippingStatus = shippingManager.getShippingStatus();
		})();
	});

	function addToCart() {
		if (product) {
			cart.addItem(product, quantity);
		}
	}

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(price);
	}

	function getCategoryLabel(category: string): string {
		return category
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	function goBack() {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			window.location.href = '/';
		}
	}
</script>

<svelte:head>
	{#if product}
		<title>{product.name} - Classicmanda</title>
		<meta name="description" content={product.description} />
	{:else}
		<title>Product Details - Classicmanda</title>
	{/if}
</svelte:head>

{#if loading}
	<div class="container mx-auto px-4 py-12">
		<div class="flex items-center justify-center min-h-[400px]">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
		</div>
	</div>
{:else if !product}
	<div class="container mx-auto px-4 py-12">
		<div class="text-center">
			<h1 class="text-3xl font-bold mb-4">Product Not Found</h1>
			<p class="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
			<Button onclick={() => (window.location.href = '/')}>
				<ArrowLeft class="h-4 w-4 mr-2" />
				Back to Home
			</Button>
		</div>
	</div>
{:else}
	<div class="container mx-auto px-4 py-8">
		<!-- Back Button -->
		<Button variant="ghost" class="mb-6" onclick={goBack}>
			<ArrowLeft class="h-4 w-4 mr-2" />
			Back
		</Button>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
			<!-- Product Images -->
			<div class="space-y-4">
				<div class="aspect-square overflow-hidden rounded-lg border">
					<img
						src={product.images[selectedImageIndex]}
						alt={product.name}
						class="w-full h-full object-cover"
					/>
				</div>

				{#if product.images.length > 1}
					<div class="grid grid-cols-4 gap-2">
						{#each product.images as image, index}
							<button
								class="aspect-square overflow-hidden rounded border-2 transition-colors"
								class:border-primary={selectedImageIndex === index}
								class:border-border={selectedImageIndex !== index}
								onclick={() => (selectedImageIndex = index)}
							>
								<img
									src={image}
									alt="{product.name} - Image {index + 1}"
									class="w-full h-full object-cover"
								/>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Product Info -->
			<div class="space-y-6">
				<!-- Category -->
				<div class="text-sm text-muted-foreground uppercase tracking-wide">
					{getCategoryLabel(product.category)}
				</div>

				<!-- Title -->
				<h1 class="text-3xl font-bold">{product.name}</h1>

				<!-- Price -->
				<div class="text-3xl font-bold text-primary">
					{formatPrice(product.price)}
				</div>

				<!-- Stock Status -->
				<div class="flex items-center gap-2">
					{#if product.inStock}
						<div class="w-3 h-3 bg-green-500 rounded-full"></div>
						<span class="text-green-600 font-medium">In Stock</span>
					{:else}
						<div class="w-3 h-3 bg-red-500 rounded-full"></div>
						<span class="text-red-600 font-medium">Out of Stock</span>
					{/if}
				</div>

				<!-- Description -->
				<div class="prose prose-sm max-w-none">
					<p>{product.description}</p>
				</div>

				<!-- Quantity and Add to Cart -->
				<div class="space-y-4">
					<div class="flex items-center gap-4">
						<label for="quantity" class="font-medium">Quantity:</label>
						<div class="flex items-center border rounded-md">
							<button
								class="px-3 py-2 hover:bg-muted"
								onclick={() => (quantity = Math.max(1, quantity - 1))}
								disabled={!product.inStock}
							>
								-
							</button>
							<input
								id="quantity"
								type="number"
								min="1"
								max="10"
								bind:value={quantity}
								class="w-16 text-center border-0 focus:ring-0"
								disabled={!product.inStock}
							/>
							<button
								class="px-3 py-2 hover:bg-muted"
								onclick={() => (quantity = Math.min(10, quantity + 1))}
								disabled={!product.inStock}
							>
								+
							</button>
						</div>
					</div>

					<Button size="lg" class="w-full" onclick={addToCart} disabled={!product.inStock}>
						<ShoppingCart class="h-5 w-5 mr-2" />
						Add to Cart
					</Button>
				</div>

				<!-- Features -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
					<div class="flex items-center gap-2 text-sm">
						<Truck class="h-4 w-4 {shippingStatus.isFreeShipping ? 'text-green-500' : 'text-orange-500'}" />
						<span class="{shippingStatus.isFreeShipping ? 'text-green-600' : 'text-orange-600'} font-medium">
							{shippingStatus.isFreeShipping ? 'Free Shipping Active!' : `${shippingStatus.ordersLeft || 0} orders left for free shipping`}
						</span>
					</div>
					<div class="flex items-center gap-2 text-sm">
						<Shield class="h-4 w-4 text-primary" />
						<span>Warranty Included</span>
					</div>
					<div class="flex items-center gap-2 text-sm">
						<RefreshCw class="h-4 w-4 text-primary" />
						<span>30-Day Returns</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Specifications -->
		<Card class="mb-12">
			<div class="p-6">
				<h2 class="text-2xl font-bold mb-4">Specifications</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each Object.entries(product.specifications) as [key, value]}
						<div class="flex justify-between py-2 border-b">
							<span class="font-medium">{key}:</span>
							<span class="text-muted-foreground">{value}</span>
						</div>
					{/each}
				</div>
			</div>
		</Card>

		<!-- Related Products -->
		{#if relatedProducts.length > 0}
			<section>
				<h2 class="text-2xl font-bold mb-6">Related Products</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{#each relatedProducts as relatedProduct}
						<ProductCard product={relatedProduct} />
					{/each}
				</div>
			</section>
		{/if}
	</div>
{/if}
