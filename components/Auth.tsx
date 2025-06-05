import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";
import { appNames, titleOptions } from "./AuthTitles";
import { useCustomAlert } from "./CustomAlert";
import TravelCubeIconMinimal from "./TravelCubeIconMinimal";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [titleStyle, setTitleStyle] =
    useState<keyof typeof titleOptions>("modern"); // 可以改变这里来切换风格

  const { showAlert, AlertComponent } = useCustomAlert();

  // 获取当前标题
  const currentTitles = titleOptions[titleStyle];
  const titles = isLogin ? currentTitles.login : currentTitles.register;

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      showAlert({
        title: "登录失败",
        message: error.message,
        type: "error",
      });
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });

    if (error) {
      showAlert({
        title: "注册失败",
        message: error.message,
        type: "error",
      });
    } else if (!session) {
      showAlert({
        title: "注册成功",
        message: "请检查您的邮箱以验证账户！",
        type: "success",
      });
    }
    setLoading(false);
  }

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      showAlert({
        title: "提示",
        message: "请填写完整的邮箱和密码",
        type: "warning",
      });
      return;
    }

    if (isLogin) {
      signInWithEmail();
    } else {
      signUpWithEmail();
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <AlertComponent />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <LinearGradient colors={["#4f46e5", "#7c3aed"]} className="flex-1">
            <View className="flex-1 justify-center px-8">
              {/* 标题区域 */}
              <View className="items-center mb-12">
                <View
                  className="w-24 h-24 bg-white rounded-3xl justify-center items-center mb-6 shadow-2xl"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                >
                  <TravelCubeIconMinimal size={60} primaryColor="#4f46e5" />
                </View>
                <Text
                  className="text-4xl font-bold text-white mb-3"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.3)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 3,
                  }}
                >
                  {appNames.current}
                </Text>
                <Text
                  className="text-lg text-white opacity-90 text-center"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.2)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                    lineHeight: 28,
                  }}
                >
                  {titles.main}
                </Text>
                <Text
                  className="text-sm text-white opacity-75 text-center mt-2"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.2)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 1,
                    fontStyle: "italic",
                  }}
                >
                  {titles.sub}
                </Text>
              </View>

              {/* 表单区域 */}
              <View className="space-y-4">
                {/* 邮箱输入 */}
                <View className="bg-white bg-opacity-90 rounded-xl p-2 shadow-md">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="mail"
                      size={20}
                      color="#6b7280"
                      className="mr-3"
                    />
                    <TextInput
                      className="flex-1 text-gray-800 text-base ml-3"
                      placeholder="邮箱地址"
                      placeholderTextColor="#9ca3af"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* 密码输入 */}
                <View className="bg-white bg-opacity-90 rounded-xl p-2 shadow-md mt-4">
                  <View className="flex-row items-center">
                    <Ionicons name="lock-closed" size={20} color="#6b7280" />
                    <TextInput
                      className="flex-1 text-gray-800 text-base ml-3"
                      placeholder="密码"
                      placeholderTextColor="#9ca3af"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="ml-2"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={20}
                        color="#6b7280"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 登录/注册按钮 */}
                <TouchableOpacity
                  className={`bg-white rounded-xl p-4 items-center mt-6 shadow-lg ${
                    loading ? "opacity-50" : ""
                  }`}
                  onPress={handleSubmit}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text className="text-base font-bold text-purple-600">
                    {loading
                      ? isLogin
                        ? "登录中..."
                        : "注册中..."
                      : isLogin
                      ? "登录"
                      : "注册"}
                  </Text>
                </TouchableOpacity>

                {/* 切换登录/注册 */}
                <View className="flex-row justify-center items-center mt-6">
                  <Text
                    className="text-white text-base"
                    style={{
                      textShadowColor: "rgba(0, 0, 0, 0.3)",
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 1,
                    }}
                  >
                    {isLogin ? "还没有账户？" : "已有账户？"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsLogin(!isLogin)}
                    className="ml-2"
                  >
                    <Text
                      className="text-white font-bold underline text-base"
                      style={{
                        textShadowColor: "rgba(0, 0, 0, 0.3)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 1,
                      }}
                    >
                      {isLogin ? "立即注册" : "立即登录"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* 忘记密码 */}
                {isLogin && (
                  <TouchableOpacity className="items-center mt-4">
                    <Text
                      className="text-white underline"
                      style={{
                        textShadowColor: "rgba(0, 0, 0, 0.3)",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 1,
                      }}
                    >
                      忘记密码？
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
