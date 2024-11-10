import { AnswerReference } from './answer-reference';

export interface ChatResponse {
	answer: ChatAnswer;
	references: AnswerReference[];
	requestId?: string;
}

export interface ChatAnswer {
	answer?: string;
	resourceIds?: string[];
}
