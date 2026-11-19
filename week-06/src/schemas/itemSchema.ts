// src/schemas/itemSchema.ts
// Schema Zod del formulario de proyecto (Create y Edit)

import { z } from 'zod';

export const itemSchema = z.object({
  // Nombre del proyecto: obligatorio
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'Máx. 80 caracteres'),

  // Descripción corta: opcional
  subtitle: z.string().trim().max(200, 'Máx. 200 caracteres'),

  // Cliente: obligatorio
  client: z.string().trim().min(2, 'El cliente es requerido'),

  // Fecha de entrega: formato AAAA-MM-DD
  deliveryDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Usa el formato AAAA-MM-DD'),

  // Presupuesto: el TextInput da texto, coerce lo convierte a número
  budget: z.coerce
    .number({ message: 'Escribe un número válido' })
    .positive('El presupuesto debe ser mayor que 0'),
});

// El tipo TypeScript se infiere del schema: sin interfaz duplicada
export type ItemFormData = z.infer<typeof itemSchema>;