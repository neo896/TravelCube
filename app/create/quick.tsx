import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  checkOpenAIConfig,
  getOpenAIStatus,
  polishTravelContent,
} from "../../services/api/openai";

// 文章风格选项
const articleStyles = [
  {
    id: "romantic",
    name: "浪漫抒情",
    desc: "温柔细腻，记录美好时光",
    icon: "heart",
  },
  {
    id: "healing",
    name: "治愈温暖",
    desc: "正能量满满，分享美好感受",
    icon: "sunny",
  },
  {
    id: "funny",
    name: "轻松幽默",
    desc: "风趣搞笑，记录欢乐时光",
    icon: "happy",
  },
  {
    id: "energetic",
    name: "元气满满",
    desc: "活力四射，展现青春活力",
    icon: "flash",
  },
  {
    id: "literary",
    name: "文艺清新",
    desc: "小资情调，展现生活美学",
    icon: "leaf",
  },
  {
    id: "ins",
    name: "ins风格",
    desc: "简约时尚，网红打卡必备",
    icon: "camera",
  },
  {
    id: "japanese",
    name: "日系小清新",
    desc: "简单美好，自然纯净",
    icon: "flower",
  },
  { id: "vintage", name: "怀旧复古", desc: "时光回溯，怀念过往", icon: "time" },
  {
    id: "urban",
    name: "城市酷炫",
    desc: "现代都市，时尚前卫",
    icon: "business",
  },
];

export default function QuickCreate() {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [articleStyle, setArticleStyle] = useState("浪漫抒情");
  const [userDescription, setUserDescription] = useState("");
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [showPolishResult, setShowPolishResult] = useState(false);
  const [polishedContent, setPolishedContent] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [showFullEditor, setShowFullEditor] = useState(false);
  const [tempDescription, setTempDescription] = useState("");
  const [apiStatus, setApiStatus] = useState<string>("");

  useEffect(() => {
    // 检查API配置状态
    setApiStatus(getOpenAIStatus());
    // quickConfigCheck(); // 在控制台输出配置信息
  }, []);

  const openCamera = async () => {
    try {
      // 请求相机权限
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (cameraPermission.granted === false) {
        Alert.alert("权限被拒绝", "需要相机权限才能拍照");
        return;
      }

      // 打开相机
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.8,
        aspect: [4, 3],
        allowsEditing: true,
      });

      if (!result.canceled && result.assets) {
        const newPhoto = result.assets[0].uri;
        const totalPhotos = selectedPhotos.length + 1;

        if (totalPhotos > 9) {
          Alert.alert("照片数量超限", "最多只能选择9张照片");
          return;
        }

        setSelectedPhotos((prev) => [...prev, newPhoto]);
      }
    } catch (error) {
      Alert.alert("错误", "拍照时出现错误，请重试");
      console.error("Camera Error: ", error);
    }
  };

  const openImageLibrary = async () => {
    try {
      // 请求媒体库权限
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("权限被拒绝", "需要访问相册权限才能选择照片");
        return;
      }

      // 打开图片选择器
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets) {
        const newPhotos = result.assets.map((asset) => asset.uri);
        const totalPhotos = selectedPhotos.length + newPhotos.length;

        if (totalPhotos > 9) {
          Alert.alert("照片数量超限", "最多只能选择9张照片");
          return;
        }

        setSelectedPhotos((prev) => [...prev, ...newPhotos]);
      }
    } catch (error) {
      Alert.alert("错误", "选择照片时出现错误，请重试");
      console.error("ImagePicker Error: ", error);
    }
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const generateArticle = () => {
    if (selectedPhotos.length === 0) {
      Alert.alert("提示", "请至少选择一张照片");
      return;
    }

    Alert.alert("发布成功", "您的旅行动态已发布到朋友圈", [
      { text: "确定", onPress: () => router.back() },
    ]);
  };

  const aiPolishContent = async () => {
    if (selectedPhotos.length === 0) {
      Alert.alert("提示", "请至少选择一张照片");
      return;
    }

    const isConfigured = checkOpenAIConfig();

    if (!isConfigured) {
      Alert.alert(
        "AI功能不可用",
        `当前状态：${getOpenAIStatus()}\n\nAI润色功能需要配置OpenAI API密钥。\n\n如需使用AI润色，请：\n1. 在项目根目录创建.env文件\n2. 添加 EXPO_PUBLIC_OPENAI_API_KEY=your_api_key\n3. 重启应用`,
        [{ text: "确定", style: "default" }]
      );
      return;
    }

    setIsPolishing(true);

    try {
      const polished = await polishTravelContent({
        userDescription: userDescription.trim(),
        photos: selectedPhotos,
        style: articleStyle,
      });

      setPolishedContent(polished);
      setShowPolishResult(true);
    } catch (error) {
      console.error("AI润色失败:", error);

      let errorMessage = "AI润色服务遇到问题，请检查网络连接或稍后重试。";

      if (error instanceof Error) {
        if (error.message.includes("未配置")) {
          errorMessage = "AI功能未正确配置，请检查API密钥设置。";
        } else if (
          error.message.includes("网络") ||
          error.message.includes("连接")
        ) {
          errorMessage = "网络连接异常，请检查网络后重试。";
        }
      }

      Alert.alert("AI润色失败", errorMessage, [{ text: "确定" }]);
    } finally {
      setIsPolishing(false);
    }
  };

  const saveDraft = () => {
    if (selectedPhotos.length === 0 && !userDescription.trim()) {
      Alert.alert("提示", "请至少选择照片或输入描述");
      return;
    }

    Alert.alert("保存成功", "草稿已保存到您的文章列表中", [
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
            创建内容 - 快速模式
          </Text>
          <TouchableOpacity onPress={() => router.replace("./smart")}>
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
              name="flash"
              size={16}
              color="#fbbf24"
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 14, color: "white", opacity: 0.9 }}>
              当前：快速模式
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }}>
        {/* 步骤指示器 */}
        <View style={{ padding: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></View>
        </View>

        {/* 照片上传区域 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: 16,
            }}
          >
            选择旅游照片
          </Text>

          <View
            style={{
              backgroundColor: "#f9fafb",
              borderWidth: 2,
              borderColor: "#e5e7eb",
              borderStyle: "dashed",
              borderRadius: 12,
              padding: 32,
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#6b7280",
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              选择照片开始创作之旅
            </Text>

            <View style={{ flexDirection: "row", gap: 32, marginBottom: 20 }}>
              {/* 拍照按钮 */}
              <TouchableOpacity
                onPress={openCamera}
                style={{ alignItems: "center" }}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={["#3b82f6", "#1d4ed8"]}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    shadowColor: "#3b82f6",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 8,
                  }}
                >
                  <Ionicons name="camera" size={32} color="white" />
                </LinearGradient>
                <Text
                  style={{ fontSize: 14, color: "#374151", fontWeight: "600" }}
                >
                  拍照
                </Text>
                <Text style={{ fontSize: 12, color: "#9ca3af" }}>即时记录</Text>
              </TouchableOpacity>

              {/* 相册按钮 */}
              <TouchableOpacity
                onPress={openImageLibrary}
                style={{ alignItems: "center" }}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={["#8b5cf6", "#7c3aed"]}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    shadowColor: "#8b5cf6",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 8,
                  }}
                >
                  <Ionicons name="images" size={32} color="white" />
                </LinearGradient>
                <Text
                  style={{ fontSize: 14, color: "#374151", fontWeight: "600" }}
                >
                  相册
                </Text>
                <Text style={{ fontSize: 12, color: "#9ca3af" }}>多选照片</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: "#eff6ff",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="information-circle"
                size={16}
                color="#3b82f6"
                style={{ marginRight: 6 }}
              />
              <Text style={{ fontSize: 12, color: "#1d4ed8" }}>
                最多可选择9张照片
              </Text>
            </View>
          </View>

          {/* 已选择的照片 */}
          {selectedPhotos.length > 0 && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#374151" }}
                >
                  已选择的照片 ({selectedPhotos.length}/9)
                </Text>
                <TouchableOpacity onPress={() => setSelectedPhotos([])}>
                  <Text style={{ fontSize: 14, color: "#3b82f6" }}>
                    全部删除
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {selectedPhotos.map((photo, index) => (
                  <View
                    key={index}
                    style={{
                      position: "relative",
                      width: "30%",
                      aspectRatio: 1,
                    }}
                  >
                    <Image
                      source={{ uri: photo }}
                      style={{ width: "100%", height: "100%", borderRadius: 8 }}
                    />
                    <TouchableOpacity
                      onPress={() => removePhoto(index)}
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        width: 24,
                        height: 24,
                        backgroundColor: "#ef4444",
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name="close" size={12} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* 生成设置 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: 16,
            }}
          >
            内容设置
          </Text>

          <View style={{ gap: 16 }}>
            {/* 用户描述输入 */}
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#1f2937",
                  }}
                >
                  分享你的心情
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTempDescription(userDescription);
                    setShowFullEditor(true);
                  }}
                  style={{
                    backgroundColor: "#f3f4f6",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="expand"
                    size={14}
                    color="#6b7280"
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      fontWeight: "500",
                    }}
                  >
                    放大编辑
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginBottom: 12,
                }}
              >
                写下这次旅行的感受或者想法...
              </Text>
              <TextInput
                value={userDescription}
                onChangeText={setUserDescription}
                placeholder="记录这一刻的美好心情..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                style={{
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: "#374151",
                  textAlignVertical: "top",
                  minHeight: 100,
                }}
                maxLength={200}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Text style={{ fontSize: 12, color: "#9ca3af" }}>
                  {userDescription.length}/200
                </Text>
                <View></View>
              </View>
            </View>

            {/* 风格 */}
            <TouchableOpacity
              onPress={() => setShowStyleModal(true)}
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#1f2937",
                    }}
                  >
                    内容风格
                  </Text>
                  <Text style={{ fontSize: 14, color: "#6b7280" }}>
                    {articleStyles.find((style) => style.name === articleStyle)
                      ?.desc || "选择你喜欢的内容风格"}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 14, color: "#3b82f6", marginRight: 8 }}
                  >
                    {articleStyle}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 生成按钮 */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          {/* 主要操作按钮 */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
            {/* 存为草稿按钮 */}
            <TouchableOpacity
              onPress={saveDraft}
              style={{ flex: 1 }}
              activeOpacity={0.8}
            >
              <View
                style={{
                  height: 48, // 固定高度
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center", // 垂直居中
                  backgroundColor: "white",
                  borderWidth: 1.5,
                  borderColor: "#e5e7eb",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="bookmark-outline"
                    size={16}
                    color="#6b7280"
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={{
                      color: "#6b7280",
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    存草稿
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* AI润色按钮 */}
            <TouchableOpacity
              onPress={aiPolishContent}
              style={{ flex: 2 }}
              activeOpacity={0.8}
              disabled={isPolishing}
            >
              <LinearGradient
                colors={
                  isPolishing ? ["#9ca3af", "#6b7280"] : ["#667eea", "#764ba2"]
                }
                style={{
                  height: 48, // 固定高度，与草稿按钮一致
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center", // 垂直居中
                  shadowColor: "#667eea",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name={isPolishing ? "hourglass" : "sparkles"}
                    size={16}
                    color="white"
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={{ color: "white", fontSize: 14, fontWeight: "600" }}
                  >
                    {isPolishing ? "AI润色中..." : "AI润色优化"}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* 直接发布按钮 */}
          <TouchableOpacity onPress={generateArticle} activeOpacity={0.8}>
            <View
              style={{
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
                backgroundColor: "#f9fafb",
                borderWidth: 1,
                borderColor: "#e5e7eb",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="send-outline"
                  size={14}
                  color="#9ca3af"
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{ color: "#9ca3af", fontSize: 13, fontWeight: "500" }}
                >
                  直接发布(跳过润色)
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#6b7280",
              marginTop: 12,
            }}
          >
            推荐使用AI润色，让内容更精彩✨
          </Text>

          {/* API状态显示 */}
          <View
            style={{
              marginTop: 8,
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: checkOpenAIConfig() ? "#f0f9ff" : "#fef2f2",
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name={checkOpenAIConfig() ? "checkmark-circle" : "close-circle"}
                size={14}
                color={checkOpenAIConfig() ? "#0ea5e9" : "#ef4444"}
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: checkOpenAIConfig() ? "#0369a1" : "#dc2626",
                  textAlign: "center",
                }}
              >
                {checkOpenAIConfig() ? "AI润色功能已就绪" : "AI润色功能不可用"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 风格选择弹窗 */}
      <Modal
        visible={showStyleModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStyleModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "80%",
            }}
          >
            {/* 弹窗头部 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#1f2937" }}
              >
                选择内容风格
              </Text>
              <TouchableOpacity onPress={() => setShowStyleModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* 风格列表 */}
            <ScrollView style={{ maxHeight: 400 }}>
              <View style={{ padding: 20, gap: 12 }}>
                {articleStyles.map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    onPress={() => {
                      setArticleStyle(style.name);
                      setShowStyleModal(false);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 16,
                      backgroundColor:
                        articleStyle === style.name ? "#eff6ff" : "#f9fafb",
                      borderRadius: 12,
                      borderWidth: articleStyle === style.name ? 2 : 1,
                      borderColor:
                        articleStyle === style.name ? "#3b82f6" : "#e5e7eb",
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor:
                          articleStyle === style.name ? "#3b82f6" : "#6b7280",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      <Ionicons
                        name={style.icon as any}
                        size={20}
                        color="white"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          color: "#1f2937",
                          marginBottom: 4,
                        }}
                      >
                        {style.name}
                      </Text>
                      <Text style={{ fontSize: 14, color: "#6b7280" }}>
                        {style.desc}
                      </Text>
                    </View>
                    {articleStyle === style.name && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#3b82f6"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 润色结果展示弹窗 */}
      <Modal
        visible={showPolishResult}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPolishResult(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              maxHeight: "80%",
            }}
          >
            {/* 弹窗头部 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="sparkles"
                  size={20}
                  color="#667eea"
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "#1f2937" }}
                >
                  AI润色结果
                </Text>
              </View>
              <TouchableOpacity onPress={() => setShowPolishResult(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* 润色内容展示 */}
            <ScrollView style={{ maxHeight: 400 }}>
              <View style={{ padding: 20 }}>
                {/* 原始内容对比 */}
                {userDescription.trim() && (
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#6b7280",
                        marginBottom: 8,
                      }}
                    >
                      原始内容：
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#f9fafb",
                        padding: 12,
                        borderRadius: 8,
                        borderLeftWidth: 3,
                        borderLeftColor: "#e5e7eb",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#374151",
                          lineHeight: 20,
                        }}
                      >
                        {userDescription}
                      </Text>
                    </View>
                  </View>
                )}

                {/* AI润色后内容 */}
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#667eea",
                      marginBottom: 8,
                    }}
                  >
                    AI润色后：
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#eff6ff",
                      padding: 12,
                      borderRadius: 8,
                      borderLeftWidth: 3,
                      borderLeftColor: "#3b82f6",
                    }}
                  >
                    <Text
                      style={{ fontSize: 14, color: "#1f2937", lineHeight: 22 }}
                    >
                      {polishedContent}
                    </Text>
                  </View>
                </View>

                {/* 优化说明 */}
                <View
                  style={{
                    marginTop: 16,
                    backgroundColor: "#fef3c7",
                    padding: 12,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="bulb"
                    size={16}
                    color="#d97706"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 12, color: "#92400e", flex: 1 }}>
                    AI已为您优化了语言表达，增加了情感色彩和标签
                  </Text>
                </View>
              </View>
            </ScrollView>

            {/* 操作按钮 */}
            <View style={{ padding: 20, gap: 12 }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                {/* 使用原始内容 */}
                <TouchableOpacity
                  onPress={() => {
                    setShowPolishResult(false);
                    Alert.alert("发布成功", "已使用原始内容发布到朋友圈", [
                      { text: "确定", onPress: () => router.back() },
                    ]);
                  }}
                  style={{ flex: 1 }}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      paddingVertical: 12,
                      borderRadius: 8,
                      alignItems: "center",
                      backgroundColor: "white",
                      borderWidth: 1.5,
                      borderColor: "#e5e7eb",
                    }}
                  >
                    <Text
                      style={{
                        color: "#6b7280",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      使用原始内容
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* 使用润色内容 */}
                <TouchableOpacity
                  onPress={() => {
                    setShowPolishResult(false);
                    Alert.alert("发布成功", "已使用AI润色内容发布到朋友圈", [
                      { text: "确定", onPress: () => router.back() },
                    ]);
                  }}
                  style={{ flex: 1 }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#667eea", "#764ba2"]}
                    style={{
                      paddingVertical: 12,
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      使用润色内容
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* 继续编辑按钮 */}
              <TouchableOpacity
                onPress={() => {
                  setUserDescription(polishedContent);
                  setShowPolishResult(false);
                }}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    paddingVertical: 10,
                    borderRadius: 6,
                    alignItems: "center",
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name="create-outline"
                      size={14}
                      color="#6b7280"
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      style={{
                        color: "#6b7280",
                        fontSize: 13,
                        fontWeight: "500",
                      }}
                    >
                      将润色内容填入编辑框继续修改
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 全屏编辑弹窗 */}
      <Modal
        visible={showFullEditor}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setShowFullEditor(false)}
      >
        <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
          {/* 头部导航 */}
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={{ paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setShowFullEditor(false)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "500" }}
                >
                  取消
                </Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                编辑内容
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setUserDescription(tempDescription);
                  setShowFullEditor(false);
                }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: "white",
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{ color: "#667eea", fontSize: 14, fontWeight: "600" }}
                >
                  保存
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* 编辑区域 */}
          <View style={{ flex: 1, padding: 20 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 12,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#1f2937" }}
                >
                  记录你的旅行心情
                </Text>
                <Text style={{ fontSize: 14, color: "#9ca3af" }}>
                  {tempDescription.length}/200
                </Text>
              </View>

              <TextInput
                value={tempDescription}
                onChangeText={setTempDescription}
                placeholder="在这里尽情发挥，记录你的旅行感受、见闻、心情...&#10;&#10;你可以描述：&#10;• 看到的美丽风景&#10;• 品尝的当地美食&#10;• 遇到的有趣人事&#10;• 内心的感悟体会&#10;• 难忘的精彩瞬间"
                placeholderTextColor="#9ca3af"
                multiline
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: "#374151",
                  textAlignVertical: "top",
                  lineHeight: 24,
                }}
                maxLength={200}
                autoFocus={true}
              />

              {/* 底部提示 */}
              <View
                style={{
                  backgroundColor: "#f8fafc",
                  padding: 12,
                  borderRadius: 8,
                  marginTop: 16,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="bulb-outline"
                  size={16}
                  color="#6b7280"
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 12, color: "#6b7280", flex: 1 }}>
                  写完后可以使用AI润色功能，让表达更生动有趣
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
