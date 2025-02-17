import { SearchRequest } from '../public/search-request';
import { SearchResponse } from '../public/search-response';
import { ChatRequest } from '../public/chat-request';
import { ChatResponse, ChatResponseEvent } from '../public/chat-response';
import { FilterValuesRequest } from '../public/filter-values-request';
import { FilterValuesResponse } from '../public/filter-values-response';
import { AssistantClient, ChatClient } from '../public/assistant-client';
import { FiltersResponse } from '../public/filters-response';
import { HttpClient } from '../private/http-client';

type ChatInnerRequest = ChatRequest & { assistantId: string };

export class AssistantClientImp implements AssistantClient {
	constructor(
		protected http: HttpClient,
		private id: string
	) {}
	async filters(): Promise<FiltersResponse> {
		return this.http.post('/filters/stats', { assistantId: this.id });
	}

	async filterValues(req: FilterValuesRequest): Promise<FilterValuesResponse> {
		return this.http.post('/filters', { ...req, assistantId: this.id });
	}

	async search(req: SearchRequest): Promise<SearchResponse> {
		return this.http.post('/search', { ...req, assistantId: this.id });
	}

	chat(req: ChatRequest): ChatClient {
		return new ChatClientImp(this.http, this.id, req);
	}
}

export class ChatClientImp implements ChatClient {
	constructor(
		protected http: HttpClient,
		private id: string,
		private req: ChatRequest
	) {}

	async *stream(): AsyncGenerator<ChatResponseEvent> {
		const res = this.http.streamFetch('/chat', { ...this.req, assistantId: this.id, stream: true });
		const encoder = new TextEncoder();
		const decoder = new TextDecoder();
		let current = '';
		for await (const chunk of res) {
			const uint8Array = encoder.encode(chunk);
			const decodedChunk = decoder.decode(uint8Array, { stream: true });
			const lines = decodedChunk.split('\n');
			for (const line of lines.filter((l) => l.length > 0)) {
				try {
					if (line.startsWith('data: ')) {
						if (current) {
							const response: ChatResponseEvent = JSON.parse(current);
							yield response;
						}
						current = line.slice(6);
					} else {
						current += line;
					}
				} catch (error) {
					console.error('Error during streaming chat:', error, current);
				}
			}
			if (current) {
				const response: ChatResponseEvent = JSON.parse(current);
				yield response;
			}
		}
	}
	async complete(): Promise<ChatResponse> {
		const request: ChatInnerRequest = {
			...(<ChatRequest>this.req),
			assistantId: this.id,
		};
		return await this.http.post<ChatInnerRequest, ChatResponse>('/chat', request);
	}
}
