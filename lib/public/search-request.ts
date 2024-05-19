import { SearchPaging } from './search-paging';
import { SearchSort } from './search-sort';

export interface SearchRequest {
	filters?: {
		[name: string]: boolean | string | number;
	};
	query?: string;
	contentSearch?: boolean;
	semanticSearch?: boolean;
	sort?: SearchSort;
	paging?: SearchPaging;
}
