import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Auth from "../components/Auth";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import "../global.css";

function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 justify-center items-center bg-gray-50">
          <ActivityIndicator size="large" color="#667eea" />
        </View>
      </SafeAreaView>
    );
  }

  // 如果用户未登录，显示登录页面
  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Auth />
      </SafeAreaView>
    );
  }

  // 如果用户已登录，显示主应用
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
