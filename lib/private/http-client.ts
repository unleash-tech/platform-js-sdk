export interface HttpClient {
	post<Request, Response>(url: string, body: Request): Promise<Response>;
}
