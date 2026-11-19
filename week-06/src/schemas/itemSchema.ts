// src/schemas/itemSchema.ts
// Schema Zod para el formulario de ítem.
// TODO: adaptar los campos a tu dominio asignado.

import { z } from 'zod';

export const itemSchema = z.object({
  // TODO: renombra y ajusta los campos a tu dominio
  // Ejemplos:
  // Biblioteca  → title (título del libro), author (autor), pages (z.coerce.number)
  // Farmacia    → name (nombre), price (z.coerce.number), stock (z.coerce.number)
  // Restaurante → name (platillo), description, price (z.coerce.number)

  title: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(80, 'Máx. 80 caracteres'),

  body: z
    .string()
    .max(500, 'Máx. 500 caracteres')
    .optional()
    .or(z.literal('')),

  // TODO: agrega campos numéricos con z.coerce.number()
  // Ejemplo:
  // price: z.coerce.number().positive('El precio debe ser mayor que 0'),
});

// El tipo TypeScript se infiere automáticamente — sin interfaz duplicada
export type ItemFormData = z.infer<typeof itemSchema>;
