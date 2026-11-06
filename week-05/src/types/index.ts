// tipos del dominio: empresa de proyectos de software 

// los 3 estados posibles de un proyecto
export type ProjectStatus = 'active' | 'warranty' | 'paused';

//modelo principal: un proyecto tal como lo devuelve la API
export interface Project {
  id: string | number; // lo asigna el servidor
  name: string;
  subtitle: string;
  client: string;
  status: ProjectStatus;
  deliveryDate: string;
}

// lo que se envia en el POST: el proyecto sin 'id'
export type CreateProjectPayload = Omit<Project, 'id'>;