<script lang="ts">

	import { heroSlides } from '$lib/data/heroSlides.js';
	import Button from '$lib/components/ui/Button.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let currentSlide = $state(0);
	let autoPlay = $state(true);
	let autoPlayInterval = $state(8000);
	let intervalId = $state<number | null>(null);
	let isHovered = $state(false);

	const nextSlide = () => {
		currentSlide = (currentSlide + 1) % heroSlides.length;
	};

	const prevSlide = () => {
		currentSlide = currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1;
	};

	const goToSlide = (index: number) => {
		currentSlide = index;
	};

	const startAutoPlay = () => {
		intervalId = setInterval(nextSlide, autoPlayInterval); // Change slide every 8 seconds
	};

	const stopAutoPlay = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	};

	$effect(() => {
		if (autoPlay) {
			startAutoPlay();
		}

		return () => {
			stopAutoPlay();
		};
	});

	$effect(() => {
		if (isHovered) {
			stopAutoPlay();
		} else {
			if (autoPlay) {
				startAutoPlay();
			}
			startAutoPlay();
		}
	});
	
</script>

<section 
	class="relative h-[70vh] md:h-[70vh] lg:h-[70vh] overflow-hidden rounded-3xl mx-4 md:mx-8 shadow-2xl"
	onmouseenter={() => isHovered = true}
	onmouseleave={() => isHovered = false}
	role="banner"
>
	{#each heroSlides as slide, index}
		<div 
			class="absolute inset-0 transition-all duration-1000 ease-in-out {index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}"
			style="background-image: url('{slide.backgroundImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;"
		>
			<!-- Enhanced Multi-layer Overlay -->
			<div class="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50"></div>
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
			{#if slide.overlay}
				<div class="absolute inset-0 bg-black/20"></div>
			{/if}
			<!-- Animated particles overlay -->
			<div class="absolute inset-0 opacity-20">
				<div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
				<div class="absolute top-3/4 right-1/4 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
				<div class="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
			</div>
			
			<div class="relative h-full flex items-center justify-center">
				<div class="container mx-auto px-6 md:px-8 text-center">
					<div class="max-w-5xl mx-auto">
						<!-- Animated title with stagger effect -->
						<div class="mb-6 {index === currentSlide ? 'animate-bounce-in' : 'opacity-0'}" style="animation-delay: 0.2s;">
							<h1 class="text-4xl md:text-6xl lg:text-8xl font-black mb-2 {slide.textColor === 'light' ? 'text-white' : 'text-gray-900'} drop-shadow-2xl leading-tight tracking-tight">
								<span class="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
									{slide.title}
								</span>
							</h1>
						</div>
						
						<div class="mb-8 {index === currentSlide ? 'animate-pulse' : 'opacity-0'}" style="animation-delay: 0.4s;">
							<h2 class="text-xl md:text-3xl lg:text-4xl font-bold mb-4 {slide.textColor === 'light' ? 'text-white/95' : 'text-gray-700'} drop-shadow-lg">
								{slide.subtitle}
							</h2>
							<div class="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
						</div>
						
						<div class="mb-10 {index === currentSlide ? 'animate-pulse' : 'opacity-0'}" style="animation-delay: 0.6s;">
							<p class="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto {slide.textColor === 'light' ? 'text-white/85' : 'text-gray-600'} drop-shadow-md leading-relaxed">
								{slide.description}
							</p>
						</div>
						
						<div class="{index === currentSlide ? 'animate-bounce' : 'opacity-0'}" style="animation-delay: 0.8s;">
							<Button
								size="lg"
								class="text-lg md:text-xl px-10 py-5 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 rounded-full font-bold border-2 border-white/20 backdrop-blur-sm"
								onclick={() => {
									if (slide.ctaLink.startsWith('#')) {
										document.querySelector(slide.ctaLink)?.scrollIntoView({ behavior: 'smooth' });
									} else {
										window.location.href = slide.ctaLink;
									}
								}}
							>
								{slide.ctaText}
								<span class="ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}

	<!-- Enhanced Navigation Arrows -->
	<button
		class="absolute left-6 md:left-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white/10 to-white/20 hover:from-white/20 hover:to-white/30 text-white rounded-full p-4 md:p-5 transition-all duration-500 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110 hover:shadow-2xl hover:shadow-white/10 group"
		onclick={prevSlide}
		aria-label="Previous slide"
	>
		<ChevronLeft class="h-6 w-6 md:h-7 md:w-7 transform group-hover:-translate-x-1 transition-transform duration-300" />
	</button>
	
	<button
		class="absolute right-6 md:right-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white/10 to-white/20 hover:from-white/20 hover:to-white/30 text-white rounded-full p-4 md:p-5 transition-all duration-500 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110 hover:shadow-2xl hover:shadow-white/10 group"
		onclick={nextSlide}
		aria-label="Next slide"
	>
		<ChevronRight class="h-6 w-6 md:h-7 md:w-7 transform group-hover:translate-x-1 transition-transform duration-300" />
	</button>

	<!-- Enhanced Slide Indicators -->
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
		{#each heroSlides as _, index}
			<button
				class="relative group transition-all duration-500 {index === currentSlide ? 'w-12 h-4' : 'w-4 h-4'}"
				onclick={() => goToSlide(index)}
				aria-label="Go to slide {index + 1}"
			>
				<div class="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-white/50 backdrop-blur-sm border border-white/20 transition-all duration-500 {index === currentSlide ? 'bg-gradient-to-r from-primary to-blue-500 border-white/40' : 'hover:bg-white/70 hover:scale-110'}"></div>
				{#if index === currentSlide}
					<div class="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-blue-500 animate-pulse"></div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Enhanced Slide Counter -->
	<div class="absolute top-6 md:top-8 right-6 md:right-8 bg-gradient-to-r from-black/20 to-black/40 text-white px-4 py-2 rounded-full text-sm md:text-base backdrop-blur-md border border-white/10 font-medium">
		<span class="text-primary font-bold">{currentSlide + 1}</span> 
		<span class="text-white/60">of</span> 
		<span class="text-white/80">{heroSlides.length}</span>
	</div>
</section>
