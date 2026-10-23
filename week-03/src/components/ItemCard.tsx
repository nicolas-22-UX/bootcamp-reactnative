import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Project, ProjectStatus } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

interface ItemCardProps {
  item: Project;
  onPress: (item: Project) => void;
}

// Texto y color del badge según el estado del proyecto.
const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'En desarrollo',
  warranty: 'En garantía',
  paused: 'En pausa',
};

const STATUS_COLORS: Record<ProjectStatus, string> = {
  active: COLORS.success,
  warranty: COLORS.info,
  paused: COLORS.warning,
};

// Tarjeta reutilizable: muestra un proyecto y avisa cuando la tocan.
export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.fieldText}>{item.subtitle}</Text>
      <Text style={styles.fieldText}>Cliente: {item.client}</Text>
      <Text style={styles.fieldText}>Entrega: {item.deliveryDate}</Text>

      <View style={styles.badge}>
        <Text style={[styles.badgeText, { color: STATUS_COLORS[item.status] }]}>
          {STATUS_LABELS[item.status]}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  fieldText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceAlt,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
});