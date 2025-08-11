import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { AdminConfig } from '$lib/utils/adminConfig';
import { dev } from '$app/environment';
import defaultConfigData from '$lib/assets/default-admin-config.json';

// In-memory storage for production environments
let runtimeConfig: AdminConfig | null = null;

const CONFIG_FILE_PATH = './src/lib/assets/admin-config.json';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const config: AdminConfig = await request.json();
    
    // Validate required fields
    if (!config.contact?.email || !config.contact?.phone) {
      return json(
        { error: 'Missing required contact information' },
        { status: 400 }
      );
    }
    
    // Add timestamp
    config.lastUpdated = new Date().toISOString();
    
    // Always try to write to file first, fallback to memory storage
    try {
      const fs = await import('fs/promises');
      await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');
      console.log('Admin config successfully written to file');
    } catch (fileError) {
      console.warn('Could not write to file, using memory storage:', fileError);
      // Fallback to memory storage
      runtimeConfig = config;
    }
    
    return json({ 
      success: true, 
      message: 'Configuration updated successfully',
      lastUpdated: config.lastUpdated,
      config: config
    });
    
  } catch (error) {
    console.error('Error processing admin config:', error);
    return json(
      { error: 'Failed to process configuration' },
      { status: 500 }
    );
  }
};

export const GET: RequestHandler = async () => {
  try {
    // Check if we have runtime config (from previous POST or production)
    if (runtimeConfig) {
      return json(runtimeConfig);
    }
    
    if (dev) {
      // In development, try to read from file first
      try {
        const fs = await import('fs/promises');
        const configData = await fs.readFile(CONFIG_FILE_PATH, 'utf-8');
        const config = JSON.parse(configData);
        return json(config);
      } catch (readError) {
        // File doesn't exist, use default
        return json(defaultConfigData);
      }
    } else {
      // In production, use default config if no runtime config exists
      return json(defaultConfigData);
    }
  } catch (error) {
    console.error('Error loading admin config:', error);
    return json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    );
  }
};
