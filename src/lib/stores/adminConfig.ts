import { writable } from 'svelte/store';
import type { AdminConfig } from '$lib/utils/adminConfig';
import { loadAdminConfig } from '$lib/utils/adminConfig';

// Create a reactive store for admin config
export const adminConfigStore = writable<AdminConfig | null>(null);

// Flag to track if config is loading
export const configLoading = writable<boolean>(false);

/**
 * Load admin config into the store
 */
export async function loadConfigIntoStore(): Promise<void> {
  configLoading.set(true);
  try {
    const config = await loadAdminConfig(true); // Force reload
    adminConfigStore.set(config);
  } catch (error) {
    console.error('Error loading config into store:', error);
  } finally {
    configLoading.set(false);
  }
}

/**
 * Refresh the admin config store (call after saving changes)
 */
export async function refreshAdminConfig(): Promise<void> {
  await loadConfigIntoStore();
}

// Initialize the store on first import
if (typeof window !== 'undefined') {
  loadConfigIntoStore();
}
