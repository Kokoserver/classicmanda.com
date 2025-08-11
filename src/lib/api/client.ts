export interface ApiResponse<T> {
	data: T;
	success: boolean;
	message?: string;
	error?: string;
}

export class ApiClient {
	private baseUrl: string;
	private defaultHeaders: Record<string, string> = {};

	constructor() {
		// Default to local API endpoint
		this.baseUrl = '/api';
	}

	private async request<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
		try {
			const response = await fetch(`${this.baseUrl}${url}`, {
				headers: {
					'Content-Type': 'application/json',
					...this.defaultHeaders,
					...(options.headers as Record<string, string>)
				},
				...options
			});

			const data = await response.json();

			if (!response.ok) {
				return {
					data: null as T,
					success: false,
					error: data.message || 'An error occurred'
				};
			}

			return {
				data,
				success: true
			};
		} catch (error: unknown) {
			return {
				data: null as T,
				success: false,
				error: error instanceof Error ? error.message : 'Network error'
			};
		}
	}

	async get<T>(endpoint: string): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, { method: 'GET' });
	}

	async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
	}

	async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, { method: 'DELETE' });
	}
}

export const apiClient = new ApiClient();
