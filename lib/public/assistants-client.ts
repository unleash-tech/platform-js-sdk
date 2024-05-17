import { AssistantClient } from "./assistant-client";

export interface AssistantsClient {
    withId(id:string) : AssistantClient
}
