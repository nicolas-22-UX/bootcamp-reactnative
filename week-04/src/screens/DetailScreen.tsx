// Detalle de un proyecto: permite guardarlo o quitarlo del store global
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { PROJECTS } from '../data/mockData';
import type { HomeStackParamList } from '../navigation/types';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id } = route.params;

  // Busca el proyecto completo con el id que llegó por params
  const project = PROJECTS.find((p) => p.id === id);

  // Selectores: cada uno lee solo lo que necesita del store
  const isSaved = useSavedStore((state) =>
    state.items.some((i) => i.id === id),
  );
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  // Si el id no existe en los datos, avisa en vez de fallar
  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.field}>Proyecto no encontrado</Text>
      </View>
    );
  }

  // Si ya está guardado lo quita; si no, lo guarda
  const handleToggleSave = (): void => {
    if (isSaved) {
      removeItem(project.id);
    } else {
      addItem(project);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.name}</Text>
      <Text style={styles.field}>{project.subtitle}</Text>
      <Text style={styles.field}>Cliente: {project.client}</Text>
      <Text style={styles.field}>Estado: {project.status}</Text>
      <Text style={styles.field}>Entrega: {project.deliveryDate}</Text>

      <Pressable
        onPress={handleToggleSave}
        style={({ pressed }) => [
          styles.button,
          isSaved && styles.buttonSaved,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={[styles.buttonText, isSaved && styles.buttonTextSaved]}>
          {isSaved ? 'Quitar de guardados' : 'Guardar proyecto'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.base,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  field: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  button: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    backgroundColor: COLORS.accent,
  },
  buttonSaved: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.background,
  },
  buttonTextSaved: {
    color: COLORS.textPrimary,
  },
});