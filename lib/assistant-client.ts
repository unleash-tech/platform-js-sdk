import { AnswerResponse } from "./answer-response";
import { AnswerRequest } from "./answer-request";
import { SearchRequest } from "./search-request";
import { SearchResponse } from "./search-response";
import { FilterValuesRequest } from "./filter-values-request";
import { FilterValuesResponse } from "./filter-values-response";



export interface AssistantClient {
    answer(req: AnswerRequest): Promise<AnswerResponse>;
    filterValues(req:FilterValuesRequest) : Promise<FilterValuesResponse>
    filters() : Promise<FiltersResponse>
    search(req: SearchRequest): Promise<SearchResponse>;
}

export interface FiltersResponse 
{
    availableFilters:any;
}

