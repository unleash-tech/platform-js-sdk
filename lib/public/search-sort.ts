import { SearchSortOrder } from "./search-sort-order";
import { SearchSortBy } from "./search-sort-by";


export interface SearchSort {
    by: SearchSortBy;
    order: SearchSortOrder;
}
