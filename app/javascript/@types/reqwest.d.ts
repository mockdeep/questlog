type RequestMethod = 'put' | 'post' | 'get' | 'delete';
type SuccessCallback = Function;
type ErrorCallback = Function;

declare module 'reqwest' {
  export type BaseRequestOptions = {
    type: 'json';
    method: RequestMethod;
    headers: {'X-CSRF-Token': string};
    success: SuccessCallback;
    error: ErrorCallback;
  };

  export type GivenRequestOptions = Partial<BaseRequestOptions> & {
    data?: any;
    url: string;
  };

  export type RequestOptions = BaseRequestOptions & GivenRequestOptions;

  export default function reqwest(options: RequestOptions): Promise<string>;
}
