// src/hooks/useItems.ts
// Hooks de datos de proyectos (TanStack Query + Axios)

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../services/api';
import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from '../types';

// Una sola llave para todo: evita typos al invalidar el caché
export const ITEMS_QUERY_KEY = ['projects'] as const;

// READ: lista de proyectos
export function useItems() {
  return useQuery<Project[], Error>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Project[]>('/projects');
      return data;
    },
  });
}

// READ: un proyecto por id (lo usa el formulario Edit)
export function useItemById(id: string | number) {
  return useQuery<Project, Error>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<Project>(`/projects/${id}`);
      return data;
    },
    // Solo corre si hay un id válido
    enabled: !!id,
  });
}

// CREATE: crear un proyecto (POST)
export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, CreateProjectPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<Project>('/projects', payload);
      return data;
    },
    onSuccess: () => {
      // Invalida la lista para que se vuelva a pedir al servidor
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}

// UPDATE: editar un proyecto (PUT)
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, UpdateProjectPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.put<Project>(
        `/projects/${payload.id}`,
        payload,
      );
      return data;
    },
    onSuccess: (_, variables) => {
      // Invalida la lista y el proyecto individual
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: [...ITEMS_QUERY_KEY, variables.id],
      });
    },
  });
}