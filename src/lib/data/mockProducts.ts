import type { Product } from '../types/product.js';
import { ProductCategory } from '../types/product.js';

export const mockProducts: Product[] = [
	// Solar Panels
	{
		id: '1',
		name: 'SolarMax Pro 400W Panel',
		description:
			'High-quality 400W monocrystalline solar panel with 20.12% efficiency that promises high energy output. Features anti-reflective glass and stable aluminum frame construction that withstands extreme climate conditions including storm, hail, snow and salt water. Easy installation with MC4 outputs and pre-drilled mounting holes. Can generate an average of 2000 Wh daily during good weather conditions. Perfect for garden houses, motorhomes, sailboats and other vehicles. Includes 25-year power guarantee and 10-year product guarantee.',
		price: 899,
		category: ProductCategory.SOLAR_PANELS,
		images: [
			'/images/products/solar-panels/solarmax-pro-400w.jpg'
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
		images: ['/images/products/solar-panels/ecosolar-flexible-200w.jpg'],
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
		name: 'American Dish Service ET-AF-M-PH Commercial Dishwasher',
		description:
			'American Dish Service ET-AF-M-PH 25-1/2 inch undercounter dishmachine with stainless steel pump drain and sustained heat low temperature chemical sanitizing. Engineered for consistent cleaning with a stainless steel frame, this commercial-grade unit supports fast throughput at 37 racks per hour and integrates seamlessly with existing workflow. Features reliable operation, user-friendly design, and ergonomic racking for optimized operation. Suitable for restaurant, cafeteria, and catering environments, offering long-term performance and enhanced sanitation efficiency. Low-maintenance design distinguishes it as a restaurant-ready solution.',
		price: 6557.99,
		category: ProductCategory.DISHWASHERS,
		images: [
			'/images/products/dishwashers/compact-smart-dishwasher.webp'
		],
		specifications: {
			Capacity: '37 racks/hour',
			Width: '25-1/2 inches',
			Type: 'Low temperature chemical sanitizing',
			Drain: 'Stainless steel pump drain',
			Frame: 'Stainless steel',
			Application: 'Commercial foodservice'
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
		name: 'Hobart LXNH-2 Commercial Dishwasher',
		description: 'Hobart LXNH-2 23-inch stainless steel high-temperature sanitizing undercounter dishwasher with 17-inch door opening height. Designed for busy foodservice environments, this commercial-grade unit provides rapid, high-temperature sanitizing cycles while maximizing space. Features 32 racks per hour capacity (48 racks/hour with optional second level rack), fresh water rinse at 0.62 gal/rack, delime notification with cycle, and auto chemical priming. Durable stainless steel construction ensures reliable performance in restaurants, cafes, and healthcare kitchens. Accommodates optional two-level racking accessory for increased throughput.',
		price: 9046.80,
		category: ProductCategory.DISHWASHERS,
		images: ['/images/products/dishwashers/ultrawash-deluxe.webp'],
		specifications: {
			Capacity: '32 racks/hour',
			'Door Opening': '17 inches',
			Width: '23 inches',
			'Water Usage': '0.62 gal/rack',
			Type: 'High-temperature sanitizing',
			Material: 'Stainless Steel'
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
		name: 'John-Richard Waving 12 Light Stone Chandelier',
		description: 'John-Richard AJC-9083 Waving Twelve-Light Stone Chandelier from the exclusive Waving collection. This 12-light chandelier will enhance your home with a perfect mix of form and function, featuring a sophisticated stone finish applied by experts. The unique waving design creates an elegant centerpiece with beautiful quartz elements that catch and reflect light beautifully. Professional craftsmanship ensures lasting quality and timeless appeal. Dimensions: 10.25" x 53.5" with hardwired installation. Perfect for dining rooms, foyers, and grand living spaces seeking sophisticated lighting solutions.',
		price: 4542.50,
		category: ProductCategory.CHANDELIERS,
		images: [
			'/images/products/chandeliers/waving-stone-chandelier.jpg',
		],
		specifications: {
			Dimensions: '10.25" x 53.5"',
			Lights: '12 lights',
			Material: 'Stone, Quartz',
			Finish: 'Stone',
			Collection: 'Waving by John-Richard'
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
		name: 'Troy Lighting Sacramento 5 Light Chandelier',
		description: 'Troy Lighting F8163-PBR/SSD Sacramento makes a bold statement while keeping a low profile. Simple metal shades are mounted at the end of long, sweeping arms creating a design that is visually appealing without taking up a lot of space. With shades that are open at both ends, the wider opening at the top allows light to spread freely above while the narrower bottom opening funnels more direct light downward. Patina brass combines with soft sand finish to give the fixture a natural beauty. This 5-light chandelier enhances your home with a perfect mix of form and function.',
		price: 1025,
		category: ProductCategory.CHANDELIERS,
		images: ['/images/products/chandeliers/modern-brass-pendant.jpg', '/images/products/chandeliers/modern-brass-pendant2.jpg', '/images/products/chandeliers/modern-brass-pendant3.jpg' ],
		specifications: {
			Dimensions: '64" wide',
			'Min Height': '15.75"',
			Lights: '5 lights',
			Finish: 'Patina Brass/Soft Sand',
			Collection: 'Sacramento by Troy Lighting'
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
			'/images/products/building-materials/natural-stone-tiles.jpg'
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
		images: ['/images/products/building-materials/ceramic-wall-tiles.jpg'],
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
		name: 'Cordless Drill Kit',
		description: 'Complete jobs in tight spots with this lightweight 20V MAX compact drill/driver featuring high-performance motor and 2-speed transmission. Delivers up to 300 UWO for a wide range of applications. Features 1/2" single sleeve ratcheting chuck for tight bit gripping strength and ergonomic handle for comfort and control. Kit includes two 20V MAX compact Li-ion battery packs, compact charger, and durable contractor bag for portability. 3-year limited warranty with 1-year free service and 90-day satisfaction guarantee.',
		price: 799,
		category: ProductCategory.TOOLS,
		images: [
			'/images/products/tools/cordless-drill-kit.jpg'
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
		images: ['/images/products/tools/circular-saw-pro.jpg'],
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
		images: ['/images/products/solar-panels/solartech-300w.jpg'],
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
		images: ['/images/products/solar-panels/powermax-500w-bifacial.jpg'],
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
		name: 'Hobart EUH-1 Ecoline Dishwasher',
		description: 'Hobart EUH-1 22-inch undercounter dishwasher with high-temperature sanitizing designed for moderate-volume foodservice operations. Features stainless steel construction, efficient high-temperature sanitizing cycle, and integrated fluid systems that elevate operational efficiency. Processes 24 racks per hour with fresh water rinse at 0.92 gal/rack. Includes service diagnostics with error notifications, soft start technology, detergent and rinse aid pumps. Ships with one peg rack and one combo rack. cULus and NSF certified for commercial use. Designed for durability and ease of maintenance, ensuring reliable sanitation and workflow productivity.',
		price: 5345.00,
		category: ProductCategory.DISHWASHERS,
		images: ['/images/products/dishwashers/hobart-euh-1.webp'],
		specifications: {
			Capacity: '24 racks/hour',
			Width: '22 inches',
			Type: 'High-temperature sanitizing',
			'Water Usage': '0.92 gal/rack',
			Voltage: '208-240v/60/1-ph',
			Certifications: 'cULus, NSF'
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
		name: 'Hobart LXGNPR-2 Advansys Dishwasher with Puri Rinse',
		description: 'Hobart LXGNPR-2 24-inch Advansys undercounter dishwasher/glasswasher with Puri Rinse technology designed for moderate throughput and space-efficient operation. Features robust durability with high-performance capabilities for dependable dish and glassware cleaning in busy restaurants and catering kitchens. Advanced cycle management with low-temperature chemical sanitization at 38 or 29 racks per hour. Includes smart touchscreen controls with SmartConnect app, service diagnostics, heated recirculation, delime notification with cycle, and chemical pumps with auto prime. Fully enclosed stainless steel cabinet with energy-efficient design optimizes space utilization and throughput.',
		price: 7996.10,
		category: ProductCategory.DISHWASHERS,
		images: ['/images/products/dishwashers/ultrawash-deluxe.webp'],
		specifications: {
			Capacity: '38 or 29 racks/hour',
			Width: '24 inches',
			Type: 'Chemical sanitization with Puri Rinse',
			'Water Usage': '0.62 gal/rack',
			Voltage: '120/60/1',
			Features: 'SmartConnect app, Smart touchscreen'
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
		name: 'Leah Antique Gold Chandelier',
		description: 'John-Richard Leah Sixteen-Light Halogen Chandelier from the exclusive Leah collection. This magnificent 50-inch chandelier features a stunning antique gold finish applied by experts, creating an elegant centerpiece that enhances any home with a perfect mix of form and function. The sophisticated design showcases 16 halogen lights providing brilliant illumination. Professional craftsmanship ensures lasting quality and timeless appeal. Hardwired installation for permanent lighting solution. Perfect for grand dining rooms, foyers, and luxury living spaces seeking sophisticated lighting solutions.',
		price: 6095,
		category: ProductCategory.CHANDELIERS,
		images: ['/images/products/chandeliers/leah-antique-gold-chandelier.jpg', 
			'/images/products/chandeliers/leah-antique-gold-chandelier2.jpg', 
			'/images/products/chandeliers/leah-antique-gold-chandelier3.jpg', 
			'/images/products/chandeliers/leah-antique-gold-chandelier4.jpg', ],
		specifications: {
			Dimensions: '38"H x 50"W',
			Lights: '16 halogen lights',
			Finish: 'Antique Gold',
			Installation: 'Hardwired',
			Collection: 'Leah by John-Richard'
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
		name: 'ELK Lighting Xenia 6 Light Chandelier',
		description: 'ELK 66971/6 Xenia showcases a unique linear design with unequal length arms that pass through the fixtures central connection. The metal arms can be easily adjusted from a near parallel position to a loosely gathered look, offering versatile styling options. This 6-light chandelier features a sophisticated matte gold finish applied by experts, enhancing your home with a perfect mix of form and function. Hardwired ceiling mounted fixture suitable for indoor use only and can be installed on sloped or vaulted ceilings. Fully dimmable when used with compatible dimmer switch. Professional installation recommended.',
		price: 438.00,
		category: ProductCategory.CHANDELIERS,
		images: ['/images/products/chandeliers/led-ring.jpg', '/images/products/chandeliers/led-ring2.jpg' ],
		specifications: {
			Dimensions: '31"W x 18"D x 16"H',
			Lights: '6 lights',
			Finish: 'Matte Gold',
			Material: 'Metal',
			Collection: 'Xenia by ELK Lighting',
			Warranty: '1 year limited'
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
		images: ['/images/products/building-materials/luxury-vinyl-plank-flooring.jpg'],
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
		description: 'Majestic natural stone travertine collection featuring the classic stone aesthetic found in ancient Roman monuments and temples. Each tile showcases unique natural characteristics with beautiful neutral color palette variations. Available in traditional tile sizes with harmonizing decorative tile, trim, and mosaics. Honed finish provides subtle texture while highlighting the stone\'s natural beauty and durability. Perfect for both interior and exterior applications including luxury bathrooms, entryways, and outdoor living spaces. Hand-selected travertine quarried from premium locations ensures consistent quality and authentic natural materials that leave a lasting impression.',
		price: 2199,
		category: ProductCategory.BUILDING_MATERIALS,
		images: ['/images/products/building-materials/natural-stone-tiles.jpg'],
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
		id: '20',
		name: 'Cordless Impact Driver',
		description: 'Unleash incredible fastening power with this professional 18V impact driver delivering 180Nm of torque for the toughest applications. Brushless motor technology provides 50% longer runtime and extended tool life compared to brushed motors. Variable speed trigger with precision control handles delicate tasks and heavy-duty fastening with equal ease. Two 5.0Ah lithium-ion batteries ensure all-day productivity with rapid 45-minute charging. LED work light with 20-second delay illuminates work area. Compact design reduces user fatigue while maintaining professional performance. Ideal for deck building, framing, and mechanical assembly work.',
		price: 899,
		category: ProductCategory.TOOLS,
		images: ['/images/products/tools/cordless-impact-driver.jpg'],
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
