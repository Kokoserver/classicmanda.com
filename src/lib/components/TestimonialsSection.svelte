<script lang="ts">
	import { testimonials } from '$lib/data/testimonials.js';
	import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-svelte';

	let currentSlide = $state(0);
	let autoPlayInterval = $state<ReturnType<typeof setInterval> | null>(null);
	let isHovered = $state(false);
	const testimonialsPerSlide = 3; // Show 3 testimonials at a time
	const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

	function renderStars(rating: number) {
		return Array.from({ length: 5 }, (_, i) => i < rating);
	}

	const nextSlide = () => {
		currentSlide = (currentSlide + 1) % totalSlides;
	};

	const prevSlide = () => {
		currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
	};

	const goToSlide = (index: number) => {
		currentSlide = index;
	};

	const startAutoPlay = () => {
		autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
	};

	const stopAutoPlay = () => {
		if (autoPlayInterval) {
			clearInterval(autoPlayInterval);
			autoPlayInterval = null;
		}
	};

	// Initialize autoplay and handle cleanup
	$effect(() => {
		startAutoPlay();
		
		return () => {
			stopAutoPlay();
		};
	});

	// Handle hover state changes
	$effect(() => {
		if (isHovered) {
			stopAutoPlay();
		} else {
			startAutoPlay();
		}
	});

	let visibleTestimonials = $derived(testimonials.slice(
		currentSlide * testimonialsPerSlide,
		(currentSlide + 1) * testimonialsPerSlide
	));
</script>

<section class="py-16 bg-muted/30">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<div class="flex items-center justify-center gap-2 mb-4">
				<Quote class="h-6 w-6 text-primary" />
				<h2 class="text-3xl font-bold">What Our Customers Say</h2>
			</div>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Classicmanda.
			</p>
		</div>

		<!-- Testimonials Carousel -->
		<div 
			class="relative overflow-hidden"
			onmouseenter={() => isHovered = true}
			onmouseleave={() => isHovered = false}
			role="region"
			aria-label="Customer testimonials carousel"
		>
			<div class="transition-transform duration-500 ease-in-out" style="transform: translateX(-{currentSlide * 100}%)">
				<div class="flex">
					{#each Array(totalSlides) as _, slideIndex}
						<div class="w-full flex-shrink-0">
							<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
								{#each testimonials.slice(slideIndex * testimonialsPerSlide, (slideIndex + 1) * testimonialsPerSlide) as testimonial}
									<div class="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
										<div class="flex items-center gap-1 mb-4">
											{#each renderStars(testimonial.rating) as filled}
												<Star class="h-4 w-4 {filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}" />
											{/each}
										</div>
										
										<blockquote class="text-muted-foreground mb-6 leading-relaxed">
											"{testimonial.content}"
										</blockquote>
										
										<div class="flex items-center gap-3">
											{#if testimonial.image}
												<img 
													src={testimonial.image} 
													alt={testimonial.name}
													class="w-12 h-12 rounded-full object-cover"
												/>
											{:else}
												<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
													<span class="text-primary font-semibold">
														{testimonial.name.charAt(0)}
													</span>
												</div>
											{/if}
											
											<div class="flex-1">
												<div class="font-semibold text-foreground">{testimonial.name}</div>
												<div class="text-sm text-muted-foreground">
													{testimonial.role}
													{#if testimonial.company}
														<span class="text-primary">@ {testimonial.company}</span>
													{/if}
												</div>
												{#if testimonial.location}
													<div class="text-xs text-muted-foreground">{testimonial.location}</div>
												{/if}
												{#if testimonial.productCategory}
													<div class="text-xs text-primary font-medium mt-1">
														{testimonial.productCategory}
													</div>
												{/if}
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Navigation Arrows -->
			<button
				class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
				onclick={prevSlide}
				aria-label="Previous testimonials"
			>
				<ChevronLeft class="h-5 w-5" />
			</button>
			
			<button
				class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
				onclick={nextSlide}
				aria-label="Next testimonials"
			>
				<ChevronRight class="h-5 w-5" />
			</button>

			<!-- Slide Indicators -->
			<div class="flex justify-center mt-8 space-x-2">
				{#each Array(totalSlides) as _, index}
					<button
						class="w-3 h-3 rounded-full transition-all duration-300 {index === currentSlide ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'}"
						onclick={() => goToSlide(index)}
						aria-label="Go to testimonial slide {index + 1}"
					></button>
				{/each}
			</div>
		</div>

		<div class="text-center mt-12">
			<p class="text-muted-foreground mb-4">
				Join thousands of satisfied customers who trust Classicmanda for their premium product needs.
			</p>
			<div class="flex items-center justify-center gap-8 text-sm text-muted-foreground">
				<div class="flex items-center gap-2">
					<Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
					<span class="font-semibold">4.9/5</span>
					<span>Average Rating</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="font-semibold">500+</span>
					<span>Happy Customers</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="font-semibold">98%</span>
					<span>Satisfaction Rate</span>
				</div>
			</div>
		</div>
	</div>
</section>
