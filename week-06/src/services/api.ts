// instancia de AXIOS: todas las peticiones salen aqui 

import axios from 'axios';

//direccion base de la api (mockapi de tu dominio)
//se puede cambiar con expo_public_api_url

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

// Interceptor de respuesta: manejo global de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log de red solo en desarrollo
    if (__DEV__) {
      console.error('[API error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  },
);