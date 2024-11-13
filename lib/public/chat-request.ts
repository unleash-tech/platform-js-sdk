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

export type ChatRequestBlock = ChatRequest & { stream: undefined | false };
export type ChatRequestStream = ChatRequest & { stream: true };
