import * as axios from 'axios';
import { Readable } from 'stream';

export interface HttpClient {
	post<Request, Response>(url: string, body: Request): Promise<Response>;
	streamFetch<Request>(url: string, body: Request): AsyncGenerator<string, void, unknown>;
}

export class AxiosHttpClient implements HttpClient {
	constructor(private _axios: axios.Axios) {}

	async post<Request, Response>(url: string, body: Request): Promise<Response> {
		const resp = await this._axios.post(url, body);
		return resp.data;
	}

	private async *streamToAsyncIterable(stream: Readable): AsyncGenerator<string> {
		for await (const chunk of stream) {
			yield chunk.toString();
		}
	}

	async *streamFetch<Request>(url: string, body: Request): AsyncGenerator<string, void, unknown> {
		try {
			const response = await this._axios.request<Readable>({
				method: 'post',
				url,
				data: body,
				responseType: 'stream',
			});

			for await (const chunk of this.streamToAsyncIterable(response.data)) {
				yield chunk;
			}
		} catch (error) {
			console.error('Request error:', error);
			throw error;
		}
	}
}
