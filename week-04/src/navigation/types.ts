// src/navigation/types.ts
// Tipos de parámetros para los navigators del proyecto.

export type RootTabParamList = {
  Home: undefined;
  Saved: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  // TODO: agrega campos extra según tu dominio
  // Ejemplo (Biblioteca):  author: string; isbn: string;
  // Ejemplo (Cine):        director: string; year: number;
  HomeDetail: {
    id: string;
    name: string;
  };
};
