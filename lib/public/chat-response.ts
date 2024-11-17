import { AnswerReference as ChatAnswerSource } from './answer-reference';

export type ChatResponsePart = ChatSourcesPart | ChatReferencePart;

export interface ChatResponse {
	answer: ChatAnswerPart;
	references: ChatAnswerSource[];
	requestId: string;
}
export interface ChatAnswerPart {
	answer: string;
	resourceIds: string[];
	sources: SourceReference[];
}
export interface ChatSourcesPart {
	type: string;
	requestId: string;
	sources: ChatAnswerSource[];
}
export interface SourceReference {
	type: string;
	referenceIds: string[];
	Position: number;
}
export type ChatReferencePart = SourceReference;
