// src/data/mockData.ts
// Datos de prueba genéricos para la app.
// TODO: reemplazar con datos de tu dominio asignado.

import type { Item } from '../types';

// ============================================
// LISTA PRINCIPAL DE ELEMENTOS
// ============================================
// Estos son datos genéricos de placeholder.
// Debes reemplazarlos con datos coherentes a tu dominio.
//
// Ejemplos:
//   Biblioteca  → libros con autor, ISBN, páginas
//   Farmacia    → medicamentos con precio, stock, dosis
//   Gimnasio    → rutinas con duración, grupos musculares
//   Restaurante → platillos con precio, ingredientes
//   Cine        → películas con director, año, género

export const ITEMS: Item[] = [
  {
    id: '1',
    name: 'Elemento 01',
    description: 'Descripción del primer elemento de tu dominio.',
    // TODO: agregar campos específicos de tu dominio
  },
  {
    id: '2',
    name: 'Elemento 02',
    description: 'Descripción del segundo elemento de tu dominio.',
    // TODO: agregar campos específicos de tu dominio
  },
  {
    id: '3',
    name: 'Elemento 03',
    description: 'Descripción del tercer elemento de tu dominio.',
    // TODO: agregar campos específicos de tu dominio
  },
  {
    id: '4',
    name: 'Elemento 04',
    description: 'Descripción del cuarto elemento de tu dominio.',
    // TODO: agregar campos específicos de tu dominio
  },
  {
    id: '5',
    name: 'Elemento 05',
    description: 'Descripción del quinto elemento de tu dominio.',
    // TODO: agregar campos específicos de tu dominio
  },
  {
    id: '6',
    name: 'Elemento 06',
    description: 'Descripción del sexto elemento de tu dominio.',
    // TODO: agregar campos específicos de tu dominio
  },
  {
    id: '7',
    name: 'Elemento 07',
    description: 'Descripción del séptimo elemento de tu dominio.',
    // TODO: agregar campos específicos de tu dominio
  },
  {
    id: '8',
    name: 'Elemento 08',
    description: 'Descripción del octavo elemento de tu dominio.',
    // TODO: agregar campos específicos de tu dominio
  },
];

// ============================================
// LISTA DE FAVORITOS
// ============================================
// Subconjunto de elementos para la pestaña Favorites.
// TODO: seleccionar elementos coherentes con tu dominio.

export const FAVORITES: Item[] = [
  ITEMS[0],
  ITEMS[2],
  ITEMS[4],
];
