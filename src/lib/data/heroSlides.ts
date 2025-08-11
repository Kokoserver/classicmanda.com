export interface HeroSlide {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	backgroundImage: string;
	ctaText: string;
	ctaLink: string;
	textColor?: 'light' | 'dark';
	overlay?: boolean;
}

export const heroSlides: HeroSlide[] = [
	{
		id: '1',
		title: 'Welcome to Velvet supply',
		subtitle: 'Premium Products for Your Home & Business',
		description: 'Discover premium products for your home and business. From solar panels to chandeliers, we have everything you need.',
		backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop&crop=center&q=80',
		ctaText: 'Shop Now',
		ctaLink: '#categories',
		textColor: 'light',
		overlay: true
	},
	{
		id: '2',
		title: 'Solar Power Solutions',
		subtitle: 'Harness the Power of the Sun',
		description: 'Transform your energy bills with our premium solar panels. Professional installation and excellent quality guaranteed.',
		backgroundImage: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1920&h=1080&fit=crop&crop=center&q=80',
		ctaText: 'View Solar Panels',
		ctaLink: '/?category=solar-panels',
		textColor: 'light',
		overlay: true
	},
	{
		id: '3',
		title: 'Luxury Chandeliers',
		subtitle: 'Illuminate Your Space in Style',
		description: 'Beautiful chandelier collection perfect for luxury projects. Add elegance and sophistication to any room.',
		backgroundImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop&crop=center&q=80',
		ctaText: 'Browse Chandeliers',
		ctaLink: '/?category=chandeliers',
		textColor: 'light',
		overlay: true
	},
	{
		id: '4',
		title: 'Professional Tools & Equipment',
		subtitle: 'Quality Tools for Every Project',
		description: 'Professional grade tools and equipment for construction, electrical work, and home improvement projects.',
		backgroundImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&h=1080&fit=crop&crop=center&q=80',
		ctaText: 'Shop Tools',
		ctaLink: '/?category=tools',
		textColor: 'light',
		overlay: true
	},
	{
		id: '5',
		title: 'Building Materials',
		subtitle: 'Build with Confidence',
		description: 'Reliable building materials at competitive prices. Everything you need for your construction projects.',
		backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&crop=center&q=80',
		ctaText: 'View Materials',
		ctaLink: '/?category=building-materials',
		textColor: 'light',
		overlay: true
	}
];
