// src/navigation/RootNavigator.tsx
// Stack Navigator con tres pantallas: Home, Detail y Create.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text } from 'react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { COLORS } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const headerStyle = { backgroundColor: COLORS.surface } as const;
const headerTitleStyle = { color: COLORS.textPrimary, fontWeight: '600' as const };

export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle,
        headerTitleStyle,
        headerTintColor: COLORS.accent,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          // TODO: cambiar el título al nombre de tu dominio
          title: 'Ítems',
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Create')}>
              <Text style={{ color: COLORS.accent, fontSize: 24, fontWeight: '300' }}>
                +
              </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{ title: 'Nuevo ítem', presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
