//src/services/api.ts
//Instancia Axios Centraliza: todas las peticiones salen de aqui.

import { infiniteQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

//direcion base de la Api 
//se puede cambiar con EXPO_PUBLIC_API_URL en .env.local

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  'https://6af74c97e844c7ff741c5a08.mockapi.io';

  export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10_000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  //INTERCEPTOR DE RESPUESTA: manejo global de errores 
  apiClient.interceptors.response.use(
    (Response) => Response,
    (error) => {
      //log de red para debugging en desarrollo
      if (__DEV__) {
        console.error('[API Error]', error.response?.status, error.config?.url);
      }
      return Promise.reject(error);
    }
  );