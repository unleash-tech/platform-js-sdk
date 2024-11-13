import { Filters } from './filters';

export interface ChatRequest {
	filters?: Filters;
	assistantId?: string;
	messages: ChatMessage[];
	stream?: boolean;
}

export interface ChatMessage {
	text?: string;
	role?: string;
	resourcesIds?: string[];
}
