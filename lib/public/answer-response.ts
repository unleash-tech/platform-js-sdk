import { AnswerReference } from './answer-reference';
import { ApiResponse } from './api-response';

export interface AnswerResponse extends ApiResponse {
	answer: string;
	references: AnswerReference[];
}
