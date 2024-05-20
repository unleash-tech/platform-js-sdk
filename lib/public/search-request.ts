import { Filters } from './filters';
import { SearchPaging } from './search-paging';
import { SearchSort } from './search-sort';

export interface SearchRequest {
	filters?: Filters;
	query?: string;
	contentSearch?: boolean;
	semanticSearch?: boolean;
	sort?: SearchSort;
	paging?: SearchPaging;
}
