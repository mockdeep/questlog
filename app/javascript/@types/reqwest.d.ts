type RequestMethod = 'GET' | 'PUT';
type SuccessCallback = (result: any) => void;

declare module 'reqwest' {
  export type BaseRequestOptions = {
    headers: Headers;
    credentials: 'same-origin';
  };

  export type GivenRequestOptions = Partial<BaseRequestOptions> & {
    method: RequestMethod;
    success: SuccessCallback;
    data?: any;
    url: string;
  };

  export type RequestOptions = BaseRequestOptions & GivenRequestOptions;

  export default function reqwest(options: RequestOptions): Promise<string>;
}
