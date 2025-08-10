<script lang="ts">
	import type { Product } from '$lib/types/product.js';
	import ProductCard from './ProductCard.svelte';
	import Button from './ui/Button.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';


	interface Props {
		products?: Product[];
		title?: string;
		autoPlay?: boolean;
	}

	let { products = [], title = '', autoPlay = false }: Props = $props();

	let carousel: HTMLElement | undefined = $state();
	let currentIndex = $state(0);
	let itemWidth = $state(0);
	let visibleItems = $state(4);

	$effect(() => {
		updateVisibleItems();
		window.addEventListener('resize', updateVisibleItems);

		if (autoPlay) {
			const interval = setInterval(() => {
				next();
			}, 5000);

			return () => {
				clearInterval(interval);
				window.removeEventListener('resize', updateVisibleItems);
			};
		}

		return () => {
			window.removeEventListener('resize', updateVisibleItems);
		};
	});

	function updateVisibleItems() {
		const width = window.innerWidth;
		if (width < 640) visibleItems = 1;
		else if (width < 768) visibleItems = 2;
		else if (width < 1024) visibleItems = 3;
		else visibleItems = 4;

		itemWidth = 100 / visibleItems;
	}

	function next() {
		if (currentIndex < products.length - visibleItems) {
			currentIndex++;
		} else {
			currentIndex = 0;
		}
		updateCarousel();
	}

	function prev() {
		if (currentIndex > 0) {
			currentIndex--;
		} else {
			currentIndex = Math.max(0, products.length - visibleItems);
		}
		updateCarousel();
	}

	function updateCarousel() {
		if (carousel) {
			const translateX = -(currentIndex * itemWidth);
			carousel.style.transform = `translateX(${translateX}%)`;
		}
	}

	let canGoPrev = $derived(currentIndex > 0);
	let canGoNext = $derived(currentIndex < products.length - visibleItems);
</script>

{#if products.length > 0}
	<section class="py-8">
		<div class="flex items-center justify-between mb-6">
			<h2 class="text-2xl font-bold">{title}</h2>
			<div class="flex gap-2">
				<Button variant="outline" size="icon" onclick={prev} disabled={!canGoPrev}>
					<ChevronLeft class="h-4 w-4" />
				</Button>
				<Button variant="outline" size="icon" onclick={next} disabled={!canGoNext}>
					<ChevronRight class="h-4 w-4" />
				</Button>
			</div>
		</div>

		<div class="relative overflow-hidden">
			<div
				bind:this={carousel}
				class="flex transition-transform duration-300 ease-in-out"
				style="width: {(products.length / visibleItems) * 100}%"
			>
				{#each products as product}
					<div class="px-2" style="flex: 0 0 {itemWidth}%">
						<ProductCard {product} />
					</div>
				{/each}
			</div>
		</div>

		<!-- Dots indicator -->
		{#if products.length > visibleItems}
			<div class="flex justify-center mt-4 gap-2">
				{#each Array(Math.ceil(products.length / visibleItems)) as _, index}
					<button
						class="w-2 h-2 rounded-full transition-colors"
						class:bg-primary={Math.floor(currentIndex / visibleItems) === index}
						class:bg-muted={Math.floor(currentIndex / visibleItems) !== index}
						aria-label="Go to slide {index + 1}"
						onclick={() => {
							currentIndex = index * visibleItems;
							updateCarousel();
						}}
					></button>
				{/each}
			</div>
		{/if}
	</section>
{/if}
