import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CreateModeSelect() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* 渐变导航栏 */}
      <LinearGradient colors={["#667eea", "#764ba2"]} className="px-6 py-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-2xl font-bold">选择创作模式</Text>
            <Text className="text-white/90 text-sm">
              选择最适合你的创作方式
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1, paddingBottom: 80 }}>
        <View style={{ padding: 24, gap: 24 }}>
          {/* 快速模式 */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LinearGradient
                  colors={["#3b82f6", "#1d4ed8"]}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                  }}
                >
                  <Ionicons name="flash" size={24} color="white" />
                </LinearGradient>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    快速模式
                  </Text>
                  <Text style={{ fontSize: 14, color: "#6b7280" }}>
                    简单高效，快速完成
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#dbeafe",
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#1d4ed8" }}
                >
                  简单易用
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#eff6ff",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: 12,
                }}
              >
                功能特点：
              </Text>
              <View style={{ gap: 8 }}>
                {[
                  "像朋友圈一样，简单高效",
                  "输入心情描述或旅行感受",
                  "永久免费的AI智能内容润色",
                  "多种内容风格任你选择",
                  "一键发布或保存为草稿",
                ].map((feature, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#3b82f6"
                      style={{ marginRight: 12 }}
                    />
                    <Text style={{ fontSize: 14, color: "#374151" }}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <Link href="../create/quick" asChild>
              <TouchableOpacity>
                <LinearGradient
                  colors={["#3b82f6", "#1d4ed8"]}
                  style={{
                    paddingVertical: 16,
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      开始快速创作
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Link>
          </View>

          {/* 智能模式 */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 5,
              borderWidth: 2,
              borderColor: "#a855f7",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LinearGradient
                  colors={["#8b5cf6", "#7c3aed"]}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                  }}
                >
                  <Ionicons name="sparkles" size={24} color="white" />
                </LinearGradient>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    智能模式
                  </Text>
                  <Text style={{ fontSize: 14, color: "#6b7280" }}>
                    AI深度分析，专业定制
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#f3e8ff",
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="star"
                  size={12}
                  color="#7c3aed"
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#7c3aed" }}
                >
                  推荐
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#faf5ff",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: 12,
                }}
              >
                功能特点：
              </Text>
              <View style={{ gap: 8 }}>
                {[
                  "多维度内容输入（照片+语音+位置）",
                  "AI智能分析场景和情绪",
                  "个性化问答引导创作",
                  "多种专业文章风格",
                  "目标读者精准定位",
                ].map((feature, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#8b5cf6"
                      style={{ marginRight: 12 }}
                    />
                    <Text style={{ fontSize: 14, color: "#374151" }}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <Link href="../create/smart" asChild>
              <TouchableOpacity>
                <LinearGradient
                  colors={["#8b5cf6", "#7c3aed"]}
                  style={{
                    paddingVertical: 16,
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name="sparkles"
                      size={20}
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      开始智能创作
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Link>
          </View>

          {/* 模式对比 */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1f2937",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              快速对比
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}
                >
                  所需时间
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#3b82f6" }}
                >
                  5-10秒
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#8b5cf6" }}
                >
                  3-5分钟
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}
                >
                  内容质量
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#3b82f6" }}
                >
                  良好
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#8b5cf6" }}
                >
                  优秀
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}
                >
                  个性化程度
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#3b82f6" }}
                >
                  基础
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#8b5cf6" }}
                >
                  深度
                </Text>
              </View>
            </View>
          </View>

          {/* 使用建议 */}
          <View
            style={{
              backgroundColor: "#f9fafb",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Ionicons
                name="bulb"
                size={20}
                color="#f59e0b"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#1f2937" }}
              >
                选择建议
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              {[
                { label: "首次使用：", text: "建议选择快速模式熟悉流程" },
                { label: "重要旅行：", text: "推荐使用智能模式获得最佳效果" },
                { label: "日常记录：", text: "快速模式简单便捷，支持AI润色" },
                { label: "内容创作：", text: "智能模式提供专业级别的定制" },
              ].map((item, index) => (
                <Text key={index} style={{ fontSize: 14, color: "#6b7280" }}>
                  <Text style={{ fontWeight: "600" }}>{item.label}</Text>
                  {item.text}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
