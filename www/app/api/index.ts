interface CustomError extends Error {
    response?: any;
}

export const fetchJson = (
    url: string,
    options?: RequestInit,
    token = ''
): Promise<any> => {
    const headers = new Headers(options?.headers || {});
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    delete options?.headers;
    const API_URL = new URL(process.env.NEXT_PUBLIC_API_URL + url);
    return fetch(API_URL.href, {
        headers,
        ...options,
    })
        .then(checkStatus)
        .then(decode);
};

async function checkStatus(response: Response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    const error: CustomError = new Error(response.statusText);
    error.response = await decode(response);

    throw error.response;
}

const decode = (data: Response) => {
    return data?.text()?.then((text) => (text ? JSON.parse(text) : ''));
};
