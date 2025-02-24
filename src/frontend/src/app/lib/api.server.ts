import { Api, HttpError } from './api';
import { cookies } from 'next/headers';
import { redirect, forbidden } from 'next/navigation';

const api = new Api(`${process.env.API_HOST}/api`);

api.createFetchOptions = async (method: string, body?: unknown): Promise<any> => {
  const cookieStore = await cookies();
  const options: any = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `access_token=${cookieStore.get('access_token')?.value}`
    },
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
}

api.handleHttpError = (error: HttpError): never => {
  const status = error.status;
  if (status === 401) {
    redirect('login');
  } else if (status === 403) {
    forbidden();
  }
  throw error;
}

export { api };
