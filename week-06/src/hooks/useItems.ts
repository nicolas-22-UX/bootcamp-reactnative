// src/hooks/useItems.ts
// Custom hooks para CRUD de ítems usando TanStack Query + Axios

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../services/api';
import type { CreateItemPayload, Item, UpdateItemPayload } from '../types';

export const ITEMS_QUERY_KEY = ['items'] as const;

// ─────────────────────────────────────────
// READ — lista de ítems
// ─────────────────────────────────────────

export function useItems() {
  return useQuery<Item[]>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: () => apiClient.get<Item[]>('/posts?_limit=15').then(r => r.data),
  });
}

// ─────────────────────────────────────────
// READ — ítem individual (para formulario Edit)
// ─────────────────────────────────────────

export function useItemById(id: number | string) {
  return useQuery<Item>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: () => apiClient.get<Item>(`/posts/${id}`).then(r => r.data),
    enabled: !!id,
  });
}

// ─────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, CreateItemPayload>({
    mutationFn: (payload) =>
      apiClient.post<Item>('/posts', payload).then(r => r.data),
    onSuccess: () => {
      // Invalidar la lista para que se refresque automáticamente
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}

// ─────────────────────────────────────────
// UPDATE — para el formulario Edit
// ─────────────────────────────────────────

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, UpdateItemPayload>({
    mutationFn: (payload) =>
      apiClient.put<Item>(`/posts/${payload.id}`, payload).then(r => r.data),
    onSuccess: (_, variables) => {
      // Invalidar lista e ítem individual
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...ITEMS_QUERY_KEY, variables.id] });
    },
  });
}
