class HttpError extends Error {
  status: number;
  details: any;

  constructor(status: number, message: string, details: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

class Api {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async createFetchOptions(method: string, body?: unknown): Promise<RequestInit> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
    return options;
  }

  private async apiFetch<T>(endpoint: string, method: string, body?: unknown): Promise<T> {
    if (endpoint.startsWith('/')) {
      endpoint = endpoint.slice(1);
    }

    try {
      const options = await this.createFetchOptions(method, body);
      const response = await fetch(`${this.url}/${endpoint}`, options);

      if (!response.ok) {
        let errorData = { error: 'Unknown error', details: {} };
        try {
          errorData = await response.json();
        } catch (e) {
          // JSON parse failed - leave default message
        }
        throw new HttpError(response.status, errorData.error, errorData.details);
      }

      if (response.status === 204) {
        return {} as T;
      }

      try {
        return (await response.json()) as T;
      } catch (e) {
        throw new HttpError(response.status, 'Error parsing JSON', { cause: e });
      }
    } catch (error: unknown) {
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

  public handleHttpError(error: HttpError): never {
    console.error(error);
    throw error;
  }
}

export { HttpError, Api };
