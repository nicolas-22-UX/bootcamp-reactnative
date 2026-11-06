// src/types/index.ts
// Interfaces del dominio del proyecto.
// TODO: adaptar los campos a tu dominio asignado.

// ============================================================
// MODELO PRINCIPAL — Item
// ============================================================
// Este es el modelo genérico del recurso de tu dominio.
// Reemplaza o extiende esta interfaz con los campos reales de tu API.
//
// Ejemplos por dominio:
//   Biblioteca  → Book:   { id, title, author, year, isbn }
//   Farmacia    → Product:{ id, name, price, stock, category }
//   Restaurante → Dish:   { id, name, price, category, spiceLevel }
//   Cine        → Movie:  { id, title, director, duration, genre }

export interface Item {
  id: string | number;
  // TODO: renombra este campo según tu dominio (title, name, etc.)
  name: string;
  // TODO: agrega campos específicos de tu dominio
  // Ejemplo (Biblioteca):
  //   author: string;
  //   year: number;
  //   isbn?: string;
  // Ejemplo (Farmacia):
  //   price: number;
  //   stock: number;
  //   prescription: boolean;
  description?: string;
}

// ============================================================
// PAYLOAD DE CREACIÓN
// ============================================================
// Lo que se envía en el POST para crear un nuevo ítem.
// Generalmente es el modelo sin el campo `id` (lo asigna el servidor).

export type CreateItemPayload = Omit<Item, 'id'>;
