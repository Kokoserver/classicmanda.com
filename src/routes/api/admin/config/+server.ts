import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { AdminConfig } from '$lib/utils/adminConfig';
import defaultConfigData from '$lib/assets/default-admin-config.json';

// Use static directory so SvelteKit won't overwrite it
const CONFIG_FILE_PATH = './static/admin-config.json';

// In-memory fallback for when file operations fail
let memoryConfig: AdminConfig | null = null;

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
    
    // Always store in memory as fallback
    memoryConfig = config;
    
    // Try to write to file (works in most environments)
    try {
      const fs = await import('fs/promises');
      
      // Check if static directory exists, create if not
      try {
        await fs.access('./static');
      } catch {
        await fs.mkdir('./static', { recursive: true });
      }
      
      // Write config to static directory
      await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');
      console.log('Admin config written to file successfully');
    } catch (fileError) {
      console.warn('Could not write to file, using memory storage:', fileError);
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
    // Try to read from file first
    try {
      const fs = await import('fs/promises');
      const configData = await fs.readFile(CONFIG_FILE_PATH, 'utf-8');
      const fileConfig = JSON.parse(configData);
      // Update memory config with file data
      memoryConfig = fileConfig;
      return json(fileConfig);
    } catch (readError) {
      // File doesn't exist or can't be read
      console.log('Config file not found, checking memory and defaults');
    }
    
    // If file read failed, check memory config
    if (memoryConfig) {
      return json(memoryConfig);
    }
    
    // Final fallback to default config
    return json(defaultConfigData as AdminConfig);
    
  } catch (error) {
    console.error('Error loading admin config:', error);
    return json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    );
  }
};
