import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";

export default function Find() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* 导航栏 */}
      <LinearGradient colors={["#667eea", "#764ba2"]} className="px-6 py-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-2xl font-bold">发现</Text>
            <Text className="text-white/90 text-sm">探索更多精彩内容</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 py-4">
        <Text className="text-gray-800 text-lg font-semibold mb-4">
          热门推荐
        </Text>

        <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <Text className="text-gray-600">正在开发中...</Text>
          <Text className="text-gray-500 text-sm mt-2">
            这里将展示热门的旅游内容和推荐
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
