// src/navigation/types.ts
// Tipado del stack de navegación

export type RootStackParamList = {
  Home:   undefined;
  Create: undefined;
  Edit:   { id: number | string; name: string };
};
