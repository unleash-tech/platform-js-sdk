import { Filters } from './filters';
import { MessageRole } from './message-role';

export interface ChatRequest {
	messages: ChatMessage[];
	enterpriseSearch?: ChatEnterpriseSearch;
	stream?: boolean;
	threadId?: string;
}

export interface ChatMessage {
	text: string;
	role: MessageRole;
}

export interface ChatEnterpriseSearch {
	filters?: Filters;
}
