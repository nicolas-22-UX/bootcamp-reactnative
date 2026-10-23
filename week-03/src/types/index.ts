// src/types/index.ts
// Define los tipos de datos del dominio.
// Adapta la interfaz Item a tu dominio asignado.

// ============================================
// INTERFACE PRINCIPAL DEL DOMINIO
// ============================================

export interface Item {
  id: string;
  // Nombre del elemento (libro, medicamento, película, rutina, etc.)
  name: string;
  // Descripción general del elemento
  description: string;

  // TODO: agregar propiedades específicas de tu dominio
  // Ejemplos según dominio:

  // Biblioteca:
  // author: string;
  // isbn: string;
  // pages: number;
  // genre: string;

  // Farmacia:
  // price: number;
  // stock: number;
  // dosage: string;
  // requiresPrescription: boolean;

  // Gimnasio:
  // duration: number;   // en minutos
  // difficulty: 'basic' | 'intermediate' | 'advanced';
  // muscleGroups: string[];

  // Restaurante:
  // price: number;
  // ingredients: string[];
  // isVegetarian: boolean;
  // category: string;

  // Cine:
  // director: string;
  // year: number;
  // genre: string;
  // duration: number;
}
