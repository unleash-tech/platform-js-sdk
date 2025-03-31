import { Resource } from './resource';

export interface SearchResult {
	resource: Resource;
	snippet: string;
	highlights: string[];
    title: string;
    subtitle: string;
    url: string;
}
