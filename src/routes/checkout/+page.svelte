<script lang="ts">

	import { cart } from '$lib/stores/cart.svelte.js';
	import { orderService } from '$lib/services/orderService.js';
	import type { CheckoutData } from '$lib/types/cart.js';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { CreditCard, MapPin, User, CircleCheckBig } from 'lucide-svelte';

	let checkoutData: CheckoutData = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: {
			street: '',
			city: '',
			state: '',
			zipCode: '',
			country: 'United States'
		},
		notes: ''
	};

	let isSubmitting = $state(false);
	let orderComplete = $state(false);
	let orderId = $state('');
	let errors = $state<Record<string, string>>({});

	$effect(() => {
		cart.init();

		// Redirect if cart is empty
		if (cart.cart.items.length === 0) {
			window.location.href = '/cart';
		}
	});

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(price);
	}

	function validateForm(): boolean {
		errors = {};

		if (!checkoutData.firstName.trim()) {
			errors.firstName = 'First name is required';
		}

		if (!checkoutData.lastName.trim()) {
			errors.lastName = 'Last name is required';
		}

		if (!checkoutData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!checkoutData.phone.trim()) {
			errors.phone = 'Phone number is required';
		}

		if (!checkoutData.address.street.trim()) {
			errors.street = 'Street address is required';
		}

		if (!checkoutData.address.city.trim()) {
			errors.city = 'City is required';
		}

		if (!checkoutData.address.state.trim()) {
			errors.state = 'State is required';
		}

		if (!checkoutData.address.zipCode.trim()) {
			errors.zipCode = 'ZIP code is required';
		}

		return Object.keys(errors).length === 0;
	}

	async function submitOrder() {
		if (!validateForm()) {
			return;
		}

		isSubmitting = true;

		try {
			const order = await orderService.createOrder(cart.cart, checkoutData);
			orderId = order.id;
			orderComplete = true;
			cart.clear();
		} catch (error) {
			console.error('Error creating order:', error);
			alert('There was an error processing your order. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Checkout - Velvet supply</title>
	<meta name="description" content="Complete your order with Velvet supply." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	{#if orderComplete}
		<!-- Order Confirmation -->
		<div class="max-w-2xl mx-auto text-center">
			<CircleCheckBig class="h-16 w-16 text-green-500 mx-auto mb-6" />
			<h1 class="text-3xl font-bold mb-4">Order Confirmed!</h1>
			<p class="text-lg text-muted-foreground mb-6">
				Thank you for your order. We'll contact you soon to confirm the details and arrange
				delivery.
			</p>
			<Card class="p-6 mb-6">
				<h2 class="text-xl font-semibold mb-4">Order Details</h2>
				<div class="text-left space-y-2">
					<div class="flex justify-between">
						<span>Order ID:</span>
						<span class="font-mono">{orderId}</span>
					</div>
					<div class="flex justify-between">
						<span>Total:</span>
						<span class="font-semibold">{formatPrice(cart.cart.total)}</span>
					</div>
					<div class="flex justify-between">
						<span>Contact:</span>
						<span>{checkoutData.email}</span>
					</div>
				</div>
			</Card>
			<div class="space-x-4">
				<Button onclick={() => (window.location.href = '/')}>Continue Shopping</Button>
				<Button variant="outline" onclick={() => (window.location.href = '/contact')}>
					Contact Us
				</Button>
			</div>
		</div>
	{:else}
		<div class="flex items-center gap-2 mb-8">
			<CreditCard class="h-6 w-6" />
			<h1 class="text-3xl font-bold">Checkout</h1>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Checkout Form -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Contact Information -->
				<Card class="p-6">
					<div class="flex items-center gap-2 mb-4">
						<User class="h-5 w-5" />
						<h2 class="text-xl font-semibold">Contact Information</h2>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="firstName" class="block text-sm font-medium mb-1">First Name *</label>
							<Input
								id="firstName"
								bind:value={checkoutData.firstName}
								placeholder="John"
								class={errors.firstName ? 'border-destructive' : ''}
							/>
							{#if errors.firstName}
								<p class="text-sm text-destructive mt-1">{errors.firstName}</p>
							{/if}
						</div>

						<div>
							<label for="lastName" class="block text-sm font-medium mb-1">Last Name *</label>
							<Input
								id="lastName"
								bind:value={checkoutData.lastName}
								placeholder="Doe"
								class={errors.lastName ? 'border-destructive' : ''}
							/>
							{#if errors.lastName}
								<p class="text-sm text-destructive mt-1">{errors.lastName}</p>
							{/if}
						</div>

						<div>
							<label for="email" class="block text-sm font-medium mb-1">Email *</label>
							<Input
								id="email"
								type="email"
								bind:value={checkoutData.email}
								placeholder="john@example.com"
								class={errors.email ? 'border-destructive' : ''}
							/>
							{#if errors.email}
								<p class="text-sm text-destructive mt-1">{errors.email}</p>
							{/if}
						</div>

						<div>
							<label for="phone" class="block text-sm font-medium mb-1">Phone *</label>
							<Input
								id="phone"
								type="tel"
								bind:value={checkoutData.phone}
								placeholder="+1 (555) 123-4567"
								class={errors.phone ? 'border-destructive' : ''}
							/>
							{#if errors.phone}
								<p class="text-sm text-destructive mt-1">{errors.phone}</p>
							{/if}
						</div>
					</div>
				</Card>

				<!-- Shipping Address -->
				<Card class="p-6">
					<div class="flex items-center gap-2 mb-4">
						<MapPin class="h-5 w-5" />
						<h2 class="text-xl font-semibold">Shipping Address</h2>
					</div>

					<div class="space-y-4">
						<div>
							<label for="street" class="block text-sm font-medium mb-1">Street Address *</label>
							<Input
								id="street"
								bind:value={checkoutData.address.street}
								placeholder="123 Main Street"
								class={errors.street ? 'border-destructive' : ''}
							/>
							{#if errors.street}
								<p class="text-sm text-destructive mt-1">{errors.street}</p>
							{/if}
						</div>

						<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label for="city" class="block text-sm font-medium mb-1">City *</label>
								<Input
									id="city"
									bind:value={checkoutData.address.city}
									placeholder="New York"
									class={errors.city ? 'border-destructive' : ''}
								/>
								{#if errors.city}
									<p class="text-sm text-destructive mt-1">{errors.city}</p>
								{/if}
							</div>

							<div>
								<label for="state" class="block text-sm font-medium mb-1">State *</label>
								<Input
									id="state"
									bind:value={checkoutData.address.state}
									placeholder="NY"
									class={errors.state ? 'border-destructive' : ''}
								/>
								{#if errors.state}
									<p class="text-sm text-destructive mt-1">{errors.state}</p>
								{/if}
							</div>

							<div>
								<label for="zipCode" class="block text-sm font-medium mb-1">ZIP Code *</label>
								<Input
									id="zipCode"
									bind:value={checkoutData.address.zipCode}
									placeholder="10001"
									class={errors.zipCode ? 'border-destructive' : ''}
								/>
								{#if errors.zipCode}
									<p class="text-sm text-destructive mt-1">{errors.zipCode}</p>
								{/if}
							</div>
						</div>

						<div>
							<label for="country" class="block text-sm font-medium mb-1">Country</label>
							<Input id="country" bind:value={checkoutData.address.country} readonly />
						</div>
					</div>
				</Card>

				<!-- Order Notes -->
				<Card class="p-6">
					<h2 class="text-xl font-semibold mb-4">Order Notes (Optional)</h2>
					<textarea
						bind:value={checkoutData.notes}
						placeholder="Any special instructions or notes for your order..."
						class="w-full min-h-[100px] px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
					></textarea>
				</Card>
			</div>

			<!-- Order Summary -->
			<div class="lg:col-span-1">
				<Card class="p-6 sticky top-24">
					<h2 class="text-xl font-semibold mb-4">Order Summary</h2>

					<!-- Cart Items -->
					<div class="space-y-3 mb-6">
						{#each cart.cart.items as item}
							<div class="flex gap-3">
								<img
									src={item.product.images[0]}
									alt={item.product.name}
									class="w-12 h-12 object-cover rounded"
								/>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium truncate">{item.product.name}</p>
									<p class="text-xs text-muted-foreground">Qty: {item.quantity}</p>
								</div>
								<p class="text-sm font-medium">
									{formatPrice(item.product.price * item.quantity)}
								</p>
							</div>
						{/each}
					</div>

					<div class="space-y-3 mb-6 border-t pt-4">
						<div class="flex justify-between">
							<span>Subtotal</span>
							<span>{formatPrice(cart.cart.total)}</span>
						</div>
						<div class="flex justify-between">
							<span>Shipping</span>
							<span class="text-green-600">Free</span>
						</div>
						<div class="flex justify-between text-lg font-semibold border-t pt-3">
							<span>Total</span>
							<span>{formatPrice(cart.cart.total)}</span>
						</div>
					</div>

					<Button size="lg" class="w-full" onclick={submitOrder} disabled={isSubmitting}>
						{#if isSubmitting}
							Processing...
						{:else}
							Place Order
						{/if}
					</Button>

					<p class="text-xs text-muted-foreground mt-4 text-center">
						By placing your order, you agree that our team will contact you to confirm the details
						and arrange payment and delivery.
					</p>
				</Card>
			</div>
		</div>
	{/if}
</div>
