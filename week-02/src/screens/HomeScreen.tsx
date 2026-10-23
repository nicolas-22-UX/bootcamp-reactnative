import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  ListRenderItem,
} from 'react-native';
import { Project } from '../types';
import { PROJECTS } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

// Al tocar una tarjeta mostramos el cliente del proyecto.
function handleProjectPress(project: Project): void {
  Alert.alert(project.name, `Cliente: ${project.client}`);
}

// Línea fina que separa una tarjeta de otra.
function ItemSeparator(): React.JSX.Element {
  return <View style={styles.separator} />;
}

export function HomeScreen(): React.JSX.Element {
  // Texto que el usuario escribe en el buscador.
  const [query, setQuery] = useState<string>('');

  // Filtra por nombre o cliente. useMemo evita recalcular si query no cambia.
  const filteredProjects = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (text === '') {
      return PROJECTS;
    }
    return PROJECTS.filter(
      (project) =>
        project.name.toLowerCase().includes(text) ||
        project.client.toLowerCase().includes(text),
    );
  }, [query]);

  // Mensaje que se ve cuando la búsqueda no encuentra nada.
  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Sin resultados para "{query}"</Text>
        <Text style={styles.emptySubText}>
          Prueba con otro nombre de proyecto o de cliente.
        </Text>
      </View>
    ),
    [query],
  );

  // Dibuja cada tarjeta. useCallback evita crear la función en cada render.
  const renderItem: ListRenderItem<Project> = useCallback(
    ({ item }) => <ItemCard item={item} onPress={handleProjectPress} />,
    [],
  );

  return (
    <KeyboardAvoidingView
      style={styles.kvContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>Proyectos de Software</Text>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar proyecto o cliente..."
              placeholderTextColor={COLORS.textMuted}
              value={query}
              onChangeText={setQuery}
              keyboardType="default"
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>

          <FlatList
            data={filteredProjects}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kvContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
  },
  searchContainer: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  separator: {
    height: 1,
    marginHorizontal: SPACING.base,
    backgroundColor: COLORS.borderLight,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: SPACING.xxl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});