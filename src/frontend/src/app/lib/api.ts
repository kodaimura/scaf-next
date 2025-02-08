const BASE_URL = `${process.env.NEXT_PUBLIC_API_HOST}/api`;

class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

class Api {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  private async apiFetch<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: unknown): Promise<T> {
    if (endpoint.startsWith('/')) {
      endpoint = endpoint.slice(1);
    }
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      const options: RequestInit = {
        method,
        headers,
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
        return {} as T; // 空のレスポンス用の型キャスト
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
    throw new Error('Unexpected error in apiFetch');
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

  public handleHttpError(error: HttpError): never {
    console.error(error);
    throw error;
  }
}

const api = new Api(BASE_URL);

// クライアントサイドでのみカスタムエラーハンドリングを適用
if (typeof window !== 'undefined') {
  api.handleHttpError = (error: HttpError) => {
    const status = error.status;
    if (status === 401) {
      if (window.location.pathname !== '/login') {
        window.location.replace('/login');
      }
    } else if (status === 403) {
      alert('権限がありません。');
    } else if (status === 500) {
      alert('予期せぬエラーが発生しました。');
    }
    throw error;
  };
}

export { HttpError, Api, BASE_URL, api };
