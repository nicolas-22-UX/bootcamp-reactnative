// src/navigation/RootNavigator.tsx
// Stack principal: Home → Create (modal) | Home → Edit (push)

import React from 'react';
import { Pressable, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { EditScreen } from '../screens/EditScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const headerStyle = { backgroundColor: COLORS.background };
const headerTitleStyle = { color: COLORS.text, fontWeight: '700' as const };

export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerStyle, headerTitleStyle }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Ítems', headerRight: () => <AddButton /> }}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{ title: 'Nuevo ítem', presentation: 'modal' }}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}

// Botón "+" en el header de Home
function AddButton(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable onPress={() => navigation.navigate('Create')} hitSlop={8}>
      <Text style={{ fontSize: 24, color: COLORS.accent, fontWeight: '300' }}>+</Text>
    </Pressable>
  );
}
