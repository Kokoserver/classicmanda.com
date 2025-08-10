<script lang="ts">
	
	$effect(() => {
		// Scroll to top when page loads
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>Terms of Service - Classicmanda</title>
	<meta
		name="description"
		content="Terms of Service for Classicmanda - Premium products for your home and business."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-4xl">
	<div class="prose prose-lg max-w-none">
		<h1 class="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
		<p class="text-muted-foreground text-center mb-12">
			Last updated: {new Date().toLocaleDateString('en-US', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			})}
		</p>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
			<p class="mb-4">
				By accessing and using Classicmanda's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">2. About Our Services</h2>
			<p class="mb-4">
				Classicmanda is an e-commerce platform that provides premium products including solar panels, dishwashers, chandeliers, building materials, and tools for homes and businesses across Nigeria.
			</p>
			<p class="mb-4">
				We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">3. Product Information and Pricing</h2>
			<p class="mb-4">
				We strive to provide accurate product descriptions, specifications, and pricing information. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
			</p>
			<p class="mb-4">
				All prices are subject to change without notice. We reserve the right to correct any errors in pricing or product information.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">4. Orders and Payment</h2>
			<p class="mb-4">
				When you place an order through our website, you are making an offer to purchase products. All orders are subject to acceptance by Classicmanda.
			</p>
			<p class="mb-4">
				We do not process online payments. Our team will contact you after order placement to confirm details and arrange payment and delivery.
			</p>
			<p class="mb-4">
				We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or suspected fraudulent activity.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">5. Delivery and Installation</h2>
			<p class="mb-4">
				Delivery times are estimates and may vary based on product availability and location. We will make reasonable efforts to deliver products within the estimated timeframe.
			</p>
			<p class="mb-4">
				Installation services, where applicable, will be provided by qualified professionals. Additional terms may apply for installation services.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">6. Returns and Warranties</h2>
			<p class="mb-4">
				Product warranties are provided by the respective manufacturers. Classicmanda will assist in warranty claims and returns as per manufacturer policies.
			</p>
			<p class="mb-4">
				Returns must be authorized by Classicmanda and may be subject to restocking fees. Products must be in original condition and packaging.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">7. User Conduct</h2>
			<p class="mb-4">
				You agree to use our services only for lawful purposes and in accordance with these Terms of Service. You agree not to:
			</p>
			<ul class="list-disc pl-6 mb-4 space-y-2">
				<li>Use our services for any unlawful purpose or to solicit others to perform unlawful acts</li>
				<li>Violate any international, federal, provincial, or local regulations or laws</li>
				<li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
				<li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
				<li>Submit false or misleading information</li>
			</ul>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">8. Privacy Policy</h2>
			<p class="mb-4">
				Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">9. Intellectual Property</h2>
			<p class="mb-4">
				The service and its original content, features, and functionality are and will remain the exclusive property of Classicmanda and its licensors. The service is protected by copyright, trademark, and other laws.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
			<p class="mb-4">
				In no event shall Classicmanda, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">11. Governing Law</h2>
			<p class="mb-4">
				These Terms shall be interpreted and governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the jurisdiction of Nigerian courts.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
			<p class="mb-4">
				We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">13. Contact Information</h2>
			<p class="mb-4">
				If you have any questions about these Terms of Service, please contact us through our contact page or customer service channels.
			</p>
		</section>

		<div class="text-center mt-12 pt-8 border-t">
			<p class="text-muted-foreground">
				Thank you for choosing Classicmanda for your premium product needs.
			</p>
			<a href="/" class="inline-block mt-4 text-primary hover:underline">
				← Return to Home
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
	.prose h1 {
		@apply text-foreground;
	}
	
	.prose h2 {
		@apply text-foreground;
	}
	
	.prose p {
		@apply text-muted-foreground leading-relaxed;
	}
	
	.prose ul li {
		@apply text-muted-foreground;
	}
</style>
