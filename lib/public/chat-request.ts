import { Filters } from './filters';

export interface ChatRequest {
	filters?: Filters;
	assistantId?: string;
	messages: ChatConversation[];
	chat?: ChatAssistantChatRequest;
	stream?: boolean;
}

export interface ChatAssistantChatRequest {
	id: string;
	modifiedSince?: number;
}

export interface ChatConversation {
	text?: string;
	role?: string;
	resourcesIds?: string[];
}
