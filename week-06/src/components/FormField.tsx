// src/components/FormField.tsx
// Componente reutilizable que encapsula Controller + TextInput + error.
// TODO: conectar con control del formulario.

import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

// ──────────────────────────────────────────────────────────
// Props del componente
// ──────────────────────────────────────────────────────────

interface FormFieldProps<T extends FieldValues> extends TextInputProps {
  // TODO: tipar correctamente con los generics de React Hook Form
  // control: Control<T>
  // name: FieldPath<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: FieldPath<any>;
  label: string;
  errorMessage?: string;
}

// ──────────────────────────────────────────────────────────
// Componente
// ──────────────────────────────────────────────────────────

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  errorMessage,
  ...textInputProps
}: FormFieldProps<T>): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {/* TODO: implementar el Controller que conecta el campo con useForm */}
      {/* ─────────────────────────────────────────────────────────────────
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, !!errorMessage && styles.inputError]}
              value={typeof value === 'number' ? String(value) : value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={COLORS.textMuted}
              {...textInputProps}
            />
          )}
        />
      ───────────────────────────────────────────────────────────────── */}

      {/* Placeholder hasta que implementes el Controller */}
      <TextInput
        style={[styles.input, !!errorMessage && styles.inputError]}
        placeholderTextColor={COLORS.textMuted}
        {...textInputProps}
      />

      {/* Mensaje de error — siempre reserva espacio para evitar layout jumps */}
      <Text style={styles.error} numberOfLines={1}>
        {errorMessage ?? ''}
      </Text>
    </View>
  );
}

// ──────────────────────────────────────────────────────────
// Estilos
// ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { gap: SPACING.xs },
  label: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.6 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  inputError: { borderColor: COLORS.error },
  error: { ...TYPOGRAPHY.error, minHeight: 16 },
});
