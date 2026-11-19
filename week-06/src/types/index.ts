// src/types/index.ts
// Tipos de datos del dominio — adapta los campos a tu dominio asignado

export interface Item {
  id: number;
  title: string;   // TODO: renombrar al concepto de tu dominio (ej. name, productName)
  body: string;    // TODO: renombrar (ej. description, notes)
  userId: number;
}

// Payload para crear un ítem nuevo (sin id — lo asigna el servidor)
export interface CreateItemPayload {
  title: string;
  body: string;
  userId: number;
}

// Payload para actualizar (id requerido + campos editables)
export interface UpdateItemPayload {
  id: number;
  title: string;
  body: string;
}
