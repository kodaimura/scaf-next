class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

class Api {
  private getBaseUrl(): string {
    const isServer = typeof window === 'undefined';
    return isServer ? 'http://backend:3001/api' : `${process.env.NEXT_PUBLIC_API_HOST}/api`;
  }

  private async apiFetch<T>(endpoint: string, method: string, body?: unknown): Promise<T> {
    if (endpoint.startsWith('/')) {
      endpoint = endpoint.slice(1);
    }
    
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (typeof window === 'undefined') {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        headers.Cookie = `access_token=${cookieStore.get('access_token')?.value}`
      }
      
      const options: any = {
        method,
        headers,
        credentials: 'include',
      };

      if (body) {
        options.body = JSON.stringify(body);
      }
      
      const response = await fetch(`${this.getBaseUrl()}/${endpoint}`, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new HttpError(response.status, errorData.error);
      }

      try {
        return (await response.json()) as T;
      } catch {
        if (response.status !== 204 && response.status !== 200) {
          throw new HttpError(response.status, 'Error parsing JSON');
        }
        return {} as T;
      }
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        if (typeof window !== 'undefined') {
          this.handleClientSideError(error);
        }
        throw error;
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

  public handleClientSideError(error: HttpError): never {
    console.error(error);
    throw error;
  }
}

const api = new Api();
api.handleClientSideError = (error: HttpError): never => {
  const status = error.status;
  if (status === 401) {
    if (window.location.pathname !== '/login') {
      window.location.replace('/login');
    }
  } else if (status === 403) {
    alert("権限がありません。");
  } else if (status === 500) {
    alert("予期せぬエラーが発生しました。");
  }
  throw error;
};

export { HttpError, Api, api };
