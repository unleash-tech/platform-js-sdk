import { AxiosRequestConfig } from 'axios';

export interface ApiClientOptions {
	tenant?: string;
	account?: string;
	token: string;
	axios?: AxiosRequestConfig;
}
