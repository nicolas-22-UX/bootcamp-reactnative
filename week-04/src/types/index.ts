// src/types/index.ts
// Interface principal del dominio.
// TODO: adaptar a tu dominio asignado.

export interface Item {
  id: string;
  name: string;
  description: string;
  // TODO: agregar campos específicos de tu dominio
  // Biblioteca:   author: string; isbn: string; pages: number;
  // Farmacia:     price: number; stock: number; dosage: string;
  // Gimnasio:     duration: number; difficulty: 'basic' | 'intermediate' | 'advanced';
  // Restaurante:  price: number; category: string; isVegetarian: boolean;
  // Cine:         director: string; year: number; genre: string;
}
