enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type RequestOptions = {
    method?: METHOD;
    headers?: Record<string, string>;
    data?: Record<string, any>;
    isFormData?: boolean;
} | Record<string, never>;

type Request = (
    url: string,
    options?: RequestOptions,
    timeout?: number
) => Promise<XMLHttpRequest>;

function queryStringify(data = {}) {
    const items = Object.entries(data);

    let stringParams = '?';
    items.forEach((value, index, array) => {
        stringParams += `${value[0]}=${value[1]}`;

        if (array.length - 1 !== index) {
            stringParams += '&';
        }
    });

    return stringParams;
}

class HTTPTransport {
    get: Request = (url, options = {}, timeout?) => this.request(
        url,
        {
            ...options,
            method: METHOD.GET,
        },
        timeout,
    );

    post: Request = (url, options = {}, timeout?) => this.request(
        url,
        {
            ...options,
            method: METHOD.POST,
        },
        timeout,
    );

    put: Request = (url, options = {}, timeout?) => this.request(
        url,
        {
            ...options,
            method: METHOD.PUT,
        },
        timeout,
    );

    patch: Request = (url, options = {}, timeout?) => this.request(
        url,
        {
            ...options,
            method: METHOD.PATCH,
        },
        timeout,
    );

    delete: Request = (url, options = {}, timeout?) => this.request(
        url,
        {
            ...options,
            method: METHOD.DELETE,
        },
        timeout,
    );

    request: Request = (url, options = {}, timeout = 5000) => {
        const {headers = {}, method, data, isFormData = false,} = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('Не указан метод запроса'));
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(
                method,
                isGet && Boolean(data) ?
                    `${url}${queryStringify(data)}` :
                    url,
            );

            xhr.withCredentials = true;

            if (!isFormData) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send((isFormData ? data : JSON.stringify(data)) as XMLHttpRequestBodyInit);
            }
        });
    };
}

export default new HTTPTransport();
