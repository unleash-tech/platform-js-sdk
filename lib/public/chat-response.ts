import { AnswerReference as ChatAnswerSource } from './answer-reference';
import { MessageRole } from './message-role';
import { Reference } from './reference';
import { Resource } from './resource';

export type MessagePartType = 'Text' | 'InlineReference';

export interface ChatResponse {
	requestId: string;
	message: ChatMessageResponse;
	references: ChatAnswerSource[];
}

export interface ChatMessageResponse {
	role: MessageRole;
	parts: ChatMessagePart[];
	resources: Resource[];
	references: Reference[];
	threadId: string;
}

export interface ChatMessagePart {
	type: MessagePartType;
}

export interface ChatMessageTextPart extends ChatMessagePart {
	type: 'Text';
	format: 'markdown';
	text: string;
}

export interface ChatMessageInlineReferencesPart extends ChatMessagePart {
	type: 'InlineReference';
	indices: number[];
}

export type ChatResponseCode = 'web_search' | 'file_search' | 'web_search_retry';
export type ChatResponseEventType = 'Request' | 'Resources' | 'Message' | 'References' | 'Progress' | 'Full';

export interface ChatResponseEvent {
	type: ChatResponseEventType;
}

export class ChatRequestEvent implements ChatResponseEvent {
	type: 'Request';
	requestId!: string;
}

export class ChatResourcesEvent implements ChatResponseEvent {
	type: 'Resources';
	resources!: Resource[];
}

export class ChatMessageEvent implements ChatResponseEvent {
	type: 'Message';
	role: MessageRole;
	parts: ChatMessagePart[];
}

export class ChatReferencesEvent implements ChatResponseEvent {
	type: 'References';
	references!: Reference[];
}

export class ChatProgressItem implements ChatResponseEvent {
	type: ChatResponseEventType = 'Progress';
	code: ChatResponseCode;
}
