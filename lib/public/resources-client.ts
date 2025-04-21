import { ResourceClient } from './resource-client';

export interface ResourcesClient {
	withId(id: string): ResourceClient;
}
