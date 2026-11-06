// src/services/api.ts
// Instancia Axios centralizada para el proyecto.
// TODO: configurar la baseURL de tu API real.

import axios from 'axios';

// ============================================================
// BASE URL
// ============================================================
// TODO: reemplaza esta URL por la de tu API del dominio.
// Opciones rápidas para practicar:
//   - JSONPlaceholder: https://jsonplaceholder.typicode.com  (solo /posts, /users, etc.)
//   - MockAPI: https://mockapi.io  (crea tu propio endpoint con los campos de tu dominio)
//   - json-server: instala localmente y corre con `pnpm dlx json-server db.json`

// Expo expone variables de entorno con prefijo EXPO_PUBLIC_
// ej. en .env.local: EXPO_PUBLIC_API_URL=https://tu-api.com
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ============================================================
// INTERCEPTOR DE RESPUESTA — manejo global de errores
// ============================================================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // log de red para debugging en desarrollo
    if (__DEV__) {
      console.error('[API Error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  }
);
