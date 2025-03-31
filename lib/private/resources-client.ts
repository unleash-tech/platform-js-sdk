import { HttpClient } from '../private/http-client';
import {  ResourceClient, ResourcesClient } from '../public';
import { ResourceClientImp } from './resource-client';

export class ResourcesClientImp implements ResourcesClient {
	constructor(private http: HttpClient) {}

	withId(id: string): ResourceClient {
		if (!id) throw new Error('resource id argument is required');
		return new ResourceClientImp(this.http, id);
	}
}
