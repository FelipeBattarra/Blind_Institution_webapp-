export interface HttpResult<T> {
    success: boolean;
    data: T | null;
    error: string;
}