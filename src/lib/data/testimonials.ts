export interface Testimonial {
	id: string;
	name: string;
	role: string;
	company?: string;
	content: string;
	rating: number;
	image?: string;
	location?: string;
	productCategory?: string;
}

export const testimonials: Testimonial[] = [
	{
		id: '1',
		name: 'Sarah Johnson',
		role: 'Homeowner',
		location: 'Lagos, Nigeria',
		content: 'The solar panels from Velvet supply have completely transformed our energy bills. Professional installation and excellent quality products. Highly recommended!',
		rating: 5,
		productCategory: 'Solar Panels',
		image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
	},
	{
		id: '2',
		name: 'David Okafor',
		role: 'Restaurant Owner',
		company: 'Golden Spoon Restaurant',
		location: 'Abuja, Nigeria',
		content: 'We purchased multiple dishwashers for our restaurant. The quality is outstanding and they handle our heavy daily usage perfectly. Great investment!',
		rating: 4,
		productCategory: 'Dishwashers',
		image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
	},
	{
		id: '3',
		name: 'Amina Hassan',
		role: 'Interior Designer',
		company: 'Elegant Spaces Design',
		location: 'Kano, Nigeria',
		content: 'Velvet supply has the most beautiful chandelier collection. My clients are always impressed with the quality and design. Perfect for luxury projects.',
		rating: 5,
		productCategory: 'Chandeliers',
		image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
	},
	{
		id: '4',
		name: 'Michael Adebayo',
		role: 'Construction Manager',
		company: 'BuildRight Construction',
		location: 'Port Harcourt, Nigeria',
		content: 'Reliable building materials and tools at competitive prices. Fast delivery and excellent customer service. Velvet supply is our go-to supplier.',
		rating: 4,
		productCategory: 'Building Materials',
		image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
	},
	{
		id: '5',
		name: 'Grace Okwu',
		role: 'Homeowner',
		location: 'Enugu, Nigeria',
		content: 'Amazing customer service and product quality. The team helped me choose the perfect products for my home renovation. Very satisfied with my purchase!',
		rating: 5,
		image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face'
	},
	{
		id: '6',
		name: 'Ibrahim Musa',
		role: 'Electrician',
		company: 'PowerTech Solutions',
		location: 'Kaduna, Nigeria',
		content: 'Professional grade tools and electrical equipment. Velvet supply provides everything I need for my electrical projects. Quality you can trust.',
		rating: 4,
		productCategory: 'Tools',
		image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face'
	}
];
