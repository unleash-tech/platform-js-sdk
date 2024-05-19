import { SearchResult } from './search-result';
import { ApiResponse } from './api-response';
import { SearchPagingToken } from './search-paging-token';

export interface SearchResponse extends ApiResponse {
	totalResults: number;
	results: SearchResult[];
	paging: SearchPagingToken;
}
