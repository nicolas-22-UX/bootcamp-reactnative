// src/screens/EditScreen.tsx
// Formulario para editar un proyecto: carga los datos y rellena el form con reset()

import React, { useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData } from '../schemas/itemSchema';
import { useItemById, useUpdateItem } from '../hooks/useItems';

type EditNavProp = NativeStackNavigationProp<RootStackParamList, 'Edit'>;
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  // Pide el proyecto actual al servidor
  const { data: item, isLoading } = useItemById(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<z.input<typeof itemSchema>, unknown, ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: '',
      subtitle: '',
      client: '',
      deliveryDate: '',
      budget: '',
    },
  });

  // Cuando llega el proyecto del servidor, rellena el formulario
  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        subtitle: item.subtitle ?? '',
        client: item.client,
        deliveryDate: item.deliveryDate,
        budget: item.budget !== undefined ? String(item.budget) : '',
      });
    }
  }, [item, reset]);

  const { mutate: updateItem, isPending, isError, error } = useUpdateItem();

  // Solo se ejecuta si Zod valida bien; conserva id y status del proyecto
  function onSubmit(data: ItemFormData): void {
    if (!item) return;
    updateItem(
      { ...item, ...data },
      { onSuccess: () => navigation.goBack() },
    );
  }

  const canSubmit = !isSubmitting && !isPending && isDirty;

  // Mientras carga los datos del servidor: spinner
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

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

        {/* Si el PUT falla, se muestra el mensaje */}
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
              <Text style={styles.buttonText}>Guardar cambios</Text>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
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