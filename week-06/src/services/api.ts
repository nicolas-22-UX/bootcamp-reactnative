// src/services/api.ts — Instancia centralizada de Axios

import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor global de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error('[API error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  },
);
