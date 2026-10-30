// src/screens/DetailScreen.tsx
// Pantalla de detalle: muestra la información completa de un ítem
// y permite guardarlo / quitarlo usando el store de Zustand.
// Esta pantalla demuestra cómo acceder al store desde cualquier screen.

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

// TODO: importar el store y el tipo Item
// import { useSavedStore } from '../stores/savedStore';
// import type { Item } from '../types';
// import { ITEMS } from '../data/mockData';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

// ============================================================
// PANTALLA: DetailScreen
// ============================================================

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;

  // TODO: buscar el ítem completo en ITEMS usando el id de params
  // const item: Item | undefined = ITEMS.find((i) => i.id === id);

  // ──────────────────────────────────────────────────────────
  // TODO: obtener los selectores del savedStore
  // ──────────────────────────────────────────────────────────
  // Usar selectores individuales para evitar re-renders innecesarios:
  //
  // const isItemSaved = useSavedStore((state) => state.isItemSaved);
  // const addItem    = useSavedStore((state) => state.addItem);
  // const removeItem = useSavedStore((state) => state.removeItem);
  //
  // Luego calcular si el ítem actual está guardado:
  // const isSaved = isItemSaved(id);

  // Placeholder hasta que el store esté implementado
  const isSaved = false;

  // TODO: implementar handleToggleSave
  // Si el ítem está guardado → removeItem(id)
  // Si no está guardado → addItem(item)  [necesitas el objeto Item completo]
  const handleToggleSave = (): void => {
    // TODO: implementar
    // if (isSaved) {
    //   removeItem(id);
    // } else if (item) {
    //   addItem(item);
    // }
  };

  return (
    <View style={styles.container}>
      {/* Icono / thumbnail del ítem */}
      <View style={styles.hero}>
        <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
      </View>

      {/* Información principal */}
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.id}>ID: {id}</Text>

        {/* TODO: mostrar la descripción del ítem (item.description) */}
        {/* TODO: mostrar campos específicos de tu dominio */}
        <Text style={styles.description}>
          Adapta esta pantalla a tu dominio: muestra los detalles
          relevantes de tu ítem aquí.
        </Text>
      </View>

      {/* ──────────────────────────────────────────────────── */}
      {/* BOTÓN GUARDAR / QUITAR — conectado al store Zustand  */}
      {/* ──────────────────────────────────────────────────── */}
      {/* Este botón demuestra el estado compartido entre pantallas:
          al guardar aquí, el badge del Tab "Guardados" se actualiza
          automáticamente sin necesidad de pasar props ni callbacks. */}
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          isSaved && styles.saveButtonActive,
          pressed && styles.saveButtonPressed,
        ]}
        onPress={handleToggleSave}
        testID="save-button"
      >
        <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
          {isSaved ? '★  Guardado' : '☆  Guardar'}
        </Text>
      </Pressable>
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  hero: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroLetter: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.accent,
  },
  info: {
    gap: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.h2,
  },
  id: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginTop: SPACING.sm,
  },
  saveButton: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  saveButtonPressed: {
    opacity: 0.7,
  },
  saveButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  saveButtonTextActive: {
    color: COLORS.background,
  },
});
