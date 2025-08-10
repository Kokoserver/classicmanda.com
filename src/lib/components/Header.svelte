<script lang="ts">
	import { page } from '$app/state';
	import { cart } from '$lib/stores/cart.svelte.js';
	import Button from './ui/Button.svelte';
	import { ShoppingCart, Search, Menu, X } from 'lucide-svelte';


	let isMenuOpen = $state(false);
	let searchQuery = $state('');

	$effect(() => {
		cart.init();
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function handleSearch() {
		if (searchQuery.trim()) {
			window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
		}
	}

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/products', label: 'Products' },
		{ href: '/contact', label: 'Contact' },
		{ href: '/privacy', label: 'Privacy' }
	];
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto px-4">
		<div class="flex h-20 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2">
				<img src="/logo.svg" alt="Classicmanda" class="h-14 w-auto" />
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center space-x-8">
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						class="text-base font-medium transition-colors hover:text-primary"
						class:text-primary={page.url.pathname === item.href}
						class:text-muted-foreground={page.url.pathname !== item.href}
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<!-- Search Bar (Desktop) -->
			<div class="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-6">
				<div class="relative flex-1">
					<input
						type="text"
						placeholder="Search products..."
						bind:value={searchQuery}
						onkeydown={(e) => e.key === 'Enter' && handleSearch()}
						class="w-full h-9 px-3 py-1 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
					/>
					<Button
						variant="ghost"
						size="icon"
						class="absolute right-0 top-0 h-9 w-9"
						onclick={handleSearch}
					>
						<Search class="h-4 w-4" />
					</Button>
				</div>
			</div>

			<!-- Cart and Mobile Menu -->
			<div class="flex items-center space-x-2">
				<!-- Cart Button -->
				<Button
					variant="ghost"
					size="icon"
					class="relative"
					onclick={() => (window.location.href = '/cart')}
				>
					<ShoppingCart class="h-5 w-5" />
					{#if cart.cart.itemCount > 0}
						<span
							class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center"
						>
							{cart.cart.itemCount}
						</span>
					{/if}
				</Button>

				<!-- Mobile Menu Button -->
				<Button variant="ghost" size="icon" class="md:hidden" onclick={toggleMenu}>
					{#if isMenuOpen}
						<X class="h-5 w-5" />
					{:else}
						<Menu class="h-5 w-5" />
					{/if}
				</Button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if isMenuOpen}
			<div class="md:hidden border-t py-4">
				<!-- Mobile Search -->
				<div class="flex items-center space-x-2 mb-4">
					<input
						type="text"
						placeholder="Search products..."
						bind:value={searchQuery}
						onkeydown={(e) => e.key === 'Enter' && handleSearch()}
						class="flex-1 h-9 px-3 py-1 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
					/>
					<Button variant="outline" size="icon" onclick={handleSearch}>
						<Search class="h-4 w-4" />
					</Button>
				</div>

				<!-- Mobile Navigation -->
				<nav class="flex flex-col space-y-2">
					{#each navItems as item}
						<a
							href={item.href}
							class="block px-2 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent"
							class:text-primary={page.url.pathname === item.href}
							class:text-muted-foreground={page.url.pathname !== item.href}
							onclick={() => (isMenuOpen = false)}
						>
							{item.label}
						</a>
					{/each}
				</nav>
			</div>
		{/if}
	</div>
</header>
