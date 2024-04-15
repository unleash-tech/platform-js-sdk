import { Axios,AxiosRequestConfig } from "axios";
import { SessionTokenCache } from "./session-token-cache";

export interface ApiClientOptions {
    endpoint?: string;
    account?:string; 
    token?: string;    
    axios?:AxiosRequestConfig;    
}
