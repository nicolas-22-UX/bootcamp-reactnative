// src/screens/FavoritesScreen.tsx
// Segunda pestaña: lista de proyectos favoritos.

import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ItemCard } from '../components/ItemCard';
import { FAVORITES } from '../data/mockData';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

export function FavoritesScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={FAVORITES}
        keyExtractor={(item) => item.id}
        // por ahora tocar un favorito no hace nada
        renderItem={({ item }) => <ItemCard item={item} onPress={() => {}} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes favoritos todavía</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
  },
});