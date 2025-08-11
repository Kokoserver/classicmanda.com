import type { AdminConfig } from '$lib/utils/adminConfig';
import defaultConfigData from '$lib/assets/default-admin-config.json';

// In-memory storage for serverless environments
let runtimeConfig: AdminConfig | null = null;

/**
 * Get the current admin configuration
 * Returns runtime config if available, otherwise default config
 */
export function getAdminConfig(): AdminConfig {
  return runtimeConfig || (defaultConfigData as AdminConfig);
}

/**
 * Set the admin configuration
 * Stores in memory for serverless environments
 */
export function setAdminConfig(config: AdminConfig): void {
  runtimeConfig = { ...config };
}

/**
 * Reset admin configuration to default
 */
export function resetAdminConfig(): void {
  runtimeConfig = null;
}

/**
 * Check if custom config is currently active
 */
export function hasCustomConfig(): boolean {
  return runtimeConfig !== null;
}
