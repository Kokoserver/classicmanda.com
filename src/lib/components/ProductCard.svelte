<script lang="ts">
	import type { Product } from '$lib/types/product.js';
	import { cart } from '$lib/stores/cart.svelte.js';
	import Button from './ui/Button.svelte';
	import Card from './ui/Card.svelte';
	import { ShoppingCart, Eye } from 'lucide-svelte';

	interface Props {
		product: Product;
	}

	let { product }: Props = $props();

	function addToCart() {
		cart.addItem(product, 1);
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
</script>

<Card class="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 border-0 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
	<div class="relative overflow-hidden rounded-t-xl">
		<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
		<img
			src={product.images[0]}
			alt={product.name}
			class="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
			loading="lazy"
		/>

		<!-- Product badges -->
		<div class="absolute top-3 left-3 flex flex-col gap-2 z-20">
			{#if product.featured}
				<span class="bg-gradient-to-r from-primary to-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
					✨ Featured
				</span>
			{/if}
			{#if product.popular}
				<span class="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
					🔥 Popular
				</span>
			{/if}
			{#if product.recent}
				<span class="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
					⚡ New
				</span>
			{/if}
		</div>

		<!-- Quick actions overlay -->
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20"
		>
			<Button
				variant="secondary"
				size="icon"
				class="bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
				onclick={() => (window.location.href = `/product/${product.id}`)}
			>
				<Eye class="h-4 w-4 text-gray-700" />
			</Button>
			<Button 
				variant="secondary" 
				size="icon" 
				class="bg-primary/90 backdrop-blur-sm hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg" 
				onclick={addToCart} 
				disabled={!product.inStock}
			>
				<ShoppingCart class="h-4 w-4 text-white" />
			</Button>
		</div>
	</div>

	<div class="p-6 bg-gradient-to-b from-white to-gray-50/50">
		<!-- Category -->
		<div class="mb-3">
			<span class="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
				{getCategoryLabel(product.category)}
			</span>
		</div>

		<!-- Product name -->
		<h3 class="font-bold text-base mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
			<a href="/product/{product.id}" class="hover:underline">
				{product.name}
			</a>
		</h3>

		<!-- Description -->
		<p class="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
			{product.description}
		</p>

		<!-- Price and actions -->
		<div class="flex items-center justify-between pt-2 border-t border-gray-100">
			<div class="flex flex-col">
				<span class="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
					{formatPrice(product.price)}
				</span>
				{#if !product.inStock}
					<span class="text-xs text-red-500 font-medium">Out of Stock</span>
				{:else}
					<span class="text-xs text-green-600 font-medium">✓ In Stock</span>
				{/if}
			</div>

			<Button
				variant="outline"
				size="sm"
				onclick={addToCart}
				disabled={!product.inStock}
				class="shrink-0 bg-white hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary font-semibold px-4 py-2"
			>
				<ShoppingCart class="h-3 w-3 mr-2" />
				Add to Cart
			</Button>
		</div>
	</div>
</Card>
