// Pantalla principal: lista de proyectos que navega al detalle.
import React from 'react';
import { FlatList, StyleSheet, View, type ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ItemCard } from '../components/ItemCard';
import { PROJECTS } from '../data/mockData';
import type { HomeStackParamList } from '../navigation/types';
import { COLORS, SPACING } from '../theme';
import type { Project } from '../types';

// Tipo de navigation: solo conoce las pantallas del stack de Home
type HomeNavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();

  // Dibuja cada proyecto con la tarjeta; al tocarla va al detalle con id y name
  const renderItem: ListRenderItem<Project> = ({ item }) => (
    <ItemCard
      item={item}
      onPress={(project) =>
        navigation.navigate('HomeDetail', { id: project.id, name: project.name })
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PROJECTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingBottom: SPACING.xl,
  },
});