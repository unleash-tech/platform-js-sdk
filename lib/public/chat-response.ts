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
	Type: string;
	requestId?: string;
	references: AnswerReference[];
	Duration: number;
}
export interface ChatReferenceItem {
	Type: string;
	referenceIds?: string[];
	Position: number;
	Duration: number;
}
export interface ChatAnswerItem {
	Type: string;
	answer?: string;
	Duration: number;
}
export interface ChatResourceIdsItem {
	Type: string;
	resourceIds?: string[];
	Duration: number;
}
