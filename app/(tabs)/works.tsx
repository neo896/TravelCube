import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  status: "published" | "draft";
  date: string;
}

export default function Works() {
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("全部");

  const filters = ["全部", "已发布", "草稿", "最近"];

  const [articles] = useState<Article[]>([
    {
      id: 1,
      title: "我的亚洲奇幻之旅：从巴厘岛的日落到东京的霓虹夜色",
      description:
        "这是一次令人难忘的亚洲之旅，让我深深地沉醉在不同文化的魅力之中...",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      status: "published",
      date: "1月15日",
    },
    {
      id: 2,
      title: "东京夜色迷人：现代都市的魅力探索",
      description:
        "走在东京的霓虹街头，感受着这座城市独特的魅力和现代化的节奏...",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      status: "published",
      date: "1月12日",
    },
    {
      id: 3,
      title: "瑞士雪山之旅：阿尔卑斯山的纯净美景",
      description:
        "站在阿尔卑斯山顶，被皑皑白雪包围，那种纯净和壮美让人震撼...",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      status: "published",
      date: "1月8日",
    },
    {
      id: 4,
      title: "巴黎浪漫之夜：塞纳河畔的美好时光",
      description: "漫步在塞纳河畔，看着埃菲尔铁塔在夜色中闪闪发光...",
      image:
        "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      status: "draft",
      date: "1月5日",
    },
    {
      id: 5,
      title: "泰国清迈古城漫游：寺庙与文化的碰撞",
      description: "在清迈的古城中穿梭，每一座寺庙都有着自己的故事...",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      status: "published",
      date: "1月3日",
    },
  ]);

  const filteredArticles = articles.filter((article) => {
    if (activeFilter === "全部") return true;
    if (activeFilter === "已发布") return article.status === "published";
    if (activeFilter === "草稿") return article.status === "draft";
    if (activeFilter === "最近") return true; // 可以根据日期排序
    return true;
  });

  const stats = {
    total: articles.length,
    published: articles.filter((article) => article.status === "published")
      .length,
    drafts: articles.filter((article) => article.status === "draft").length,
  };

  const renderArticleCard = ({ item }: { item: Article }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
      activeOpacity={0.9}
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-24 h-24"
          resizeMode="cover"
        />
        <View className="flex-1 p-4">
          <View className="flex-row justify-between items-start mb-2">
            <Text
              className="font-semibold text-gray-800 text-sm flex-1 mr-2"
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <TouchableOpacity className="ml-2">
              <Ionicons name="ellipsis-vertical" size={16} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-600 text-xs mb-3" numberOfLines={2}>
            {item.description}
          </Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons
                name={
                  item.status === "published"
                    ? "checkmark-circle-outline"
                    : "create-outline"
                }
                size={12}
                color="#9ca3af"
              />
              <Text className="text-gray-400 text-xs ml-1">
                {item.status === "published" ? "已发布" : "草稿"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <View
                className={`px-2 py-1 rounded-full mr-2 ${
                  item.status === "published" ? "bg-green-100" : "bg-orange-100"
                }`}
              >
                <Text
                  className={`text-xs ${
                    item.status === "published"
                      ? "text-green-700"
                      : "text-orange-700"
                  }`}
                >
                  {item.status === "published" ? "已发布" : "草稿"}
                </Text>
              </View>
              <Text className="text-xs text-gray-400">{item.date}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* 导航栏 */}
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        className="px-6 pt-12 pb-4"
      >
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white text-2xl font-bold">我的作品</Text>
            <Text className="text-white text-sm opacity-90">
              管理你的旅游文章
            </Text>
          </View>
        </View>

        {/* 搜索栏 */}
        <View className="relative mb-4">
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="搜索文章标题或标签..."
            placeholderTextColor="#9ca3af"
            className="bg-white px-4 py-3 rounded-xl text-gray-800 pr-12"
          />
          <Ionicons
            name="search"
            size={16}
            color="#9ca3af"
            style={{ position: "absolute", right: 16, top: 14 }}
          />
        </View>

        {/* 统计卡片 */}
        <View className="flex-row">
          <View className="flex-1 bg-white rounded-xl p-3 items-center mr-3">
            <Text className="text-gray-800 text-2xl font-bold">
              {stats.total}
            </Text>
            <Text className="text-gray-600 text-xs">总文章</Text>
          </View>
          <View className="flex-1 bg-white rounded-xl p-3 items-center mr-3">
            <Text className="text-gray-800 text-2xl font-bold">
              {stats.published}
            </Text>
            <Text className="text-gray-600 text-xs">已发布</Text>
          </View>
          <View className="flex-1 bg-white rounded-xl p-3 items-center">
            <Text className="text-gray-800 text-2xl font-bold">
              {stats.drafts}
            </Text>
            <Text className="text-gray-600 text-xs">草稿</Text>
          </View>
        </View>
      </LinearGradient>

      {/* 筛选栏 */}
      <View className="bg-white px-6 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full ${
                  index < filters.length - 1 ? "mr-3" : ""
                }`}
                style={{
                  backgroundColor:
                    activeFilter === filter ? "#667eea" : "#f3f4f6",
                }}
              >
                <Text
                  className="text-sm font-medium"
                  style={{
                    color: activeFilter === filter ? "white" : "#6b7280",
                  }}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 作品列表 */}
      <View className="flex-1">
        <FlatList
          data={filteredArticles}
          renderItem={renderArticleCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            padding: 24,
            paddingBottom: 100, // 为底部导航留出空间
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="px-6 py-12 items-center">
              <Ionicons name="folder-open-outline" size={64} color="#d1d5db" />
              <Text className="text-gray-600 text-lg font-semibold mb-2 mt-4">
                还没有文章
              </Text>
              <Text className="text-gray-400 mb-6 text-center">
                开始创建你的第一篇旅游文章吧
              </Text>
              <TouchableOpacity>
                <LinearGradient
                  colors={["#3b82f6", "#8b5cf6"]}
                  className="px-6 py-3 rounded-xl"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="add" size={16} color="white" />
                    <Text className="text-white font-medium ml-2">
                      创建文章
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  );
}
