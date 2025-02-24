import { Api, HttpError } from './api';

const api = new Api(`${process.env.NEXT_PUBLIC_API_HOST}/api`);

api.handleHttpError = (error: HttpError): never => {
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

export { api };
