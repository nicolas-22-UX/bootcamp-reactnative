// src/types/index.ts
// Tipos del dominio: empresa de proyectos de software

// Los 3 estados posibles de un proyecto
export type ProjectStatus = 'active' | 'warranty' | 'paused';

// Modelo principal: un proyecto tal como lo devuelve la API
export interface Project {
  id: string | number; // lo asigna el servidor
  name: string;
  subtitle: string;
  client: string;
  status: ProjectStatus;
  deliveryDate: string;
  budget?: number; // presupuesto en USD (nuevo en semana 6)
}

// Lo que se envía en el POST: el proyecto sin 'id'
export type CreateProjectPayload = Omit<Project, 'id'>;

// Lo que se envía en el PUT: id obligatorio + campos editables
export type UpdateProjectPayload = Project;