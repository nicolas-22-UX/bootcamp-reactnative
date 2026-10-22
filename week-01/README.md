# Semana 1 — Proyectos de Software

App de tarjetas hecha con React Native y Expo para el bootcamp.

## Dominio

Empresa de proyectos de software de Nicolás Aparicio. Cada tarjeta es un proyecto con su cliente, su estado y su fecha de entrega.

## Qué muestra la app

- Encabezado con el nombre del dominio.
- Una tarjeta por proyecto: imagen, nombre, descripción, cliente, estado y fecha de entrega.
- Tres estados, cada uno con su color: En desarrollo, En garantía y En pausa.
- Al presionar una tarjeta baja su opacidad y aparece un aviso con el cliente.

## Cómo ejecutarla

```bash
cd week-01
pnpm install
pnpm start
```

Escanea el código QR con Expo Go.

## Estructura

- `src/types`: la interfaz `Project` y el tipo `ProjectStatus`.
- `src/data`: los proyectos de ejemplo.
- `src/components`: la tarjeta `ItemCard`.
- `src/screens`: la pantalla `HomeScreen`.

## Decisiones

- Estilos con `StyleSheet.create`, sin estilos inline.
- Layout solo con Flexbox, sin posición absoluta.
- `SafeAreaView` de `react-native-safe-area-context` 5.7.0, porque el de `react-native` está obsoleto.
- Versiones exactas en `package.json`.
