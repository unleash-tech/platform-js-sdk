import { HttpClient } from '../private';
import { GetResourceContentResponse, ResourceClient } from '../public';


export class ResourceClientImp implements ResourceClient {
	constructor(
		protected http: HttpClient,
		private id: string
	) {}

    content(): Promise<GetResourceContentResponse> {
        const url = `/resources/${this.id}/content`;
        return this.http.get(url);
    }
}
