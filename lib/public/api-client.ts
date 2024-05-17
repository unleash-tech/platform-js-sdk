import { ApiClientOptions } from "./api-client-options";
import * as axios from 'axios'
import { ApiError } from "../public";
import { AssistantsClient } from "./assistants-client";
import { AssistantsClientImp } from "../private/assistants-client";

export class ApiClient {
    constructor(options: ApiClientOptions) {
                
        this._axios = new axios.Axios(<any>{...axios.default.defaults, ...options.axios||{}});

        if (  !this._axios.defaults.baseURL )
            this._axios.defaults.baseURL = (options.tenant || Tenant.Default)?.replace('https://app.','https://e-api.');

        if ( options.token)
            this._axios.defaults.headers.common.Authorization='Bearer ' + options.token;
    
        if ( options.account )
            this._axios.defaults.headers.common['unleash-account'] = options.account;                    
        
        this._axios.interceptors.response.use(c=>{
            return c;
        },e=>{            
            var error = <axios.AxiosError>e;
            
            if ( error.response )
            {
                var apiError:ApiError = {...(<any>error.response.data),status:error.response.status};
                return Promise.reject(apiError);
            }
            
            var apiError:ApiError={detail:'Network Error: ' + e.message,reason:'NetworkError',title:'Network Error',inner:error};
            return Promise.reject(apiError);
        });
    }

    get assistants(): AssistantsClient {
        return new AssistantsClientImp(this._axios);
    }

    private _axios:axios.Axios;
    
}