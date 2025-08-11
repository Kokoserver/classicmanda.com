import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { AdminConfig } from '$lib/utils/adminConfig';
import { dev } from '$app/environment';
import { getAdminConfig, setAdminConfig } from '$lib/server/adminConfig';

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
    
    // Store in memory (always works)
    setAdminConfig(config);
    
    // Try to write to file only in development
    if (dev) {
      try {
        const fs = await import('fs/promises');
        await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');
        console.log('Admin config written to file (dev mode)');
      } catch (fileError) {
        console.warn('Could not write to file in dev mode:', fileError);
      }
    } else {
      console.log('Admin config stored in memory (production mode)');
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
    // Get current config (runtime or default)
    const currentConfig = getAdminConfig();
    
    // In development, try to load from file if no runtime config exists
    if (dev) {
      try {
        const fs = await import('fs/promises');
        const configData = await fs.readFile(CONFIG_FILE_PATH, 'utf-8');
        const fileConfig = JSON.parse(configData);
        // Update runtime config with file data
        setAdminConfig(fileConfig);
        return json(fileConfig);
      } catch (readError) {
        // File doesn't exist or can't be read, use current config
        return json(currentConfig);
      }
    } else {
      // In production, return current config (runtime or default)
      return json(currentConfig);
    }
  } catch (error) {
    console.error('Error loading admin config:', error);
    return json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    );
  }
};
