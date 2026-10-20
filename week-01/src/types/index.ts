// ============================================================
// TYPES — src/types/index.ts
// ============================================================
// Define aquí la interfaz del elemento de tu dominio asignado.
// Este type se usará en mockData.ts, ItemCard.tsx y HomeScreen.tsx
// ============================================================

// TODO: Renombra esta interfaz con el nombre de tu elemento
// Ejemplos: Book, Medication, Member, Dish, Movie, Destination
export interface Item {
  id: string;
  name: string;
  imageUri: string;
  // TODO: Agrega las propiedades específicas de tu dominio
  // Ejemplos:
  //   Biblioteca → author: string; year: number;
  //   Farmacia → activeIngredient: string; price: number;
  //   Gimnasio → plan: string; expiresAt: string;
  //   Restaurante → price: number; description: string;
  subtitle: string; // campo genérico de apoyo — personaliza según tu dominio
}
