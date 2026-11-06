// src/navigation/types.ts
// Tipos de los parámetros de navegación del proyecto.

export type RootStackParamList = {
  // Lista principal
  Home: undefined;
  // Detalle — recibe el id y nombre para el header
  Detail: { id: string | number; name: string };
  // Formulario de creación
  Create: undefined;
};
