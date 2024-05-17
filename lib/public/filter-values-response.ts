import { ApiResponse } from "./api-response";
import { FilterOption } from "./filter-option";


export interface FilterValuesResponse  extends ApiResponse{
    options: FilterOption[];
}
