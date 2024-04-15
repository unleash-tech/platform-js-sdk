export interface SessionTokenCache 
{
    get(embedId:string,token:string):Promise<string>
    set(embedId: string, token: string,sessionToken:string):Promise<void>;
}
