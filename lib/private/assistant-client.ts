import { AnswerResponse } from '../public/answer-response';
import { AnswerRequest } from '../public/answer-request';
import { SearchRequest } from '../public/search-request';
import { SearchResponse } from '../public/search-response';
import { ChatRequest } from '../public/chat-request';
import { ChatResponseType } from '../public/chat-response';
import { FilterValuesRequest } from '../public/filter-values-request';
import { FilterValuesResponse } from '../public/filter-values-response';
import { AssistantClient } from '../public/assistant-client';
import { FiltersResponse } from '../public/filters-response';
import { HttpClient } from '../private/http-client';

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

	async answer(req: AnswerRequest): Promise<AnswerResponse> {
		return this.http.post('/answers', { ...req, assistantId: this.id });
	}
	async search(req: SearchRequest): Promise<SearchResponse> {
		return this.http.post('/search', { ...req, assistantId: this.id });
	}
	async *chat(req: ChatRequest): AsyncGenerator<ChatResponseType> {
		const res = this.http.streamFetch('/chat', { ...req, assistantId: this.id });
		if (req.stream) {
			const encoder = new TextEncoder();
			const decoder = new TextDecoder();
			let current = '';

			for await (const chunk of res) {
				const uint8Array = encoder.encode(chunk);
				const decodedChunk = decoder.decode(uint8Array, { stream: true });
				const lines = decodedChunk.split('\n');
				for (const line of lines.filter((l) => l.length > 0)) {
					if (line.startsWith('data: ')) {
						current = line.slice(6);
						const response: ChatResponseType = JSON.parse(current);
						yield response;
						current = '';
					} else {
						current += line;
					}
				}
			}
		} else {
			return await this.http.post('/chat', { ...req, assistantId: this.id });
		}
	}
}
