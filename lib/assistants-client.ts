import { AssistantClient } from "./assistant-client";

export interface AssistantsClient extends AssistantClient {
    withId(id:string) : AssistantClient
}
