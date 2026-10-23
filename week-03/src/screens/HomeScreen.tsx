// src/screens/HomeScreen.tsx
// Lista de proyectos. Al tocar una tarjeta va al detalle.

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, View } from 'react-native';

import { ItemCard } from '../components/ItemCard';
import { PROJECTS } from '../data/mockData';
import type { HomeStackParamList } from '../navigation/types';
import { COLORS } from '../theme';
import type { Project } from '../types';

// Tipo del hook de navegación de este Stack
type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeList'
>;

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Pasa el proyecto completo como params al detalle
  function handleItemPress(item: Project): void {
    navigation.navigate('HomeDetail', item);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={PROJECTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={handleItemPress} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});