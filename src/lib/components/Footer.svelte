<script lang="ts">
	import { config } from '$lib/config/env.js';
	import { Mail, Phone, MapPin } from 'lucide-svelte';
</script>

<footer class="bg-muted/50 border-t">
	<div class="container mx-auto px-4 py-12">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- Company Info -->
			<div class="space-y-4">
				<img src="/logo.svg" alt="Classicmanda" class="h-12 w-auto" />
				<p class="text-sm text-muted-foreground">
					{config.appDescription}
				</p>
				<div class="space-y-2">
					<div class="flex items-center space-x-2 text-sm">
						<Mail class="h-4 w-4" />
						<span>{config.contactEmail}</span>
					</div>
					<div class="flex items-center space-x-2 text-sm">
						<Phone class="h-4 w-4" />
						<span>{config.contactPhone}</span>
					</div>
					<div class="flex items-start space-x-2 text-sm">
						<MapPin class="h-6 w-6 mt-0.5" />
						<span>{config.contactAddress}</span>
					</div>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="space-y-4">
				<h3 class="text-sm font-semibold">Quick Links</h3>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/" class="text-muted-foreground hover:text-foreground transition-colors"
							>Home</a
						>
					</li>
					<li>
						<a
							href="/products"
							class="text-muted-foreground hover:text-foreground transition-colors">All Products</a
						>
					</li>
					<li>
						<a href="/cart" class="text-muted-foreground hover:text-foreground transition-colors"
							>Shopping Cart</a
						>
					</li>
					<li>
						<a href="/contact" class="text-muted-foreground hover:text-foreground transition-colors"
							>Contact Us</a
						>
					</li>
				</ul>
			</div>

			<!-- Categories -->
			<div class="space-y-4">
				<h3 class="text-sm font-semibold">Categories</h3>
				<ul class="space-y-2 text-sm">
					<li>
						<a
							href="/?category=solar-panels"
							class="text-muted-foreground hover:text-foreground transition-colors">Solar Panels</a
						>
					</li>
					<li>
						<a
							href="/?category=dishwashers"
							class="text-muted-foreground hover:text-foreground transition-colors">Dishwashers</a
						>
					</li>
					<li>
						<a
							href="/?category=chandeliers"
							class="text-muted-foreground hover:text-foreground transition-colors">Chandeliers</a
						>
					</li>
					<li>
						<a
							href="/?category=building-materials"
							class="text-muted-foreground hover:text-foreground transition-colors"
							>Building Materials</a
						>
					</li>
					<li>
						<a
							href="/?category=tools"
							class="text-muted-foreground hover:text-foreground transition-colors">Tools</a
						>
					</li>
				</ul>
			</div>

			<!-- Legal -->
			<div class="space-y-4">
				<h3 class="text-sm font-semibold">Legal</h3>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/privacy" class="text-muted-foreground hover:text-foreground transition-colors"
							>Privacy Policy</a
						>
					</li>
					<li>
						<a href="/terms" class="text-muted-foreground hover:text-foreground transition-colors"
							>Terms of Service</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div class="border-t mt-8 pt-8 text-center">
			<p class="text-sm text-muted-foreground">
				© {new Date().getFullYear()} Classicmanda. All rights reserved.
			</p>
		</div>
	</div>
</footer>
