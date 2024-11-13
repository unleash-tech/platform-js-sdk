import { AnswerResponse } from '../public/answer-response';
import { AnswerRequest } from '../public/answer-request';
import { SearchRequest } from '../public/search-request';
import { SearchResponse } from '../public/search-response';
import { ChatRequestBlock, ChatRequestStream } from '../public/chat-request';
import { ChatResponse, ChatResponsePart } from '../public/chat-response';
import { FilterValuesRequest } from '../public/filter-values-request';
import { FilterValuesResponse } from '../public/filter-values-response';
import { AssistantClient } from '../public/assistant-client';
import { FiltersResponse } from '../public/filters-response';
import { HttpClient } from '../private/http-client';

type ChatInnerRequestBlock = ChatRequestBlock & { assistantId: string };

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

	chat(req: ChatRequestStream): AsyncGenerator<ChatResponsePart>;
	chat(req: ChatRequestBlock): Promise<ChatResponse>;

	async *chat(req: ChatRequestStream | ChatRequestBlock): AsyncGenerator<ChatResponsePart> | Promise<ChatResponse> {
		if (req.stream) {
			const res = this.http.streamFetch('/chat', { ...req, assistantId: this.id });
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
						const response: ChatResponsePart = JSON.parse(current);
						yield response;
						current = '';
					} else {
						current += line;
					}
				}
			}
		} else {
			const request: ChatInnerRequestBlock = {
				...(<ChatRequestBlock>req),
				assistantId: this.id,
			};
			return await this.http.post<ChatInnerRequestBlock, ChatResponse>('/chat', request);
		}
	}
}
