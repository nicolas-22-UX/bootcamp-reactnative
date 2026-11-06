// src/screens/DetailScreen.tsx
// Pantalla de detalle: pide un proyecto al servidor con useItemById.

import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { ProjectStatus } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { useItemById } from '../hooks/useItems';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

// Texto de cada estado
const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'Activo',
  warranty: 'Garantía',
  paused: 'Pausado',
};

// ============================================================
// SUB-COMPONENTE: FieldRow (una fila "etiqueta: valor")
// ============================================================

interface FieldRowProps {
  label: string;
  value: string;
}

function FieldRow({ label, value }: FieldRowProps): React.JSX.Element {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

// ============================================================
// PANTALLA: DetailScreen
// ============================================================

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;

  // Pide el proyecto al servidor por su id
  const { data: item, isLoading, isError, refetch } = useItemById(id);

  // Estado 1: cargando
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  // Estado 2: error, con botón de reintentar
  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el detalle</Text>
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.idBadge}>ID: {id}</Text>
      </View>

      {item && (
        <View style={styles.fieldsCard}>
          <FieldRow label="Descripción" value={item.subtitle} />
          <FieldRow label="Cliente" value={item.client} />
          <FieldRow label="Estado" value={STATUS_LABEL[item.status]} />
          <FieldRow label="Entrega" value={item.deliveryDate} />
        </View>
      )}
    </ScrollView>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
  hero: { alignItems: 'center', gap: SPACING.sm },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLetter: { fontSize: 36, fontWeight: '700', color: COLORS.accent },
  title: { ...TYPOGRAPHY.h2, textAlign: 'center' },
  idBadge: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 1 },
  fieldsCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  fieldRow: { gap: SPACING.xs },
  fieldLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.8 },
  fieldValue: { ...TYPOGRAPHY.body },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
});