import { Filters } from './filters';

export interface ChatRequest {
	filters?: Filters;
	assistantId?: string;
	messages: ChatMessage[];
	chat?: ChatAssistantChatRequest;
	stream?: boolean;
}

export interface ChatAssistantChatRequest {
	id: string;
	modifiedSince?: number;
}

export interface ChatMessage {
	text?: string;
	role?: string;
	resourcesIds?: string[];
}
