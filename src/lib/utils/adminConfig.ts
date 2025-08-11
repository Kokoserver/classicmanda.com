import { browser } from '$app/environment';

export interface AdminConfig {
  company: {
    name: string;
    tagline: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      full: string;
    };
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  business: {
    hours: Record<string, string>;
    established: string;
    taxId: string;
    license: string;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingCost: number;
    expeditedShippingCost: number;
    internationalShippingCost: number;
  };
  policies: {
    returnPeriod: number;
    warrantyPeriod: number;
    privacyPolicyLastUpdated: string;
    termsOfServiceLastUpdated: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  features: {
    enableLiveChat: boolean;
    enableNewsletterSignup: boolean;
    enableProductReviews: boolean;
    enableWishlist: boolean;
    enableCompareProducts: boolean;
  };
  maintenance: {
    isMaintenanceMode: boolean;
    maintenanceMessage: string;
    estimatedDowntime: string;
  };
  lastUpdated: string;
  version: string;
}

// Default fallback config
const defaultConfig: AdminConfig = {
  company: {
    name: "Classic Manda",
    tagline: "Timeless Elegance, Modern Style",
    description: "Your premier destination for classic and contemporary fashion"
  },
  contact: {
    email: "info@classicmanda.com",
    phone: "+1 (205) 852-7810",
    address: {
      street: "624 Skyland Blvd E",
      city: "Tuscaloosa",
      state: "Alabama",
      zipCode: "35405",
      country: "United States",
      full: "624 Skyland Blvd E, Tuscaloosa, Alabama 35405, United States"
    }
  },
  social: {
    facebook: "https://facebook.com/classicmanda",
    instagram: "https://instagram.com/classicmanda",
    twitter: "https://twitter.com/classicmanda",
    linkedin: "https://linkedin.com/company/classicmanda"
  },
  business: {
    hours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "10:00 AM - 9:00 PM",
      sunday: "12:00 PM - 6:00 PM"
    },
    established: "2020",
    taxId: "XX-XXXXXXX",
    license: "AL-RETAIL-2020-001"
  },
  shipping: {
    freeShippingThreshold: 75,
    standardShippingCost: 8.99,
    expeditedShippingCost: 15.99,
    internationalShippingCost: 25.99
  },
  policies: {
    returnPeriod: 30,
    warrantyPeriod: 365,
    privacyPolicyLastUpdated: "2024-01-15",
    termsOfServiceLastUpdated: "2024-01-15"
  },
  seo: {
    metaTitle: "Classic Manda - Timeless Fashion & Style",
    metaDescription: "Discover timeless elegance and modern style at Classic Manda. Shop our curated collection of premium fashion, accessories, and lifestyle products.",
    keywords: "fashion, style, clothing, accessories, premium, classic, modern, elegant"
  },
  features: {
    enableLiveChat: true,
    enableNewsletterSignup: true,
    enableProductReviews: true,
    enableWishlist: true,
    enableCompareProducts: false
  },
  maintenance: {
    isMaintenanceMode: false,
    maintenanceMessage: "We're currently updating our systems to serve you better. Please check back soon!",
    estimatedDowntime: "2 hours"
  },
  lastUpdated: new Date().toISOString(),
  version: "1.0.0"
};

let cachedConfig: AdminConfig | null = null;

/**
 * Load admin configuration from JSON file
 */
export async function loadAdminConfig(): Promise<AdminConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch('/admin-config.json');
    if (!response.ok) {
      console.warn('Could not load admin config, using defaults');
      cachedConfig = defaultConfig;
      return defaultConfig;
    }
    
    const config = await response.json();
    cachedConfig = { ...defaultConfig, ...config };
    return cachedConfig!;
  } catch (error) {
    console.error('Error loading admin config:', error);
    cachedConfig = defaultConfig;
    return defaultConfig;
  }
}

/**
 * Save admin configuration to JSON file (server-side only)
 */
export async function saveAdminConfig(config: AdminConfig): Promise<boolean> {
  if (browser) {
    // In browser, send to API endpoint
    try {
      const response = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...config,
          lastUpdated: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        cachedConfig = { ...config };
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving admin config:', error);
      return false;
    }
  }
  
  return false;
}

/**
 * Clear cached config to force reload
 */
export function clearConfigCache(): void {
  cachedConfig = null;
}

/**
 * Get specific config section
 */
export async function getConfigSection<K extends keyof AdminConfig>(
  section: K
): Promise<AdminConfig[K]> {
  const config = await loadAdminConfig();
  return config[section];
}
