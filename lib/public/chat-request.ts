import { Filters } from './filters';

export interface ChatRequest {
	query: string;
	filters?: Filters;
	assistantId?: string;
	messages?: ChatConversation[];
	chat?: ChatAssistantChatRequest;
	enableStreaming?: boolean;
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
