// src/components/FormField.tsx
// Campo reutilizable: Controller + TextInput + mensaje de error

import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

// T = tipo del formulario; así 'name' solo acepta campos que existen
interface FormFieldProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  errorMessage?: string;
}

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

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, !!errorMessage && styles.inputError]}
            // El TextInput solo recibe texto: si es número, lo pasamos a string
            value={value === undefined || value === null ? '' : String(value)}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={COLORS.textMuted}
            {...textInputProps}
          />
        )}
      />

      {/* Siempre reserva espacio para que el layout no salte */}
      <Text style={styles.error} numberOfLines={1}>
        {errorMessage ?? ''}
      </Text>
    </View>
  );
}

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