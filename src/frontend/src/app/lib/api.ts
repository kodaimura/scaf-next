class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

class Api {
  private url: string;
  private headers: HeadersInit = {};

  constructor() {
    if (typeof window !== 'undefined') {
      // クライアントサイド（CSR）
      this.url = `${process.env.NEXT_PUBLIC_API_HOST}/api`;
    } else {
      // サーバーサイド（SSR）
      this.url = 'http://backend:3001/api';
    }
  }

  setSSRContext(context?: { req?: { headers?: { cookie?: string } } }) {
    if (typeof window === 'undefined' && context?.req?.headers?.cookie) {
      this.headers['Cookie'] = context.req.headers.cookie;
    }
  }

  private async apiFetch<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: unknown
  ): Promise<T> {
    if (endpoint.startsWith('/')) {
      endpoint = endpoint.slice(1);
    }

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...this.headers, // SSR の場合に Cookie を含める
      };

      const options: RequestInit = {
        method,
        headers,
        credentials: 'include',
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.url}/${endpoint}`, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new HttpError(response.status, errorData.error);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json() as T;
    } catch (error) {
      if (error instanceof HttpError) {
        this.handleHttpError(error);
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.apiFetch<T>(endpoint, 'GET');
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.apiFetch<T>(endpoint, 'POST', body);
  }

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.apiFetch<T>(endpoint, 'PUT', body);
  }

  async delete<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.apiFetch<T>(endpoint, 'DELETE', body);
  }

  private handleHttpError(error: HttpError): never {
    if (typeof window !== 'undefined') {
      // クライアントサイド（CSR）
      if (error.status === 401) {
        if (window.location.pathname !== '/login') {
          window.location.replace('/login');
        }
      } else if (error.status === 403) {
        alert('権限がありません。');
      } else if (error.status === 500) {
        alert('予期せぬエラーが発生しました。');
      }
    } else {
      // サーバーサイド（SSR）
      console.error(error);
    }
    throw error;
  }
}

const api = new Api();

export { HttpError, Api, api };
