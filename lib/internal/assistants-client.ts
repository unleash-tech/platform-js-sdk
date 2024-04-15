import { AssistantsClient } from "../assistants-client";
import { AssistantClientImp } from "./assistant-client";
import { AssistantClient } from "../assistant-client";
import { Axios } from "axios";


export class AssistantsClientImp extends AssistantClientImp implements AssistantsClient {
    constructor(axios:Axios) {
        super(axios,null)
    }

    withId(id:string) : AssistantClient
    {
        return new AssistantClientImp(this.axios,id);
    }
}
