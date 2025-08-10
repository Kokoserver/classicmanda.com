import { dev } from '$app/environment';

export const config = {
	// API Configuration
	apiUrl: dev ? 'http://localhost:3001/api' : 'https://api.Classicmanda.com',
	useMockData: true, // Set to false when backend is ready

	// App Configuration
	appName: 'Classicmanda',
	appDescription: 'Premium products for your home and business',

	// Contact Information
	contactEmail: 'info@classicmanda.com',
	contactPhone: '+1 (205) 852-7810',
	contactAddress: '624 Skyland Blvd E, Tuscaloosa, Alabama 35405, United States',

	// Pagination
	productsPerPage: 12,

	// Cart
	cartStorageKey: 'Classicmanda-cart',

	// Admin
	adminPassword: '@bigAnimafarmClassicmanda' 
};
