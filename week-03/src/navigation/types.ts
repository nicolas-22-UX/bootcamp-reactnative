//src/navigation/types.ts
// Tipos de params de cada navigator

import type { Project } from "../types";

//pestañas de la raíz

export type RootTabParamList = {
  Home: undefined; //pestaña con Stack interno
  Favorites: undefined;
};

//Stack dentro de la pestaña Home 
export type HomeStackParamList = {
  HomeList: undefined;
  //el detalle recibe el proyecto completo
  HomeDetail: Project;
}