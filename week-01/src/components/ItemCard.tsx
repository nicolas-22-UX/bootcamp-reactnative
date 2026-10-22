import react from "react";
import {View, Text, Image, Pressable, StyleSheet, ViewStyle } from "react-native";
import { Project, ProjectStatus } from "../types";

interface ItemCardProps {
  item: Project;
  onPress: (item: Project) => void;
}

//texto en español que se muestra en la tarjeta según el estado del proyecto
const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: "En desarrollo",
  warranty: "En garantía",
  paused: "En pausa",
};

//tarjeta de un projecto: imagen arriba y los datos debajo. Al presionar la tarjeta, se ejecuta la función onPress con el proyecto como argumento.
export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={() => onPress(item)}>
      <Image source={{ uri: item.imageUri }} style={styles.image} resizeMode="cover" />
      <View style={styles.body}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>

        {/*fila: cliente a la izquierda, estado a la drecha*/}
        <View style={styles.row}>
          <Text style={styles.client}>{item.client}</Text>
          <View style={[styles.badge, STATUS_STYLES[item.status]]}>
            <Text style={styles.badgeText}>{STATUS_LABELS[item.status]}</Text>
          </View>
        </View>

      <Text style={styles.date}>Entrega: {item.deliveryDate}</Text>
      </View>
    </Pressable>
  );
}
          
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161b22",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#30363d",
  },
  cardPressed: {
    opacity: 0.7,
  },
  image: {
    width: "100%",
    height: 160,
  },
  body: {
    padding: 16,
    gap: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    color: "#8b949e",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  client: {
    fontSize: 14,
    color: "#c9d1d9",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
  date: {
    fontSize: 12,
    color: "#8b949e",
  },
    badgeActive: { backgroundColor: "#2ea043" },
  badgeWarranty: { backgroundColor: "#1f6feb" },
  badgePaused: { backgroundColor: "#9e6a03" },
});

// Color de la etiqueta según el estado. Va después de los estilos porque los usa.
const STATUS_STYLES: Record<ProjectStatus, ViewStyle> = {
  active: styles.badgeActive,
  warranty: styles.badgeWarranty,
  paused: styles.badgePaused,
};

