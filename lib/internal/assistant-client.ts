import { AssistantClient, FiltersResponse } from "../assistant-client";
import { AnswerResponse } from "../answer-response";
import { AnswerRequest } from "../answer-request";
import { SearchRequest } from "../search-request";
import { SearchResponse } from "../search-response";
import { FilterValuesRequest } from "../filter-values-request";
import { FilterValuesResponse } from "../filter-values-response";
import { Axios } from "axios";

export class AssistantClientImp implements AssistantClient {
    constructor(protected axios:Axios, private id: string) {
    }

    async filters(): Promise<FiltersResponse> {
        return (await this.axios.post('/filters/stats', {assistantId:this.id})).data;   
    }

    async filterValues(req: FilterValuesRequest): Promise<FilterValuesResponse> {
        return (await this.axios.post('/filters', {...req,assistantId:this.id})).data;   
    }

    async answer(req: AnswerRequest): Promise<AnswerResponse> {
        return (await this.axios.post('/answers', {...req,assistantId:this.id})).data;
    }
    async search(req: SearchRequest): Promise<SearchResponse> {
        return (await this.axios.post('/search', {...req,assistantId:this.id})).data;
    }

    
}
