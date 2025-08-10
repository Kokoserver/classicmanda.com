<script lang="ts">

	import { cart } from '$lib/stores/cart.svelte.js';
	import { shippingManager } from '$lib/utils/shipping.js';
	import type { ShippingStatus } from '$lib/utils/shipping.js';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-svelte';

	let shippingStatus = $state<ShippingStatus>({
		isFreeShipping: false,
		message: 'Loading shipping status...'
	});

	$effect(() => {
		cart.init();
		shippingStatus = shippingManager.getShippingStatus();
	});

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(price);
	}

	function updateQuantity(productId: string, newQuantity: number) {
		cart.updateQuantity(productId, newQuantity);
	}

	function removeItem(productId: string) {
		cart.removeItem(productId);
	}

	function proceedToCheckout() {
		window.location.href = '/checkout';
	}
</script>

<svelte:head>
	<title>Shopping Cart - Classicmanda</title>
	<meta name="description" content="Review your selected products and proceed to checkout." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="flex items-center gap-2 mb-8">
		<ShoppingBag class="h-6 w-6" />
		<h1 class="text-3xl font-bold">Shopping Cart</h1>
	</div>

	{#if cart.cart.items.length === 0}
		<div class="text-center py-12">
			<ShoppingBag class="h-16 w-16 text-muted-foreground mx-auto mb-4" />
			<h2 class="text-2xl font-semibold mb-2">Your cart is empty</h2>
			<p class="text-muted-foreground mb-6">Add some products to get started!</p>
			<Button onclick={() => (window.location.href = '/')}>Continue Shopping</Button>
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Cart Items -->
			<div class="lg:col-span-2 space-y-4">
				{#each cart.cart.items as item}
					<Card class="p-6">
						<div class="flex gap-4">
							<!-- Product Image -->
							<div class="flex-shrink-0">
								<img
									src={item.product.images[0]}
									alt={item.product.name}
									class="w-20 h-20 object-cover rounded-lg"
								/>
							</div>

							<!-- Product Details -->
							<div class="flex-1 min-w-0">
								<h3 class="font-semibold text-lg mb-1">
									<a href="/product/{item.product.id}" class="hover:text-primary">
										{item.product.name}
									</a>
								</h3>
								<p class="text-sm text-muted-foreground mb-2">
									{item.product.category
										.split('-')
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(' ')}
								</p>
								<p class="text-lg font-semibold text-primary">
									{formatPrice(item.product.price)}
								</p>
							</div>

							<!-- Quantity Controls -->
							<div class="flex flex-col items-end gap-4">
								<Button
									variant="ghost"
									size="icon"
									onclick={() => removeItem(item.product.id)}
									class="text-destructive hover:text-destructive"
								>
									<Trash2 class="h-4 w-4" />
								</Button>

								<div class="flex items-center border rounded-md">
									<button
										class="px-3 py-2 hover:bg-muted"
										onclick={() => updateQuantity(item.product.id, item.quantity - 1)}
										disabled={item.quantity <= 1}
									>
										<Minus class="h-3 w-3" />
									</button>
									<span class="px-4 py-2 min-w-[3rem] text-center">
										{item.quantity}
									</span>
									<button
										class="px-3 py-2 hover:bg-muted"
										onclick={() => updateQuantity(item.product.id, item.quantity + 1)}
									>
										<Plus class="h-3 w-3" />
									</button>
								</div>

								<div class="text-right">
									<p class="text-sm text-muted-foreground">Subtotal</p>
									<p class="font-semibold">
										{formatPrice(item.product.price * item.quantity)}
									</p>
								</div>
							</div>
						</div>
					</Card>
				{/each}
			</div>

			<!-- Order Summary -->
			<div class="lg:col-span-1">
				<Card class="p-6 sticky top-24">
					<h2 class="text-xl font-semibold mb-4">Order Summary</h2>

					<div class="space-y-3 mb-6">
						<div class="flex justify-between">
							<span>Items ({cart.cart.itemCount})</span>
							<span>{formatPrice(cart.cart.total)}</span>
						</div>
						<div class="flex justify-between">
							<span>Shipping</span>
							<span class="text-green-600">Free</span>
						</div>
						<div class="flex justify-between">
							<span>Tax</span>
							<span>Calculated at checkout</span>
						</div>
						<div class="border-t pt-3">
							<div class="flex justify-between text-lg font-semibold">
								<span>Total</span>
								<span>{formatPrice(cart.cart.total)}</span>
							</div>
						</div>
					</div>

					<Button size="lg" class="w-full" onclick={proceedToCheckout}>
						Proceed to Checkout
						<ArrowRight class="h-4 w-4 ml-2" />
					</Button>

					<Button
						variant="outline"
						class="w-full mt-3"
						onclick={() => (window.location.href = '/')}
					>
						Continue Shopping
					</Button>

					<!-- Features -->
					<div class="mt-6 pt-6 border-t space-y-2 text-sm text-muted-foreground">
						<div class="flex items-center gap-2">
							<span class="w-2 h-2 {shippingStatus.isFreeShipping ? 'bg-green-500' : 'bg-orange-500'} rounded-full"></span>
							<span class="text-xs">{shippingStatus.isFreeShipping ? 'Free shipping active!' : `${shippingStatus.ordersLeft || 0} orders left for free shipping`}</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="w-2 h-2 bg-blue-500 rounded-full"></span>
							<span>30-day return policy</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="w-2 h-2 bg-purple-500 rounded-full"></span>
							<span>Secure checkout</span>
						</div>
					</div>
				</Card>
			</div>
		</div>
	{/if}
</div>
