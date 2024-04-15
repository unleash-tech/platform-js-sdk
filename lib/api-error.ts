export class ApiError 
{
    requestId?:string;
    title:string;
    detail:string;
    reason:string;
    inner?:any;
}