type RequestMethod = 'GET' | 'PUT';
type SuccessCallback = (result: any) => void;

declare module 'reqwest' {
  export type BaseRequestOptions = {
    headers: {
      Accept: 'application/json';
      'X-CSRF-Token': string;
      'Content-Type': 'application/json';
    };
    error: ErrorCallback;
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
