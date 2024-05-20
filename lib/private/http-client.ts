import * as axios from 'axios';

export interface HttpClient {
	post<Request, Response>(url: string, body: Request): Promise<Response>;
}

export class AxiosHttpClient implements HttpClient {
    constructor(private _axios: axios.Axios)
    {

    }
    async post<Request, Response>(url: string, body: Request): Promise<Response> {
        const resp = await this._axios.post(url,body);
        return resp.data;
    }
}