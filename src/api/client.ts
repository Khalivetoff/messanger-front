import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import router from '@/router';
import { cookies } from '@/utils/cookies.util';

const axiosConfigs: AxiosRequestConfig = {
  timeout: 600000,
  baseURL: process.env.VUE_APP_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params, {
    arrayFormat: 'repeat',
    skipNulls: true,
  }),
};

const redirectToBasePage = (): void => {
  router?.push('/');
};

const handleError = (error: AxiosError): void => {
  switch (error?.response?.status) {
    case 401:
    case 404:
      redirectToBasePage();
      break;
    case 403:
      if (error?.config?.method?.toUpperCase() === 'GET') {
        redirectToBasePage();
      }
      break;
    default:
      break;
  }
  throw error;
};

const client = axios.create(axiosConfigs);

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    handleError(error);
  },
);

client.interceptors.request.use((config: AxiosRequestConfig) => {
  let token: string | undefined = '';
  const isAuthInterceptorEnabled = JSON.parse('true');

  if (isAuthInterceptorEnabled) {
    token = cookies.getCookie('token');
  }

  if (token && config.headers) {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return config;
});

export default client;
