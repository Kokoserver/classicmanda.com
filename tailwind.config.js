/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#D4AF37', // Rich Gold
					foreground: '#1a1a1a'
				},
				secondary: {
					DEFAULT: '#1e293b', // Deep Navy
					foreground: '#f8fafc'
				},
				muted: {
					DEFAULT: '#f8f9fa', // Warm White
					foreground: '#64748b'
				},
				accent: {
					DEFAULT: '#B8860B', // Dark Gold
					foreground: '#ffffff'
				},
				destructive: {
					DEFAULT: '#dc2626',
					foreground: '#ffffff'
				},
				luxury: {
					gold: '#D4AF37',
					darkGold: '#B8860B',
					rose: '#E8B4B8',
					navy: '#1e293b',
					charcoal: '#374151',
					cream: '#FDF6E3'
				},
				border: '#e5e7eb',
				input: '#e5e7eb',
				ring: '#D4AF37',
				background: '#ffffff',
				foreground: '#1a1a1a',
				card: {
					DEFAULT: '#ffffff',
					foreground: '#1a1a1a'
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography')
	]
};
