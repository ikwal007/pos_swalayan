export interface FetchDataOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  body?: any;
  headers?: any;
}
