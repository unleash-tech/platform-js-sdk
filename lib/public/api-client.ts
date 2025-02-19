import { ApiClientOptions } from './api-client-options';
import * as axios from 'axios';
import { ApiError } from '../public';
import { AssistantsClient } from './assistants-client';
import { AssistantsClientImp } from '../private/assistants-client';
import { AxiosHttpClient, HttpClient } from '../private';

const DEFAULT_TENANT = 'https://app.unleash.so';

export class ApiClient {
	constructor(options: ApiClientOptions) {
		const _axios = new axios.Axios(<any>{
			...axios.default.defaults,
			...(options.axios || {}),
		});

		if (!_axios.defaults.baseURL)
			_axios.defaults.baseURL = (options.tenant || DEFAULT_TENANT)?.replace('https://app.', 'https://e-api.');

		if (options.token) _axios.defaults.headers.common.Authorization = 'Bearer ' + options.token;

		if (options.account) _axios.defaults.headers.common['unleash-account'] = options.account;

		_axios.interceptors.response.use(
			(c) => {
				return c;
			},
			(e) => {
				const error = <axios.AxiosError>e;

				if (error.response) {
					const apiError: ApiError = {
						...(<any>error.response.data),
						status: error.response.status,
					};
					if (apiError.reason == 'Missing impersonation header')
						apiError.title =
							'The provided api token requires an unleash account on behalf of which to execute' +
							' the call.\nPlease provide a valid account id or account email in the account' +
							' field of the options arg provided in the ApiClient constructor';
					return Promise.reject(apiError);
				}

				const apiError: ApiError = {
					detail: 'Network Error: ' + e.message,
					reason: 'NetworkError',
					title: 'Network Error',
					inner: error,
				};
				return Promise.reject(apiError);
			}
		);

		this.http = new AxiosHttpClient(_axios);
	}

	get assistants(): AssistantsClient {
		return new AssistantsClientImp(this.http);
	}

	private http: HttpClient;
}
