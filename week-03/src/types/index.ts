//estados posibles de un proyecto: en construccion, em garantia o en pausa
export type ProjectStatus = 'active' | 'warranty' | 'paused';

//forma de un proyecto de la empresa. Todas las pantallas usan este contrato.
export interface Project {
    id: string;
    name: string;
    subtitle: string;
    client: string;
    status: ProjectStatus;
    deliveryDate: string; //formato '2026-12-15'
}