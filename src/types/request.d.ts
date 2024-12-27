export interface FetchClientOptions {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    params?: any;
    data?: any;
    token?: string;
    type?: 'upload' | 'json';
}

export interface FetchResponse {
    data: any;
    status: number;
    headers: Headers;
} 