// Estados posibles de un proyecto: en construcción, en garantía o en pausa.
// Con este tipo, TypeScript solo acepta uno de estos tres textos.
export type ProjectStatus = 'active' | 'warranty' | 'paused';

// Forma de un proyecto de la empresa. Todas las pantallas usan este contrato.
export interface Project {
  id: string;
  name: string;
  subtitle: string; // descripción corta del proyecto
  imageUri: string; // URL de la imagen de la tarjeta
  client: string; // empresa para la que se construye
  status: ProjectStatus;
  deliveryDate: string; // fecha proyectada de entrega, formato '2026-12-15'
}
