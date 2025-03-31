import { GetResourceContentResponse } from './resource-content-response';

export interface ResourceClient {
	content(): Promise<GetResourceContentResponse>;
}
