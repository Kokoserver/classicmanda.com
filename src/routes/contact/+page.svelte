<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { orderService } from '$lib/services/orderService.js';
	import type { ContactForm } from '$lib/types/order.js';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { loadAdminConfig } from '$lib/utils/adminConfig.js';
	import { Mail, Phone, MapPin, Send, CircleCheckBig } from 'lucide-svelte';

	let siteConfig = $state<any>(null);

	$effect(() => {
		(async () => {
			siteConfig = await loadAdminConfig();
		})()
	});

	let contactData: ContactForm = $state({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let isSubmitted = $state(false);
	let errors: Record<string, string> = $state({});

	function validateForm(): boolean {
		errors = {};

		if (!contactData.firstName.trim()) {
			errors.firstName = 'First name is required';
		}

		if (!contactData.lastName.trim()) {
			errors.lastName = 'Last name is required';
		}

		if (!contactData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!contactData.phone.trim()) {
			errors.phone = 'Phone number is required';
		}

		if (!contactData.message.trim()) {
			errors.message = 'Message is required';
		}

		return Object.keys(errors).length === 0;
	}

	async function submitForm() {
		if (!validateForm()) {
			return;
		}

		isSubmitting = true;

		try {
			const success = await orderService.submitContactForm(contactData);
			if (success) {
				isSubmitted = true;
				// Reset form
				contactData = {
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					message: ''
				};
			} else {
				alert('There was an error sending your message. Please try again.');
			}
		} catch (error) {
			console.error('Error submitting contact form:', error);
			alert('There was an error sending your message. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact Us - Classicmanda</title>
	<meta
		name="description"
		content="Get in touch with Classicmanda for any questions about our products or services."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold mb-4">Contact Us</h1>
			<p class="text-xl text-muted-foreground">
				We'd love to hear from you. Send us a message and we'll respond as soon as possible.
			</p>
		</div>

		{#if isSubmitted}
			<Card class="p-8 text-center mb-8">
				<CircleCheckBig class="h-16 w-16 text-green-500 mx-auto mb-4" />
				<h2 class="text-2xl font-semibold mb-2">Message Sent!</h2>
				<p class="text-muted-foreground">
					Thank you for contacting us. We'll get back to you within 24 hours.
				</p>
			</Card>
		{/if}

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Contact Information -->
			<div class="lg:col-span-1 space-y-6">
				<Card class="p-6">
					<h2 class="text-xl font-semibold mb-4">Get in Touch</h2>
					<div class="space-y-4">
						{#if siteConfig}
							<div class="flex items-start gap-3">
								<Mail class="h-5 w-5 text-primary mt-1" />
								<div>
									<p class="font-medium">Email</p>
									<p class="text-muted-foreground">{siteConfig.contact.email}</p>
								</div>
							</div>

							<div class="flex items-start gap-3">
								<Phone class="h-5 w-5 text-primary mt-1" />
								<div>
									<p class="font-medium">Phone</p>
									<p class="text-muted-foreground">{siteConfig.contact.phone}</p>
								</div>
							</div>

							<div class="flex items-start gap-3">
								<MapPin class="h-5 w-5 text-primary mt-1" />
								<div>
									<p class="font-medium">Address</p>
									<p class="text-muted-foreground">
										{siteConfig.contact.address.full}
									</p>
								</div>
							</div>
						{/if}
					</div>
				</Card>

				<Card class="p-6">
					<h3 class="text-lg font-semibold mb-3">Business Hours</h3>
					<div class="space-y-2 text-sm">
						<div class="flex justify-between">
							<span>Monday - Friday</span>
							<span>9:00 AM - 6:00 PM</span>
						</div>
						<div class="flex justify-between">
							<span>Saturday</span>
							<span>10:00 AM - 4:00 PM</span>
						</div>
						<div class="flex justify-between">
							<span>Sunday</span>
							<span>Closed</span>
						</div>
					</div>
				</Card>
			</div>

			<!-- Contact Form -->
			<div class="lg:col-span-2">
				<Card class="p-6">
					<h2 class="text-xl font-semibold mb-6">Send us a Message</h2>

					<form onsubmit={preventDefault(submitForm)} class="space-y-4">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label for="firstName" class="block text-sm font-medium mb-1">First Name *</label>
								<Input
									id="firstName"
									bind:value={contactData.firstName}
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
									bind:value={contactData.lastName}
									placeholder="Doe"
									class={errors.lastName ? 'border-destructive' : ''}
								/>
								{#if errors.lastName}
									<p class="text-sm text-destructive mt-1">{errors.lastName}</p>
								{/if}
							</div>
						</div>

						<div>
							<label for="email" class="block text-sm font-medium mb-1">Email *</label>
							<Input
								id="email"
								type="email"
								bind:value={contactData.email}
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
								bind:value={contactData.phone}
								placeholder="+1 (555) 123-4567"
								class={errors.phone ? 'border-destructive' : ''}
							/>
							{#if errors.phone}
								<p class="text-sm text-destructive mt-1">{errors.phone}</p>
							{/if}
						</div>

						<div>
							<label for="message" class="block text-sm font-medium mb-1">Message *</label>
							<textarea
								id="message"
								bind:value={contactData.message}
								placeholder="Tell us how we can help you..."
								rows="6"
								class="w-full px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
								class:border-destructive={errors.message}
							></textarea>
							{#if errors.message}
								<p class="text-sm text-destructive mt-1">{errors.message}</p>
							{/if}
						</div>

						<Button type="submit" size="lg" class="w-full" disabled={isSubmitting}>
							{#if isSubmitting}
								Sending...
							{:else}
								<Send class="h-4 w-4 mr-2" />
								Send Message
							{/if}
						</Button>
					</form>
				</Card>
			</div>
		</div>
	</div>
</div>
