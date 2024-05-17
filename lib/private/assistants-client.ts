
import { Axios } from "axios";
import { AssistantClientImp } from "./assistant-client";
import { HttpClient } from "../private/http-client";
import { AssistantClient, AssistantsClient } from "../public";


export class AssistantsClientImp implements AssistantsClient {
    constructor(private http:HttpClient) {
       
    }

    withId(id:string) : AssistantClient
    {
        return new AssistantClientImp(this.http,id);
    }
}
