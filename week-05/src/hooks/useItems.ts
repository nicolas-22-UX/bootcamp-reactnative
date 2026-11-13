// src/hooks/useItems.ts
// Hooks que encapsulan el fetching de proyectos (TanStack Query + axios).
// Los componentes usan estos hooks, no llaman a apiClient directamente.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateProjectPayload, Project } from '../types';

// QUERY KEY
// una sola llave para todos: evita typos al invalidar
export const ITEMS_QUERY_KEY = ['projects'] as const;

// useItems: obtener la lista de proyectos
export function useItems() {
  return useQuery<Project[], Error>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Project[]>('/projects');
      return data;
    },
  });
}

// useItemById: obtener un proyecto por id
export function useItemById(id: string | number) {
  return useQuery<Project, Error>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<Project>(`/projects/${id}`);
      return data;
    },
    // solo corre si hay un id valido
    enabled: !!id,
  });
}

// useCreateItem: crear un proyecto nuevo (POST)
export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, CreateProjectPayload>({
    mutationFn: async (payload) => {
      // mockapi devuelve el proyecto completo, con el id nuevo
      const { data } = await apiClient.post<Project>('/projects', payload);
      return data;
    },
    onSuccess: () => {
      // invalida el cache: TanStack Query vuelve a pedir la lista
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Failed to create project:', error.message);
    },
  });
}

// useDeleteItem: eliminar un proyecto (extra)
export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}