import { Filters } from "./filters";

export interface AnswerRequest {
	filters?: Filters;
	query: string;
}
