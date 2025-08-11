import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { AdminConfig } from '$lib/utils/adminConfig';

const CONFIG_FILE_PATH = './static/admin-config.json';

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
    
    // Write the config to the JSON file
    const fs = await import('fs/promises');
    await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');
    
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


    const fs = await import('fs/promises');
    const configData = await fs.readFile(CONFIG_FILE_PATH, 'utf-8');
    const config = JSON.parse(configData);
    
    return json(config);
  } catch (error) {
    console.error('Error loading admin config:', error);
    return json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    );
  }
};
