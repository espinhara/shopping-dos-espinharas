import axios from 'axios'
const getApiUrl = (): string => {
  const localApi = process.env.REACT_APP_LOCAL_API as string;
  const nodeApi = process.env.REACT_APP_HOST_API as string;
  const isProd = process.env.REACT_APP_NODE_ENV === "production";
  const baseUrl = isProd ? nodeApi : localApi;
  return baseUrl;
};

export const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    Authorization: `Bearer ${localStorage?.token}`,
    'Content-Type': 'application/json',
  }
});

