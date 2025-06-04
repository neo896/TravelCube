import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SmartCreate() {
  const [step, setStep] = useState(2); // 当前在智能分析步骤
  const [selectedMoods, setSelectedMoods] = useState(["放松"]);
  const [selectedStyle, setSelectedStyle] = useState("浪漫情侣");
  const [targetAudience, setTargetAudience] = useState("情侣/夫妻");
  const [articleDetail, setArticleDetail] = useState(50);
  const [aiAnswers, setAiAnswers] = useState({
    memorable: "",
    food: "",
    companions: "",
  });

  const moods = [
    { emoji: "😌", label: "放松" },
    { emoji: "💕", label: "浪漫" },
    { emoji: "🤩", label: "兴奋" },
    { emoji: "🥰", label: "幸福" },
    { emoji: "😍", label: "惊艳" },
    { emoji: "🤔", label: "思考" },
    { emoji: "✨", label: "感动" },
    { emoji: "🎉", label: "庆祝" },
  ];

  const styles = [
    { id: "浪漫情侣", title: "💕 浪漫情侣", desc: "甜蜜温馨的爱情旅行记录" },
    {
      id: "社交分享",
      title: "📱 社交分享",
      desc: "适合小红书、朋友圈的种草文",
    },
    { id: "深度游记", title: "📖 深度游记", desc: "详细的文化历史背景介绍" },
    { id: "美食探店", title: "🍜 美食探店", desc: "专注美食体验的垂直内容" },
  ];

  const audiences = ["情侣/夫妻", "单身旅行者", "亲子家庭", "年轻人"];

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const generateArticle = () => {
    if (selectedMoods.length === 0) {
      Alert.alert("提示", "请至少选择一个情绪标签");
      return;
    }

    Alert.alert("生成中", "AI正在为您生成专业级的旅行文章...", [
      { text: "确定", onPress: () => router.back() },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* 渐变导航栏 */}
      <LinearGradient colors={["#667eea", "#764ba2"]} className="px-6 py-4">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
            智能创作 - 专业模式
          </Text>
          <TouchableOpacity onPress={() => router.replace("../create/quick")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="swap-horizontal"
                size={16}
                color="white"
                style={{ marginRight: 4 }}
              />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "white" }}>
                切换模式
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 模式说明 */}
        <View style={{ alignItems: "center", marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 16,
              paddingHorizontal: 12,
              paddingVertical: 6,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="sparkles"
              size={16}
              color="#c084fc"
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 14, color: "white", opacity: 0.9 }}>
              当前：智能模式
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }}>
        {/* 进度指示器 */}
        <View style={{ padding: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#10b981",
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "white" }}
                >
                  1
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                内容收集
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: "#e5e7eb",
                marginHorizontal: 16,
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#667eea",
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#667eea",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "white" }}
                >
                  2
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                智能分析
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: "#e5e7eb",
                marginHorizontal: 16,
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#d1d5db",
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#9ca3af" }}
                >
                  3
                </Text>
              </View>
              <Text style={{ marginLeft: 8, fontSize: 14, color: "#9ca3af" }}>
                生成文章
              </Text>
            </View>
          </View>
        </View>

        {/* AI智能分析结果 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <LinearGradient
            colors={["#a8edea", "#fed6e3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#4ecdc4",
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
                name="hardware-chip"
                size={20}
                color="#0891b2"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#1f2937" }}
              >
                AI智能分析结果
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {[
                { label: "识别场景", value: "海滩日落、城市夜景" },
                { label: "旅行情绪", value: "放松、浪漫" },
                { label: "同行人数", value: "2人（情侣）" },
                { label: "推荐风格", value: "浪漫游记" },
              ].map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.6)",
                    borderRadius: 8,
                    padding: 12,
                    flex: 1,
                    minWidth: "45%",
                  }}
                >
                  <Text
                    style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#1f2937",
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* 多种输入方式 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: 16,
            }}
          >
            丰富你的旅行故事
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {[
              {
                icon: "camera",
                color: "#3b82f6",
                title: "照片",
                subtitle: "已选择3张",
              },
              {
                icon: "mic",
                color: "#ef4444",
                title: "语音记录",
                subtitle: "录制感受",
              },
              {
                icon: "location",
                color: "#10b981",
                title: "位置信息",
                subtitle: "自动获取",
              },
              {
                icon: "calendar",
                color: "#8b5cf6",
                title: "行程导入",
                subtitle: "时间轴",
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 16,
                  flex: 1,
                  minWidth: "45%",
                  alignItems: "center",
                  borderWidth: index === 0 ? 2 : 0,
                  borderColor: index === 0 ? "#3b82f6" : "transparent",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                  style={{ marginBottom: 8 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#1f2937",
                    marginBottom: 2,
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, color: "#6b7280" }}>
                  {item.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 语音录制区域 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
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
              录制旅行感受
            </Text>
            <View style={{ alignItems: "center", paddingVertical: 24 }}>
              <TouchableOpacity>
                <LinearGradient
                  colors={["#ff6b6b", "#ee5a52"]}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    shadowColor: "#ee5a52",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 15,
                    elevation: 8,
                  }}
                >
                  <Ionicons name="mic" size={28} color="white" />
                </LinearGradient>
              </TouchableOpacity>
              <Text style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
                点击录制你的旅行故事
              </Text>
              <Text style={{ fontSize: 12, color: "#9ca3af" }}>
                AI将自动转换为文字并融入文章
              </Text>
            </View>

            {/* 已录制的语音 */}
            <View
              style={{
                backgroundColor: "#f9fafb",
                borderRadius: 8,
                padding: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="play-circle"
                  size={20}
                  color="#3b82f6"
                  style={{ marginRight: 12 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#1f2937",
                    }}
                  >
                    巴厘岛日落感受
                  </Text>
                  <Text style={{ fontSize: 12, color: "#6b7280" }}>
                    0:45 • 刚才录制
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="trash" size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 位置和环境信息 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <LinearGradient
              colors={["#4ecdc4", "#45b7aa"]}
              style={{ flex: 1, borderRadius: 12, padding: 16 }}
            >
              <Ionicons
                name="location"
                size={18}
                color="white"
                style={{ marginBottom: 8 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "white",
                  marginBottom: 2,
                }}
              >
                当前位置
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  opacity: 0.9,
                  marginBottom: 4,
                }}
              >
                巴厘岛库塔海滩
              </Text>
              <Text style={{ fontSize: 12, color: "white", opacity: 0.75 }}>
                印度尼西亚
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={["#ffd93d", "#ffcd02"]}
              style={{ flex: 1, borderRadius: 12, padding: 16 }}
            >
              <Ionicons
                name="sunny"
                size={18}
                color="white"
                style={{ marginBottom: 8 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "white",
                  marginBottom: 2,
                }}
              >
                拍摄天气
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  opacity: 0.9,
                  marginBottom: 4,
                }}
              >
                晴朗 28°C
              </Text>
              <Text style={{ fontSize: 12, color: "white", opacity: 0.75 }}>
                微风 · 能见度佳
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* 情绪和心情标签 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#1f2937",
              marginBottom: 12,
            }}
          >
            为这次旅行添加情绪标签
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleMood(mood.label)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: selectedMoods.includes(mood.label)
                    ? "#667eea"
                    : "#f3f4f6",
                  shadowColor: selectedMoods.includes(mood.label)
                    ? "#667eea"
                    : "transparent",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: selectedMoods.includes(mood.label) ? 0.3 : 0,
                  shadowRadius: 15,
                  elevation: selectedMoods.includes(mood.label) ? 4 : 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: selectedMoods.includes(mood.label)
                      ? "white"
                      : "#374151",
                  }}
                >
                  {mood.emoji} {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI智能问答 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <LinearGradient
            colors={["#e0f2fe", "#b3e5fc"]}
            style={{
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: "#81d4fa",
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
                name="chatbubble-ellipses"
                size={20}
                color="#0284c7"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#1f2937" }}
              >
                AI想了解更多
              </Text>
            </View>
            <View style={{ gap: 12 }}>
              {[
                {
                  key: "memorable",
                  question: "💭 这次旅行最难忘的瞬间是什么？",
                  placeholder: "告诉AI你的感受...",
                },
                {
                  key: "food",
                  question: "🍽️ 有什么特别的美食体验吗？",
                  placeholder: "分享你的美食发现...",
                },
                {
                  key: "companions",
                  question: "👫 和谁一起旅行的？有什么特别的互动吗？",
                  placeholder: "记录同行的美好时光...",
                },
              ].map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.6)",
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <Text
                    style={{ fontSize: 14, color: "#374151", marginBottom: 8 }}
                  >
                    {item.question}
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: "#e5e7eb",
                      borderRadius: 8,
                      padding: 8,
                      fontSize: 14,
                      color: "#1f2937",
                    }}
                    placeholder={item.placeholder}
                    placeholderTextColor="#9ca3af"
                    value={aiAnswers[item.key as keyof typeof aiAnswers]}
                    onChangeText={(text) =>
                      setAiAnswers((prev) => ({ ...prev, [item.key]: text }))
                    }
                    multiline
                    numberOfLines={2}
                  />
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* 高级文章设置 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: 16,
            }}
          >
            个性化设置
          </Text>

          {/* 文章风格选择 */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
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
              选择文章风格
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {styles.map((style, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedStyle(style.id)}
                  style={{
                    borderWidth: 2,
                    borderColor:
                      selectedStyle === style.id ? "#3b82f6" : "#e5e7eb",
                    backgroundColor:
                      selectedStyle === style.id ? "#eff6ff" : "white",
                    borderRadius: 8,
                    padding: 12,
                    flex: 1,
                    minWidth: "45%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color:
                          selectedStyle === style.id ? "#1d4ed8" : "#374151",
                      }}
                    >
                      {style.title}
                    </Text>
                    {selectedStyle === style.id && (
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#3b82f6"
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: selectedStyle === style.id ? "#1d4ed8" : "#6b7280",
                    }}
                  >
                    {style.desc}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 目标读者 */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
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
              目标读者
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {audiences.map((audience, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setTargetAudience(audience)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    backgroundColor:
                      targetAudience === audience ? "#dbeafe" : "#f3f4f6",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        targetAudience === audience ? "#1d4ed8" : "#6b7280",
                    }}
                  >
                    {audience}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 文章长度和详细程度 */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#1f2937" }}
              >
                文章详细程度
              </Text>
              <Text style={{ fontSize: 14, color: "#3b82f6" }}>
                {articleDetail < 33
                  ? "简洁"
                  : articleDetail < 67
                  ? "适中"
                  : "详细"}
              </Text>
            </View>
            {/* 简单的详细程度显示 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 4,
                  backgroundColor: "#e5e7eb",
                  borderRadius: 2,
                }}
              >
                <View
                  style={{
                    width: `${articleDetail}%`,
                    height: "100%",
                    backgroundColor: "#3b82f6",
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <TouchableOpacity onPress={() => setArticleDetail(20)}>
                <Text
                  style={{
                    fontSize: 12,
                    color: articleDetail < 33 ? "#3b82f6" : "#6b7280",
                  }}
                >
                  简洁
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setArticleDetail(50)}>
                <Text
                  style={{
                    fontSize: 12,
                    color:
                      articleDetail >= 33 && articleDetail < 67
                        ? "#3b82f6"
                        : "#6b7280",
                  }}
                >
                  适中
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setArticleDetail(80)}>
                <Text
                  style={{
                    fontSize: 12,
                    color: articleDetail >= 67 ? "#3b82f6" : "#6b7280",
                  }}
                >
                  详细
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 智能生成按钮 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <TouchableOpacity onPress={generateArticle}>
            <LinearGradient
              colors={["#3b82f6", "#8b5cf6"]}
              style={{
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: "center",
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 25,
                elevation: 8,
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
                  style={{ color: "white", fontSize: 18, fontWeight: "600" }}
                >
                  AI智能生成文章
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <Ionicons
              name="time"
              size={16}
              color="#6b7280"
              style={{ marginRight: 4 }}
            />
            <Text style={{ fontSize: 14, color: "#6b7280" }}>
              预计生成时间：15-20秒
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Ionicons
              name="shield-checkmark"
              size={16}
              color="#9ca3af"
              style={{ marginRight: 4 }}
            />
            <Text style={{ fontSize: 12, color: "#9ca3af" }}>
              所有数据采用端到端加密
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
