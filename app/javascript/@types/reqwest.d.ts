type RequestMethod = 'put' | 'post' | 'get' | 'delete';
type SuccessCallback = (result: any) => void;

declare module 'reqwest' {
  export type BaseRequestOptions = {
    method: RequestMethod;
    headers: {
      Accept: 'application/json';
      'X-CSRF-Token': string;
      'Content-Type': 'application/json';
    };
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
