import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Project } from "../types";
import { ItemCard } from "../components/ItemCard";
import { MOCK_ITEMS } from "../data/mockData";

//textos del encabezado, propios de mi dominio.

const DOMAIN_TITLE = 'Proyectos de Software';
const DOMAIN_SUBTITLE = 'Panel de proyectos de la empresa';

export function HomeScreen(): React.JSX.Element {
  // se ejecuta al presionar una tarjeta. En la semana 3 aqui navegaremos al detalle del proyecto, pero por ahora solo mostramos un alert con el nombre del proyecto.
  function handleItemPress(item: Project): void {
    Alert.alert(item.name, `Cliente: ${item.client}`);
  }

 return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      {/* Encabezado con el nombre del dominio */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
        <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
      </View>

      {/* Lista con scroll: una tarjeta por cada proyecto */}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_ITEMS.map((item) => (
          <ItemCard key={item.id} item={item} onPress={handleItemPress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0d1117",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#8b949e",
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});
