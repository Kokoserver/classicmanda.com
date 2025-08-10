<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ShippingBanner from '$lib/components/ShippingBanner.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<ShippingBanner />
	<Header />
	<main class="flex-1">
		{@render children?.()}
	</main>
	<Footer />
</div>
