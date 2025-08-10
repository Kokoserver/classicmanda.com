import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';

export const config = {
	// API Configuration
	apiUrl: dev 
		? (env.PUBLIC_API_URL_DEV || 'http://localhost:3001/api') 
		: (env.PUBLIC_API_URL_PROD || 'https://api.classicmanda.com'),
	useMockData: env.PUBLIC_USE_MOCK_DATA === 'true' || true, // Set to false when backend is ready

	// App Configuration
	appName: env.PUBLIC_APP_NAME || 'Classicmanda',
	appDescription: env.PUBLIC_APP_DESCRIPTION || 'Premium products for your home and business',

	// Contact Information (DEMO/EXAMPLE DATA ONLY - ALL VALUES ARE FICTIONAL)
	contactEmail: env.PUBLIC_CONTACT_EMAIL || 'demo@example-store.com',
	contactPhone: env.PUBLIC_CONTACT_PHONE || '+1 (555) 123-4567',
	contactAddress: env.PUBLIC_CONTACT_ADDRESS || '123 Demo Street, Example City, ST 12345, United States', // Random fictional address

	// Pagination
	productsPerPage: 12,

	// Cart
	cartStorageKey: 'Classicmanda-cart',

	// Admin
	adminPassword: '@bigAnimafarmClassicmanda' 
};
