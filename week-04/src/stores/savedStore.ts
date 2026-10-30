// Store de Zustand: una "caja" global con los proyectos guardados.
import { create } from 'zustand';
import type { Project } from '../types';

// Forma de la caja: el estado (items) y las acciones que lo cambian
interface SavedStore {
  items: Project[];
  addItem: (item: Project) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  isItemSaved: (id: string) => boolean;
}

// create devuelve un hook. set cambia el estado, get lo lee.
export const useSavedStore = create<SavedStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    // si ya está guardado, no hace nada (evita duplicados)
    if (get().items.some((i) => i.id === item.id)) return;
    // copia el array y agrega el nuevo (nunca se modifica el original)
    set((state) => ({ items: [...state.items, item] }));
  },

  removeItem: (id) => {
    // deja todos menos el que tiene ese id
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  clearAll: () => set({ items: [] }),

  isItemSaved: (id) => get().items.some((i) => i.id === id),
}));