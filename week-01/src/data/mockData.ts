import { Project } from '../types';

// Datos de ejemplo para probar la app. Más adelante vendrán de un servidor.
// Las imágenes salen de picsum.photos: la parte "seed" fija cuál se muestra.
export const MOCK_ITEMS: Project[] = [
  {
    id: '1',
    name: 'Plataforma de Pagos',
    subtitle: 'App móvil y API para pagos entre comercios',
    imageUri: 'https://picsum.photos/seed/project1/300/200',
    client: 'Banco Andino',
    status: 'active',
    deliveryDate: '2026-12-15',
  },
  {
    id: '2',
    name: 'Portal de Citas Médicas',
    subtitle: 'Sistema web para agendar y gestionar citas',
    imageUri: 'https://picsum.photos/seed/project2/300/200',
    client: 'Clínica del Valle',
    status: 'active',
    deliveryDate: '2027-01-30',
  },
  {
    id: '3',
    name: 'Tienda en Línea',
    subtitle: 'Comercio electrónico con inventario y pasarela de pago',
    imageUri: 'https://picsum.photos/seed/project3/300/200',
    client: 'Moda Urbana',
    status: 'warranty',
    deliveryDate: '2026-11-05',
  },
  {
    id: '4',
    name: 'Control de Flotas',
    subtitle: 'Panel para seguir vehículos en tiempo real',
    imageUri: 'https://picsum.photos/seed/project4/300/200',
    client: 'Transportes Sol',
    status: 'paused',
    deliveryDate: '2027-03-20',
  },
];
