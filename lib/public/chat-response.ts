import { AnswerReference as AnswerSource } from './answer-reference';

export type ChatResponseType = ChatResponse | ChatResultItem | ChatAnswerItem | ChatResourceIdsItem | SourceReference;

export interface ChatResponse {
	answer: ChatAnswer;
	references: AnswerSource[];
	requestId?: string;
}
export interface ChatAnswer {
	answer?: string;
	resourceIds?: string[];
	references?: SourceReference[];
}
export interface ChatResultItem {
	type: string;
	requestId?: string;
	references: AnswerSource[];
	duration: number;
}
export interface SourceReference {
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
