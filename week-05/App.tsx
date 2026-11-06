// App.tsx — Punto de entrada del proyecto semana 05
// QueryClientProvider + NavigationContainer en la raíz

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { RootNavigator } from './src/navigation/RootNavigator';

// El QueryClient se crea fuera del componente para que no
// se recree en cada render. Una sola instancia por app.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,  // 2 minutos — ajusta según la volatilidad de tu API
      retry: 2,
      refetchOnWindowFocus: false,  // En mobile no hay "ventana", desactivamos
    },
  },
});

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
