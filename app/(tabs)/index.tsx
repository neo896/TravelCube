import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [posts] = useState([
    {
      id: 1,
      title: "巴厘岛的完美日落",
      description:
        "在巴厘岛的海滩上，夕阳西下的那一刻，天空被染成了最美的橙红色...",
      date: "2024年1月15日",
      likes: 128,
      comments: 23,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "东京夜色迷人",
      description:
        "走在东京的霓虹街头，感受着这座城市独特的魅力和现代化的节奏...",
      date: "2024年1月12日",
      likes: 95,
      comments: 18,
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "瑞士雪山之旅",
      description:
        "站在阿尔卑斯山顶，被皑皑白雪包围，那种纯净和壮美让人震撼...",
      date: "2024年1月8日",
      likes: 156,
      comments: 31,
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ]);

  return (
    <View className="flex-1">
      {/* 状态栏背景 */}
      {/* <View
        style={{
          backgroundColor: "#667eea",
        }}
      /> */}

      {/* 状态栏 */}
      {/* <StatusBar backgroundColor="#667eea" translucent={false} /> */}

      <View className="flex-1 bg-gray-50">
        {/* 导航栏 */}
        <LinearGradient colors={["#667eea", "#764ba2"]} className="px-6 py-8">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-2xl font-bold">旅游记录</Text>
              <Text className="text-white/90 text-sm">分享你的精彩旅程</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
              <Text className="text-white text-lg">🔔</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* 快速创建区域 */}
          <View className="px-6 py-4">
            <View className="bg-white rounded-2xl p-6 shadow-lg">
              <View className="items-center mb-6">
                <Text className="text-gray-800 text-xl font-bold mb-2">
                  创建新的旅游文章
                </Text>
                <Text className="text-gray-500 text-center">
                  选择创作模式，开始记录精彩旅程
                </Text>
              </View>

              {/* 统一创建按钮 */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  router.push("/create");
                }}
              >
                <LinearGradient
                  colors={["#3b82f6", "#8b5cf6"]}
                  className="py-4 items-center"
                  style={{ borderRadius: 12 }}
                >
                  <Text className="text-white font-semibold text-lg">
                    ✨ 开始创作
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center mt-3">
                <Text className="text-gray-500 text-xs">
                  ℹ️ 下一步选择适合你的创作模式
                </Text>
              </View>
            </View>
          </View>

          {/* 最新创作区域 */}
          <View className="px-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-800 text-xl font-semibold">
                最新创作
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-600 text-sm font-medium">
                  查看全部
                </Text>
              </TouchableOpacity>
            </View>

            {/* 文章列表 */}
            <View className="space-y-4 mb-4">
              {posts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: post.image }}
                    className="w-full h-48"
                    resizeMode="cover"
                  />
                  <View className="p-4">
                    <Text className="text-gray-800 font-semibold mb-2">
                      {post.title}
                    </Text>
                    <Text className="text-gray-600 text-sm mb-3 leading-5">
                      {post.description}
                    </Text>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-gray-400 text-xs">{post.date}</Text>
                      <View className="flex-row items-center space-x-3">
                        <View className="flex-row items-center">
                          <Text className="text-gray-400 text-xs mr-1">🤍</Text>
                          <Text className="text-gray-400 text-xs">
                            {post.likes}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Text className="text-gray-400 text-xs mr-1">💬</Text>
                          <Text className="text-gray-400 text-xs">
                            {post.comments}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 底部安全区域 */}
          <View className="h-24"></View>
        </ScrollView>

        {/* 悬浮相机按钮 */}
        {/* <View className="absolute bottom-6 right-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              router.push("/create/quick");
            }}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              className="w-16 h-16 items-center justify-center shadow-lg"
              style={{ borderRadius: 32 }}
            >
              <Ionicons name="camera" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}
