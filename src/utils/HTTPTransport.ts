export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: Method;
  data?: any;
};

export default class HTTPTransport {
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public get<Response>(path = '/'): Promise<Response> {
        return this.request<Response>(this.endpoint + path);
    }

    public post<Response = void>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.POST,
            data,
        });
    }

    public put<Response = void>(path: string, data: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.PUT,
            data,
        });
    }

    public patch<Response = void>(path: string, data: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.PATCH,
            data,
        });
    }

    public delete<Response>(path: string): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.DELETE,
        });
    }

    private request<Response>(url: string, options: Options = {method: Method.GET}): Promise<Response> {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = () => reject({reason: 'abort'});
            xhr.onerror = () => reject({reason: 'network error'});
            xhr.ontimeout = () => reject({reason: 'timeout'});

            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (method === Method.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}