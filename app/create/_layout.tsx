import { Stack } from "expo-router";

export default function CreateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="quick" options={{ headerShown: false }} />
      <Stack.Screen name="smart" options={{ headerShown: false }} />
    </Stack>
  );
}
