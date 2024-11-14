import { Filters } from './filters';

export interface ChatRequest {
	filters?: Filters;
	messages: ChatMessage[];
	stream?: boolean;
}

export interface ChatMessage {
	text: string;
	role: string;
}
