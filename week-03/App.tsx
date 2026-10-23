// App.tsx
// Punto de entrada principal de la app.
// NavigationContainer debe envolver TODA la navegación de la app.
// Este archivo no necesita cambios — todo el trabajo de navegación
// va en src/navigation/RootNavigator.tsx

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation/RootNavigator';

export default function App(): React.JSX.Element {
  return (
    // SafeAreaProvider garantiza que la safe area (notch, island) se calcule correctamente
    <SafeAreaProvider>
      {/* NavigationContainer gestiona el estado del historial de navegación */}
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
