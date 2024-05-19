export interface AnswerRequest {
	filters?: {
		[name: string]: boolean | string | number;
	};
	query: string;
}
