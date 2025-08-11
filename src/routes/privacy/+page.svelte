<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { adminConfigStore } from '$lib/stores/adminConfig.js';
	import { getFullAddress } from '$lib/utils/adminConfig.js';

	let siteConfig = $state<any>(null);

	$effect(() => {
		return adminConfigStore.subscribe(config => {
			siteConfig = config;
		});
	});
</script>

<svelte:head>
	<title>Privacy Policy - Velvet supply</title>
	<meta name="description" content="Velvet supply's privacy policy and data protection information." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold mb-4">Privacy Policy</h1>
			<p class="text-muted-foreground">
				Last updated: {new Date().toLocaleDateString()}
			</p>
		</div>

		<Card class="p-8">
			<div class="prose prose-gray max-w-none">
				<h2>Introduction</h2>
				<p>
					Welcome to Velvet supply. We respect your privacy and are committed to protecting your personal data. 
					This privacy policy will inform you about how we look after your personal data when you visit our 
					website and tell you about your privacy rights.
				</p>

				<h2>Information We Collect</h2>
				<h3>Personal Information</h3>
				<p>We may collect the following personal information:</p>
				<ul>
					<li>Name and contact information (email address, phone number)</li>
					<li>Shipping and billing addresses</li>
					<li>Order history and preferences</li>
					<li>Communication preferences</li>
				</ul>

				<h3>Automatically Collected Information</h3>
				<p>When you visit our website, we may automatically collect:</p>
				<ul>
					<li>IP address and browser information</li>
					<li>Pages visited and time spent on our site</li>
					<li>Referring website information</li>
					<li>Device and operating system information</li>
				</ul>

				<h2>How We Use Your Information</h2>
				<p>We use your personal information to:</p>
				<ul>
					<li>Process and fulfill your orders</li>
					<li>Communicate with you about your orders and our services</li>
					<li>Improve our website and customer service</li>
					<li>Send you marketing communications (with your consent)</li>
					<li>Comply with legal obligations</li>
				</ul>

				<h2>Information Sharing</h2>
				<p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
				<ul>
					<li>To trusted service providers who assist us in operating our website and conducting business</li>
					<li>When required by law or to protect our rights</li>
					<li>In connection with a business transfer or merger</li>
				</ul>

				<h2>Data Security</h2>
				<p>
					We implement appropriate security measures to protect your personal information against 
					unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
					over the internet is 100% secure.
				</p>

				<h2>Your Rights</h2>
				<p>You have the right to:</p>
				<ul>
					<li>Access your personal data</li>
					<li>Correct inaccurate personal data</li>
					<li>Request deletion of your personal data</li>
					<li>Object to processing of your personal data</li>
					<li>Request transfer of your personal data</li>
					<li>Withdraw consent at any time</li>
				</ul>

				<h2>Cookies</h2>
				<p>
					Our website uses cookies to enhance your browsing experience. Cookies are small files stored 
					on your device that help us remember your preferences and improve our services. You can 
					control cookie settings through your browser.
				</p>

				<h2>Third-Party Links</h2>
				<p>
					Our website may contain links to third-party websites. We are not responsible for the privacy 
					practices of these external sites. We encourage you to review their privacy policies.
				</p>

				<h2>Children's Privacy</h2>
				<p>
					Our services are not intended for children under 13 years of age. We do not knowingly collect 
					personal information from children under 13.
				</p>

				<h2>Changes to This Policy</h2>
				<p>
					We may update this privacy policy from time to time. We will notify you of any changes by 
					posting the new policy on this page and updating the "last updated" date.
				</p>

				<h2>Contact Us</h2>
				<p>
					If you have any questions about this privacy policy or our data practices, please contact us:
				</p>
				{#if siteConfig}
					<ul>
						<li>Email: {siteConfig.contact.email}</li>
						<li>Phone: {siteConfig.contact.phone}</li>
						<li>Address: {getFullAddress(siteConfig.contact.address)}</li>
					</ul>
				{/if}

				<h2>Consent</h2>
				<p>
					By using our website, you consent to our privacy policy and agree to the collection and use 
					of your information as described herein.
				</p>
			</div>
		</Card>
	</div>
</div>

<style lang="postcss">
	.prose h2 {
		@apply text-2xl font-bold mt-8 mb-4 text-foreground;
	}
	
	.prose h3 {
		@apply text-xl font-semibold mt-6 mb-3 text-foreground;
	}
	
	.prose p {
		@apply mb-4 text-muted-foreground leading-relaxed;
	}
	
	.prose ul {
		@apply mb-4 pl-6 space-y-1;
	}
	
	.prose li {
		@apply text-muted-foreground;
	}
</style>
