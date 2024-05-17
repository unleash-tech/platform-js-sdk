import { Resource } from "./resource";


export interface SearchResult {
    resource: Resource;
    snippet: string;
    highlights: string[];
}
