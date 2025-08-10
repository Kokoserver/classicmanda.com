import type { Product } from '../types/product.js';
import { ProductCategory } from '../types/product.js';

export const mockProducts: Product[] = [
	// Solar Panels
	{
		id: '1',
		name: 'SolarMax Pro 400W Panel',
		description:
			'Experience the future of renewable energy with our premium SolarMax Pro 400W monocrystalline solar panel. Featuring industry-leading 22% efficiency and advanced PERC cell technology, this panel delivers exceptional performance even in low-light conditions. Built with anti-reflective tempered glass and corrosion-resistant aluminum frame, it withstands harsh weather while maintaining optimal energy output. Perfect for residential rooftops, commercial installations, and off-grid systems. Includes comprehensive 25-year performance warranty and professional installation support.',
		price: 899,
		category: ProductCategory.SOLAR_PANELS,
		images: [
			'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop'
		],
		specifications: {
			'Power Output': '400W',
			Efficiency: '22%',
			Dimensions: '2008 x 1002 x 35mm',
			Weight: '22kg',
			Warranty: '25 years'
		},
		inStock: true,
		featured: true,
		popular: true,
		recent: false,
		createdAt: '2024-01-15T10:00:00Z',
		updatedAt: '2024-01-15T10:00:00Z'
	},
	{
		id: '2',
		name: 'EcoSolar Flexible 200W',
		description: 'Revolutionary ultra-thin flexible solar technology that adapts to any surface. At just 3mm thick and weighing only 3.5kg, this bendable panel can conform to curved roofs, RV tops, boat decks, and irregular surfaces where traditional rigid panels cannot. Features advanced ETFE coating for superior UV resistance and saltwater protection. Ideal for mobile applications, marine environments, and architectural integration. Easy peel-and-stick installation with no drilling required. Maintains 18% efficiency while offering unmatched versatility.',
		price: 749,
		category: ProductCategory.SOLAR_PANELS,
		images: ['https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop'],
		specifications: {
			'Power Output': '200W',
			Efficiency: '18%',
			Dimensions: '1480 x 670 x 3mm',
			Weight: '3.5kg',
			Warranty: '10 years'
		},
		inStock: true,
		featured: false,
		popular: false,
		recent: true,
		createdAt: '2024-02-01T10:00:00Z',
		updatedAt: '2024-02-01T10:00:00Z'
	},

	// Dishwashers
	{
		id: '3',
		name: 'AquaClean Pro Dishwasher',
		description:
			'Transform your kitchen experience with the AquaClean Pro, featuring revolutionary TurboWash technology and whisper-quiet 42dB operation. Eight specialized wash programs including intensive, eco, quick wash, and delicate cycles ensure perfect results for every load. Advanced soil sensors automatically adjust water temperature and cycle time for optimal cleaning. Triple-layer sound insulation makes it virtually silent during operation. Energy Star A+++ rating saves up to 40% on utility bills. Spacious 14 place setting capacity with adjustable racks and fold-down tines accommodate everything from delicate glassware to large pots.',
		price: 1299,
		category: ProductCategory.DISHWASHERS,
		images: [
			'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop'
		],
		specifications: {
			Capacity: '14 place settings',
			'Energy Rating': 'A+++',
			'Noise Level': '42 dB',
			Programs: '8 wash programs',
			Warranty: '5 years'
		},
		inStock: true,
		featured: true,
		popular: true,
		recent: false,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-01-10T10:00:00Z'
	},
	{
		id: '4',
		name: 'Compact Smart Dishwasher',
		description: 'Perfect for apartments, condos, and smaller kitchens without compromising on performance. This intelligent dishwasher connects to your home WiFi network, allowing remote monitoring and control via smartphone app. Receive notifications when cycles complete, schedule delayed starts, and download new wash programs. Despite its compact size, it accommodates 8 place settings with clever interior design. Smart sensors detect soil levels and adjust wash intensity automatically. Voice control compatible with Alexa and Google Assistant. Energy-efficient A++ rating with eco-friendly wash options.',
		price: 899,
		category: ProductCategory.DISHWASHERS,
		images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'],
		specifications: {
			Capacity: '8 place settings',
			'Energy Rating': 'A++',
			'Noise Level': '45 dB',
			'Smart Features': 'WiFi, App Control',
			Warranty: '3 years'
		},
		inStock: true,
		featured: false,
		popular: true,
		recent: true,
		createdAt: '2024-02-05T10:00:00Z',
		updatedAt: '2024-02-05T10:00:00Z'
	},

	// Chandeliers
	{
		id: '5',
		name: 'Crystal Palace Chandelier',
		description: 'Make a stunning statement with this breathtaking crystal chandelier featuring over 200 hand-cut K9 crystals that create mesmerizing light patterns. Twelve energy-efficient LED bulbs provide warm, brilliant illumination while the integrated dimmer system offers perfect ambiance control from romantic dinner lighting to bright task illumination. Premium chrome finish resists tarnishing and complements any décor style. Easy-clean crystal drops detach for maintenance. Professional installation included with adjustable chain length up to 3 meters. Perfect centerpiece for dining rooms, foyers, and grand living spaces.',
		price: 2499,
		category: ProductCategory.CHANDELIERS,
		images: [
			'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
		],
		specifications: {
			Diameter: '80cm',
			Height: '100cm',
			Bulbs: '12 x LED E14',
			Material: 'Crystal, Chrome',
			Warranty: '2 years'
		},
		inStock: true,
		featured: true,
		popular: false,
		recent: false,
		createdAt: '2024-01-05T10:00:00Z',
		updatedAt: '2024-01-05T10:00:00Z'
	},
	{
		id: '6',
		name: 'Modern Brass Pendant',
		description: 'Elevate your space with this sophisticated brass pendant featuring clean geometric lines and warm metallic finish. Handcrafted from premium solid brass with protective lacquer coating that develops beautiful patina over time. Three high-efficiency LED G9 bulbs provide focused task lighting perfect for kitchen islands, dining tables, or workspace areas. Frosted glass diffuser eliminates harsh shadows while creating even light distribution. Adjustable cord length from 30cm to 150cm accommodates various ceiling heights. Complements both modern and traditional interiors with timeless appeal.',
		price: 799,
		category: ProductCategory.CHANDELIERS,
		images: ['https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=600&fit=crop'],
		specifications: {
			Diameter: '40cm',
			Height: '30cm',
			Bulbs: '3 x LED G9',
			Material: 'Brass, Glass',
			Warranty: '2 years'
		},
		inStock: true,
		featured: false,
		popular: true,
		recent: true,
		createdAt: '2024-02-10T10:00:00Z',
		updatedAt: '2024-02-10T10:00:00Z'
	},

	// Building Materials
	{
		id: '7',
		name: 'Premium Hardwood Flooring',
		description: 'Transform your home with authentic solid oak hardwood flooring that brings warmth and elegance to any space. Each plank is carefully selected from sustainably harvested European oak, featuring rich grain patterns and natural color variations that make every installation unique. Pre-finished with 7 layers of aluminum oxide coating for exceptional durability and scratch resistance. Tongue-and-groove design with micro-beveled edges ensures seamless installation and professional appearance. Suitable for high-traffic areas with proper maintenance. Covers 20 square meters with 25-year structural warranty.',
		price: 1899,
		category: ProductCategory.BUILDING_MATERIALS,
		images: [
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop'
		],
		specifications: {
			Coverage: '20 sq meters',
			Thickness: '18mm',
			Width: '150mm',
			Length: '1200mm',
			Warranty: '25 years'
		},
		inStock: true,
		featured: true,
		popular: true,
		recent: false,
		createdAt: '2024-01-20T10:00:00Z',
		updatedAt: '2024-01-20T10:00:00Z'
	},
	{
		id: '8',
		name: 'Ceramic Wall Tiles',
		description: 'Create stunning feature walls with these premium ceramic tiles featuring subtle texture and sophisticated matte finish. Manufactured using advanced kiln-firing techniques for superior strength and water resistance. Perfect for bathroom showers, kitchen backsplashes, and accent walls. Non-slip surface provides safety in wet areas while remaining easy to clean and maintain. Frost-resistant formula suitable for both interior and covered exterior applications. Consistent sizing and color matching ensure professional results. Each box covers 15 square meters with minimal waste.',
		price: 1299,
		category: ProductCategory.BUILDING_MATERIALS,
		images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop'],
		specifications: {
			Coverage: '15 sq meters',
			Size: '30x60cm',
			Thickness: '10mm',
			Finish: 'Matte',
			Warranty: '10 years'
		},
		inStock: true,
		featured: false,
		popular: false,
		recent: true,
		createdAt: '2024-02-15T10:00:00Z',
		updatedAt: '2024-02-15T10:00:00Z'
	},

	// Tools
	{
		id: '9',
		name: 'Professional Drill Set',
		description: 'Complete drilling and driving solution for professionals and serious DIY enthusiasts. This powerful 20V cordless drill delivers 65Nm of torque with variable speed control for precise operation in any material. Includes two 4.0Ah lithium-ion batteries with rapid 60-minute charging for uninterrupted work. Comprehensive 50-piece accessory kit features drill bits for wood, metal, masonry, plus screwdriver bits, hole saws, and magnetic bit holder. LED work light illuminates dark spaces. Ergonomic grip reduces fatigue during extended use. Backed by 3-year professional warranty.',
		price: 799,
		category: ProductCategory.TOOLS,
		images: [
			'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop',
			'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop'
		],
		specifications: {
			Voltage: '20V',
			Battery: '2 x 4.0Ah Li-ion',
			'Chuck Size': '13mm',
			Torque: '65Nm',
			Warranty: '3 years'
		},
		inStock: true,
		featured: false,
		popular: true,
		recent: false,
		createdAt: '2024-01-25T10:00:00Z',
		updatedAt: '2024-01-25T10:00:00Z'
	},
	{
		id: '10',
		name: 'Circular Saw Pro',
		description: 'Professional-grade circular saw engineered for precision cutting in demanding applications. Powerful 1400W motor maintains consistent speed under load for clean cuts through hardwood, plywood, and construction lumber. Integrated laser guide system ensures perfectly straight cuts every time. Advanced dust collection port connects to shop vacuum for cleaner work environment. Bevel capacity 0-45 degrees with positive stops at common angles. Carbide-tipped blade included cuts up to 65mm depth at 90 degrees. Magnesium base plate provides durability while reducing weight. Safety features include blade guard and electric brake.',
		price: 1099,
		category: ProductCategory.TOOLS,
		images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop'],
		specifications: {
			'Blade Size': '190mm',
			'Motor Power': '1400W',
			'Cutting Depth': '65mm',
			Features: 'Laser guide, Dust port',
			Warranty: '2 years'
		},
		inStock: true,
		featured: false,
		popular: false,
		recent: true,
		createdAt: '2024-02-20T10:00:00Z',
		updatedAt: '2024-02-20T10:00:00Z'
	},

	// Additional Solar Panels
	{
		id: '11',
		name: 'SolarTech 300W Polycrystalline',
		description: 'Affordable solar solution without compromising on quality or performance. This polycrystalline panel offers excellent value with 16% efficiency and proven reliability in diverse weather conditions. Multi-crystalline silicon cells provide consistent power output with minimal degradation over time. Robust construction features anodized aluminum frame and tempered glass surface designed to withstand hail, wind, and thermal cycling. Ideal for budget-conscious residential installations and large-scale commercial projects. Easy mounting system compatible with standard racking. 20-year performance warranty ensures long-term energy savings.',
		price: 699,
		category: ProductCategory.SOLAR_PANELS,
		images: ['https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop'],
		specifications: {
			'Power Output': '300W',
			Efficiency: '16%',
			Dimensions: '1956 x 992 x 40mm',
			Weight: '25kg',
			Warranty: '20 years'
		},
		inStock: true,
		featured: false,
		popular: true,
		recent: false,
		createdAt: '2024-01-08T10:00:00Z',
		updatedAt: '2024-01-08T10:00:00Z'
	},
	{
		id: '12',
		name: 'PowerMax 500W Bifacial',
		description: 'Revolutionary bifacial technology captures sunlight from both front and rear surfaces, increasing energy yield by up to 30% compared to traditional panels. Advanced N-type monocrystalline cells achieve exceptional 21% front-side efficiency with additional rear-side generation. Transparent backsheet allows light reflection from ground surfaces, rooftops, and surrounding structures. Ideal for elevated installations, carports, and agrivoltaic applications. Enhanced durability with double-glass construction resists potential-induced degradation. Premium 25-year warranty covers both performance and product defects. Future-proof investment in cutting-edge solar technology.',
		price: 1199,
		category: ProductCategory.SOLAR_PANELS,
		images: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop'],
		specifications: {
			'Power Output': '500W',
			Efficiency: '21%',
			Dimensions: '2108 x 1048 x 35mm',
			Weight: '28kg',
			Warranty: '25 years'
		},
		inStock: true,
		featured: true,
		popular: false,
		recent: true,
		createdAt: '2024-02-25T10:00:00Z',
		updatedAt: '2024-02-25T10:00:00Z'
	},

	// Additional Dishwashers
	{
		id: '13',
		name: 'UltraWash Deluxe',
		description: 'Experience the ultimate in dishwashing luxury with advanced steam cleaning technology that eliminates 99.9% of bacteria without harsh chemicals. Twelve specialized wash programs including sanitize, crystal, pots & pans, and express cycles handle any cleaning challenge. Revolutionary steam injection system loosens stubborn food residue while protecting delicate items. Ultra-quiet 39dB operation won\'t disturb your home environment. Premium stainless steel interior resists stains and odors. Third rack provides extra space for utensils and small items. Energy Star certified with soil sensors that optimize water and energy usage automatically.',
		price: 1899,
		category: ProductCategory.DISHWASHERS,
		images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'],
		specifications: {
			Capacity: '16 place settings',
			'Energy Rating': 'A+++',
			'Noise Level': '39 dB',
			Programs: '12 wash programs',
			Warranty: '5 years'
		},
		inStock: true,
		featured: true,
		popular: true,
		recent: false,
		createdAt: '2024-01-12T10:00:00Z',
		updatedAt: '2024-01-12T10:00:00Z'
	},
	{
		id: '14',
		name: 'EcoWash Energy Saver',
		description: 'Leading the way in sustainable kitchen technology with industry-lowest water consumption of just 6.5L per cycle. Advanced filtration system recycles and purifies wash water multiple times for maximum efficiency. Eco-mode extends cycle time to use cooler water temperatures, reducing energy consumption by 50%. Half-load sensor automatically adjusts water and detergent usage when washing smaller loads. Biodegradable detergent dispenser works with eco-friendly cleaning products. A+++ energy rating qualifies for utility rebates in most areas. Compact design perfect for environmentally conscious households without sacrificing cleaning performance.',
		price: 1099,
		category: ProductCategory.DISHWASHERS,
		images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop'],
		specifications: {
			Capacity: '12 place settings',
			'Energy Rating': 'A+++',
			'Water Usage': '6.5L per cycle',
			Features: 'Eco mode, Half load',
			Warranty: '4 years'
		},
		inStock: true,
		featured: false,
		popular: true,
		recent: true,
		createdAt: '2024-02-08T10:00:00Z',
		updatedAt: '2024-02-08T10:00:00Z'
	},

	// Additional Chandeliers
	{
		id: '15',
		name: 'Vintage Edison Chandelier',
		description: 'Bring industrial chic elegance to your space with this stunning chandelier featuring authentic Edison-style filament bulbs that create warm, ambient lighting. Handcrafted black iron framework with distressed finish adds character and vintage appeal. Eight dimmable E27 bulbs provide customizable lighting from intimate dinner settings to bright task illumination. Exposed filaments create beautiful light patterns on walls and ceilings. Perfect for loft apartments, restaurants, bars, and modern farmhouse interiors. Adjustable chain length accommodates various ceiling heights. Includes premium LED Edison bulbs with 25,000-hour lifespan for energy efficiency.',
		price: 1299,
		category: ProductCategory.CHANDELIERS,
		images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop'],
		specifications: {
			Diameter: '60cm',
			Height: '80cm',
			Bulbs: '8 x Edison E27',
			Material: 'Black Iron, Glass',
			Warranty: '2 years'
		},
		inStock: true,
		featured: false,
		popular: true,
		recent: false,
		createdAt: '2024-01-18T10:00:00Z',
		updatedAt: '2024-01-18T10:00:00Z'
	},
	{
		id: '16',
		name: 'LED Ring Chandelier',
		description: 'Stunning contemporary design featuring seamless LED ring technology that provides uniform, shadow-free illumination. Ultra-thin 15cm profile with 90cm diameter creates dramatic visual impact without overwhelming the space. Integrated dimming system offers infinite brightness control from 1% to 100% with smooth transitions. Color temperature adjustment from warm 2700K to cool 6500K adapts to any mood or activity. Smart home compatible with WiFi connectivity for app control and voice commands. Energy-efficient design consumes 80% less power than traditional chandeliers. Premium aluminum construction with acrylic diffuser ensures even light distribution and long-lasting performance.',
		price: 1799,
		category: ProductCategory.CHANDELIERS,
		images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'],
		specifications: {
			Diameter: '90cm',
			Height: '15cm',
			Bulbs: 'Integrated LED',
			Material: 'Aluminum, Acrylic',
			Warranty: '3 years'
		},
		inStock: true,
		featured: true,
		popular: false,
		recent: true,
		createdAt: '2024-02-12T10:00:00Z',
		updatedAt: '2024-02-12T10:00:00Z'
	},

	// Additional Building Materials
	{
		id: '17',
		name: 'Luxury Vinyl Plank Flooring',
		description: 'Achieve the beauty of hardwood with superior durability and waterproof protection. Advanced digital printing technology creates incredibly realistic wood grain textures that are virtually indistinguishable from natural timber. 100% waterproof core makes it perfect for kitchens, bathrooms, basements, and high-moisture areas where traditional hardwood cannot be used. Click-lock installation system allows for floating floor installation over most existing surfaces. Enhanced wear layer resists scratches, dents, and stains from pets and heavy foot traffic. Comfortable underfoot with built-in sound dampening. Covers 25 square meters with 15-year residential warranty.',
		price: 1399,
		category: ProductCategory.BUILDING_MATERIALS,
		images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'],
		specifications: {
			Coverage: '25 sq meters',
			Thickness: '6mm',
			Width: '180mm',
			Length: '1220mm',
			Warranty: '15 years'
		},
		inStock: true,
		featured: false,
		popular: true,
		recent: false,
		createdAt: '2024-01-22T10:00:00Z',
		updatedAt: '2024-01-22T10:00:00Z'
	},
	{
		id: '18',
		name: 'Natural Stone Tiles',
		description: 'Timeless elegance meets natural beauty in these premium stone tiles quarried from select locations worldwide. Each tile showcases unique veining, color variations, and natural characteristics that create one-of-a-kind installations. Honed finish provides subtle texture and slip resistance while highlighting the stone\'s natural beauty. Suitable for both interior floors and exterior patios with proper sealing. Thermal mass properties help regulate indoor temperatures naturally. Professional sealing included to protect against stains and moisture. Hand-selected for consistent thickness and quality. Perfect for luxury bathrooms, entryways, and outdoor living spaces seeking authentic natural materials.',
		price: 2199,
		category: ProductCategory.BUILDING_MATERIALS,
		images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop'],
		specifications: {
			Coverage: '12 sq meters',
			Size: '40x40cm',
			Thickness: '15mm',
			Finish: 'Natural',
			Warranty: '20 years'
		},
		inStock: true,
		featured: true,
		popular: false,
		recent: true,
		createdAt: '2024-02-18T10:00:00Z',
		updatedAt: '2024-02-18T10:00:00Z'
	},

	// Additional Tools
	{
		id: '19',
		name: 'Multi-Tool Kit Pro',
		description: 'Professional-grade tool collection featuring 120 precision-engineered tools in a heavy-duty organized case. Includes complete sets of metric and imperial wrenches, screwdrivers, pliers, sockets, and specialty tools for automotive, electrical, and general maintenance work. Chrome vanadium steel construction provides exceptional strength and corrosion resistance. Organized foam inserts keep every tool in its designated place for easy identification and inventory. Perfect for professional mechanics, contractors, and serious DIY enthusiasts. Lifetime replacement warranty on hand tools. Portable design with secure latches and comfortable carrying handle for job site mobility.',
		price: 1499,
		category: ProductCategory.TOOLS,
		images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop'],
		specifications: {
			Pieces: '120 tools',
			Case: 'Heavy-duty toolbox',
			Includes: 'Wrenches, Screwdrivers, Pliers',
			Material: 'Chrome Vanadium Steel',
			Warranty: '5 years'
		},
		inStock: true,
		featured: true,
		popular: true,
		recent: false,
		createdAt: '2024-01-28T10:00:00Z',
		updatedAt: '2024-01-28T10:00:00Z'
	},
	{
		id: '20',
		name: 'Cordless Impact Driver',
		description: 'Unleash incredible fastening power with this professional 18V impact driver delivering 180Nm of torque for the toughest applications. Brushless motor technology provides 50% longer runtime and extended tool life compared to brushed motors. Variable speed trigger with precision control handles delicate tasks and heavy-duty fastening with equal ease. Two 5.0Ah lithium-ion batteries ensure all-day productivity with rapid 45-minute charging. LED work light with 20-second delay illuminates work area. Compact design reduces user fatigue while maintaining professional performance. Ideal for deck building, framing, and mechanical assembly work.',
		price: 899,
		category: ProductCategory.TOOLS,
		images: ['https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop'],
		specifications: {
			Voltage: '18V',
			Torque: '180Nm',
			Battery: '2 x 5.0Ah Li-ion',
			Speed: '0-3,600 RPM',
			Warranty: '3 years'
		},
		inStock: true,
		featured: false,
		popular: true,
		recent: true,
		createdAt: '2024-02-22T10:00:00Z',
		updatedAt: '2024-02-22T10:00:00Z'
	}
];
