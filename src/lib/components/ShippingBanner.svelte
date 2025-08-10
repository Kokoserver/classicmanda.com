<script lang="ts">
	import { onMount } from 'svelte';
	import { shippingManager } from '$lib/utils/shipping.js';
	import type { ShippingStatus } from '$lib/utils/shipping.js';

	let shippingStatus: ShippingStatus = $state({
		isFreeShipping: false,
		message: 'Loading shipping status...'
	});

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		updateShippingStatus();
		
		// Update every 30 seconds to keep it fresh
		const interval = setInterval(updateShippingStatus, 30000);
		
		return () => clearInterval(interval);
	});

	function updateShippingStatus() {
		if (mounted) {
			shippingStatus = shippingManager.getShippingStatus();
		}
	}

	// Simulate an order being placed (for demo purposes)
	function simulateOrder() {
		shippingManager.addOrder();
		updateShippingStatus();
	}
</script>

{#if mounted}
	<div class="bg-gradient-to-r from-primary to-accent text-white py-3 px-4 text-center relative overflow-hidden">
		<!-- Animated background -->
		<div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
		
		<div class="relative z-10 flex items-center justify-center gap-2 flex-wrap">
			<span class="font-semibold text-sm md:text-base">
				{shippingStatus.message}
			</span>
			
			{#if !shippingStatus.isFreeShipping && shippingStatus.ordersLeft}
				<div class="hidden md:flex items-center gap-2 ml-4">
					<div class="bg-white/20 rounded-full px-3 py-1 text-xs font-bold">
						{shippingStatus.ordersLeft} LEFT
					</div>
				</div>
			{/if}
		</div>

		<!-- Progress bar for orders left -->
		{#if !shippingStatus.isFreeShipping && shippingStatus.ordersLeft && shippingStatus.nextThreshold}
			<div class="mt-2 max-w-md mx-auto">
				<div class="bg-white/20 rounded-full h-2 overflow-hidden">
					<div 
						class="bg-white h-full rounded-full transition-all duration-500 ease-out"
						style="width: {((shippingStatus.nextThreshold - shippingStatus.ordersLeft) / shippingStatus.nextThreshold) * 100}%"
					></div>
				</div>
				<div class="text-xs mt-1 opacity-90">
					Progress to Free Shipping
				</div>
			</div>
		{/if}

		<!-- Demo button (remove in production) -->
		{#if import.meta.env.DEV}
			<button 
				onclick={simulateOrder}
				class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs font-semibold transition-colors"
			>
				+1 Order (Demo)
			</button>
		{/if}
	</div>
{/if}

<style lang="postcss">
	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.8;
		}
	}
</style>
