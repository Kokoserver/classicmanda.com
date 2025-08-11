import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { password } = await request.json();
		
		// Get admin password from environment variable (server-side only)
		const adminPassword = env.ADMIN_PASSWORD || 'admin123';
		
		if (password === adminPassword) {
			// In a real app, you'd create a secure session/JWT token here
			return json({ 
				success: true, 
				message: 'Authentication successful' 
			});
		} else {
			return json({ 
				success: false, 
				message: 'Invalid password' 
			}, { status: 401 });
		}
	} catch (error) {
		return json({ 
			success: false, 
			message: 'Authentication failed' 
		}, { status: 500 });
	}
};
