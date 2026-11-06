// src/screens/HomeScreen.tsx
// Pantalla principal: lista de proyectos cargada desde la API.

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Project, ProjectStatus } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { useItems } from '../hooks/useItems';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Texto y color de cada estado
const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'Activo',
  warranty: 'Garantía',
  paused: 'Pausado',
};

const STATUS_COLOR: Record<ProjectStatus, string> = {
  active: COLORS.success,
  warranty: COLORS.warning,
  paused: COLORS.textMuted,
};

// SUB-COMPONENTE: ProjectCard

interface ProjectCardProps {
  item: Project;
  onPress: () => void;
}

function ProjectCard({ item, onPress }: ProjectCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={2}>
          {item.subtitle}
        </Text>
        <Text style={styles.cardClient}>{item.client}</Text>
      </View>
      <Text style={[styles.badge, { color: STATUS_COLOR[item.status] }]}>
        {STATUS_LABEL[item.status]}
      </Text>
    </Pressable>
  );
}


// PANTALLA: HomeScreen


export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();
  const { data, isLoading, isError, isFetching, refetch, error } = useItems();

  // Estado 1: cargando (solo el primer fetch)
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.message}>Cargando...</Text>
      </View>
    );
  }

  // Estado 2: error, con botón de reintentar
  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar</Text>
        <Text style={styles.message}>{error?.message}</Text>
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem: ListRenderItem<Project> = ({ item }) => (
    <ProjectCard
      item={item}
      onPress={() => navigation.navigate('Detail', { id: item.id, name: item.name })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        // Estado 3: lista vacía
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.message}>No hay proyectos todavía</Text>
          </View>
        }
        // Extra: pull-to-refresh
        onRefresh={() => refetch()}
        refreshing={isFetching}
      />
      <Pressable style={styles.button} onPress={() => navigation.navigate('Create')}>
        <Text style={styles.buttonText}>Nuevo proyecto</Text>
      </Pressable>
    </View>
  );
}

// ESTILOS


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.md },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    gap: SPACING.sm,
    padding: SPACING.lg,
  },
  list: { gap: SPACING.sm, paddingBottom: SPACING.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  cardContent: { flex: 1, gap: SPACING.xs },
  cardTitle: { ...TYPOGRAPHY.h3 },
  cardSubtitle: { ...TYPOGRAPHY.caption },
  cardClient: { ...TYPOGRAPHY.label },
  badge: { ...TYPOGRAPHY.label },
  message: { ...TYPOGRAPHY.caption, textAlign: 'center' },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
});