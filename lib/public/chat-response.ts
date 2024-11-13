import { AnswerReference } from './answer-reference';

export type ChatResponseType = ChatResponse | ChatResultItem | ChatAnswerItem | ChatResourceIdsItem | ChatReferenceItem;

export interface ChatResponse {
	answer: ChatAnswer;
	references: AnswerReference[];
	requestId?: string;
}
export interface ChatAnswer {
	answer?: string;
	resourceIds?: string[];
	references?: ChatReferenceItem[];
}
export interface ChatResultItem {
	type: string;
	requestId?: string;
	references: AnswerReference[];
	duration: number;
}
export interface ChatReferenceItem {
	type: string;
	referenceIds?: string[];
	Position: number;
	duration: number;
}
export interface ChatAnswerItem {
	type: string;
	answer?: string;
	duration: number;
}
export interface ChatResourceIdsItem {
	type: string;
	resourceIds?: string[];
	duration: number;
}
