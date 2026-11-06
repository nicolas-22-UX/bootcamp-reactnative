// src/screens/CreateScreen.tsx
// Pantalla para crear un proyecto nuevo (POST con useMutation).

import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { ProjectStatus } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { useCreateItem } from '../hooks/useItems';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

// Opciones del selector de estado
const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'active', label: 'Activo' },
  { value: 'warranty', label: 'Garantía' },
  { value: 'paused', label: 'Pausado' },
];

// PANTALLA: CreateScreen


export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  // Un estado por cada campo del formulario
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('active');
  const [deliveryDate, setDeliveryDate] = useState('2026-12-01');

  // La mutación: mutate envía el POST, isPending dice si va en camino
  const { mutate: createItem, isPending, isError, error } = useCreateItem();

  function handleSubmit(): void {
    if (!name.trim()) return;

    createItem(
      {
        name: name.trim(),
        subtitle: subtitle.trim(),
        client: client.trim(),
        status,
        deliveryDate: deliveryDate.trim(),
      },
      {
        // Se ejecuta cuando el POST salió bien: volvemos a la lista
        onSuccess: () => navigation.goBack(),
      },
    );
  }

  const canSubmit = name.trim().length > 0 && !isPending;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>Datos del nuevo proyecto</Text>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Nombre <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nombre del proyecto…"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Descripción corta</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={subtitle}
            onChangeText={setSubtitle}
            placeholder="De qué trata el proyecto…"
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Cliente</Text>
          <TextInput
            style={styles.input}
            value={client}
            onChangeText={setClient}
            placeholder="Nombre del cliente…"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Estado</Text>
          <View style={styles.row}>
            {STATUS_OPTIONS.map((option) => (
              <Pressable
                key={option.value}
                style={[styles.chip, status === option.value && styles.chipActive]}
                onPress={() => setStatus(option.value)}
              >
                <Text
                  style={[
                    styles.chipText,
                    status === option.value && styles.chipTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Fecha de entrega (AAAA-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={deliveryDate}
            onChangeText={setDeliveryDate}
            placeholder="2026-12-01"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        {/* Si el POST falla, se muestra el mensaje */}
        {isError && <Text style={styles.errorText}>Error: {error.message}</Text>}

        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text style={styles.buttonText}>Crear proyecto</Text>
          )}
        </Pressable>

        <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ESTILOS


const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  sectionLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.8 },
  field: { gap: SPACING.xs },
  fieldLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  required: { color: COLORS.error },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  multiline: { minHeight: 80, paddingTop: SPACING.sm },
  row: { flexDirection: 'row', gap: SPACING.sm },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  chipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { ...TYPOGRAPHY.caption },
  chipTextActive: { color: COLORS.background, fontWeight: '700' },
  errorText: { ...TYPOGRAPHY.caption, color: COLORS.error },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
