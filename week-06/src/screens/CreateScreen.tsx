// src/screens/CreateScreen.tsx
// Formulario para crear un proyecto: useForm + zodResolver + useCreateItem

import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData } from '../schemas/itemSchema';
import { useCreateItem } from '../hooks/useItems';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  // useForm: entrada (texto del input), contexto, salida (datos ya validados)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof itemSchema>, unknown, ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: '',
      subtitle: '',
      client: '',
      deliveryDate: '2026-12-01',
      budget: '',
    },
  });

  // Mutación: crea el proyecto en la API
  const { mutate: createItem, isPending, isError, error } = useCreateItem();

  // Solo se ejecuta si Zod valida todo bien
  function onSubmit(data: ItemFormData): void {
    createItem(
      { ...data, status: 'active' },
      { onSuccess: () => navigation.goBack() },
    );
  }

  const canSubmit = !isSubmitting && !isPending;

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
        <FormField
          control={control}
          name="name"
          label="Nombre *"
          placeholder="Nombre del proyecto…"
          returnKeyType="next"
          errorMessage={errors.name?.message}
        />
        <FormField
          control={control}
          name="subtitle"
          label="Descripción"
          placeholder="De qué trata el proyecto…"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          errorMessage={errors.subtitle?.message}
        />
        <FormField
          control={control}
          name="client"
          label="Cliente *"
          placeholder="Nombre del cliente…"
          errorMessage={errors.client?.message}
        />
        <FormField
          control={control}
          name="deliveryDate"
          label="Fecha de entrega * (AAAA-MM-DD)"
          placeholder="2026-12-01"
          errorMessage={errors.deliveryDate?.message}
        />
        <FormField
          control={control}
          name="budget"
          label="Presupuesto (USD) *"
          placeholder="0"
          keyboardType="numeric"
          errorMessage={errors.budget?.message}
        />

        {/* Si el POST falla, se muestra el mensaje */}
        {isError && <Text style={styles.serverError}>Error: {error.message}</Text>}

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!canSubmit}
          >
            {isSubmitting || isPending ? (
              <ActivityIndicator size="small" color={COLORS.background} />
            ) : (
              <Text style={styles.buttonText}>Crear proyecto</Text>
            )}
          </Pressable>

          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  serverError: { ...TYPOGRAPHY.error },
  actions: { gap: SPACING.sm, marginTop: SPACING.sm },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700' },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});