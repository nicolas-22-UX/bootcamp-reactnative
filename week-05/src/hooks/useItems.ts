//hooks que encapsula el fetching de proyectos. 
// los componentes usan estos hooks, no llaman a apiClient directamente.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { CreateProjectPayload, Project, ProjectStatus } from '../types';

//QUERY KEY
// una sola llave para todos: evita typos al invalidar 
export const ITEMS_QUERY_KEY = ['projects'] as const;

//ADAPTADOR: post de JSONplaceholder -> PROJECT

//JSONplaceholder devuelve posts (id, title, body, userId).
//los convertimos a la forma de nuestro dominio 

interface PostDTO {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const STATUSES: ProjectStatus[] = ['active', 'warranty', 'paused'];

function toProject(post: PostDTO): Project {
  return {
    id: post.id,
    name: post.title,
    subtitle: post.body,
    client: `Client ${post.userId}`,
    status: STATUSES[post.id % 3],
    deliveryDate: new Date().toISOString(),
  };
}

//useItems: obtener la lista de proyectos
export function useItems() {
  return useQuery<Project[], Error>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<PostDTO[]>('/posts?_limit=15');
      return data.map(toProject);
    },
  });
}

//useItemByID: obtener un proyecto por id
export function useItemById(id: string | number) {
  return useQuery<Project>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<PostDTO>(`/posts/${id}`);
      return toProject(data);
    },
    //solo corre si hay un id valido
    enabled: !!id,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, CreateProjectPayload>({
    mutationFn: async (payload) => {
      // El servidor solo nos devuelve el id nuevo
      const { data } = await apiClient.post<{ id: number }>('/posts', payload);
      // Armamos el Project completo: datos enviados + id del servidor
      return { ...payload, id: data.id };
    },
    onSuccess: () => {
      // Invalida el cache: TanStack Query vuelve a pedir la lista
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
      await apiClient.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}

