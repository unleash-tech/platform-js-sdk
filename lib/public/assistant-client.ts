import { AnswerResponse } from '../public/answer-response';
import { AnswerRequest } from '../public/answer-request';
import { SearchRequest } from '../public/search-request';
import { SearchResponse } from '../public/search-response';
import { ChatRequest } from '../public/chat-request';
import { ChatResponse, ChatResponsePart } from '../public/chat-response';
import { FilterValuesRequest } from '../public/filter-values-request';
import { FilterValuesResponse } from '../public/filter-values-response';
import { FiltersResponse } from '../public/filters-response';

export interface AssistantClient {
	answer(req: AnswerRequest): Promise<AnswerResponse>;
	filterValues(req: FilterValuesRequest): Promise<FilterValuesResponse>;
	filters(): Promise<FiltersResponse>;
	search(req: SearchRequest): Promise<SearchResponse>;
	chat(req: ChatRequest): ChatClient;
}

export interface ChatClient {
	stream(): AsyncGenerator<ChatResponsePart>;
	json(): Promise<ChatResponse>;
}
