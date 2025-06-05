import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface AlertButton {
  text: string;
  style?: "default" | "cancel" | "destructive";
  onPress?: () => void | Promise<void>;
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}

const alertTypeConfig = {
  success: {
    icon: "checkmark-circle",
    iconColor: "#10b981",
    gradientColors: ["#f0fdf4", "#dcfce7"] as const,
    borderColor: "#10b981",
  },
  error: {
    icon: "close-circle",
    iconColor: "#ef4444",
    gradientColors: ["#fef2f2", "#fee2e2"] as const,
    borderColor: "#ef4444",
  },
  warning: {
    icon: "warning",
    iconColor: "#f59e0b",
    gradientColors: ["#fffbeb", "#fef3c7"] as const,
    borderColor: "#f59e0b",
  },
  info: {
    icon: "information-circle",
    iconColor: "#3b82f6",
    gradientColors: ["#eff6ff", "#dbeafe"] as const,
    borderColor: "#3b82f6",
  },
};

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons = [{ text: "确定", style: "default" }],
  type = "info",
  onClose,
}) => {
  const config = alertTypeConfig[type];
  const scaleAnim = new Animated.Value(0);
  const [loadingButtonIndex, setLoadingButtonIndex] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      scaleAnim.setValue(0);
      setLoadingButtonIndex(null);
    }
  }, [visible]);

  const handleButtonPress = async (
    button: AlertButton,
    buttonIndex: number
  ) => {
    if (button.onPress) {
      try {
        setLoadingButtonIndex(buttonIndex);
        await button.onPress();
      } catch (error) {
        console.error("Button press error:", error);
      } finally {
        setLoadingButtonIndex(null);
      }
    }
    if (onClose) {
      onClose();
    }
  };

  const getButtonStyle = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case "destructive":
        return {
          backgroundColor: "#ef4444",
          textColor: "white",
        };
      case "cancel":
        return {
          backgroundColor: "transparent",
          textColor: "#6b7280",
          borderColor: "#e5e7eb",
        };
      default:
        return {
          backgroundColor: "#3b82f6",
          textColor: "white",
        };
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 40,
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            width: width - 80,
            maxWidth: 340,
          }}
        >
          <LinearGradient
            colors={config.gradientColors}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: config.borderColor + "30",
            }}
          >
            <View style={{ backgroundColor: "white", borderRadius: 20 }}>
              {/* 图标和标题区域 */}
              <View
                style={{
                  alignItems: "center",
                  paddingTop: 32,
                  paddingHorizontal: 24,
                  paddingBottom: 16,
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: config.iconColor + "15",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Ionicons
                    name={config.icon as any}
                    size={32}
                    color={config.iconColor}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "#1f2937",
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  {title}
                </Text>

                {message && (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#6b7280",
                      textAlign: "center",
                      lineHeight: 24,
                      paddingHorizontal: 8,
                    }}
                  >
                    {message}
                  </Text>
                )}
              </View>

              {/* 按钮区域 */}
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingBottom: 24,
                  paddingTop: 8,
                }}
              >
                {buttons.length === 1 ? (
                  // 单个按钮
                  <TouchableOpacity
                    onPress={() => handleButtonPress(buttons[0], 0)}
                    activeOpacity={0.8}
                    disabled={loadingButtonIndex !== null}
                  >
                    <LinearGradient
                      colors={
                        buttons[0].style === "destructive"
                          ? ["#ef4444", "#dc2626"]
                          : ["#3b82f6", "#2563eb"]
                      }
                      style={{
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      {loadingButtonIndex === 0 ? (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <ActivityIndicator
                            size="small"
                            color="white"
                            style={{ marginRight: 8 }}
                          />
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: "600",
                            }}
                          >
                            {buttons[0].text}
                          </Text>
                        </View>
                      ) : (
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "600",
                          }}
                        >
                          {buttons[0].text}
                        </Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  // 多个按钮
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    {buttons.map((button, index) => {
                      const buttonStyle = getButtonStyle(button.style);
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleButtonPress(button, index)}
                          style={{ flex: 1 }}
                          activeOpacity={0.8}
                          disabled={loadingButtonIndex !== null}
                        >
                          {button.style === "cancel" ? (
                            <View
                              style={{
                                paddingVertical: 14,
                                borderRadius: 12,
                                alignItems: "center",
                                backgroundColor: "transparent",
                                borderWidth: 1.5,
                                borderColor: "#e5e7eb",
                                opacity:
                                  loadingButtonIndex !== null &&
                                  loadingButtonIndex !== index
                                    ? 0.5
                                    : 1,
                              }}
                            >
                              {loadingButtonIndex === index ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <ActivityIndicator
                                    size="small"
                                    color="#6b7280"
                                    style={{ marginRight: 8 }}
                                  />
                                  <Text
                                    style={{
                                      color: buttonStyle.textColor,
                                      fontSize: 16,
                                      fontWeight: "600",
                                    }}
                                  >
                                    {button.text}
                                  </Text>
                                </View>
                              ) : (
                                <Text
                                  style={{
                                    color: buttonStyle.textColor,
                                    fontSize: 16,
                                    fontWeight: "600",
                                  }}
                                >
                                  {button.text}
                                </Text>
                              )}
                            </View>
                          ) : (
                            <LinearGradient
                              colors={
                                button.style === "destructive"
                                  ? ["#ef4444", "#dc2626"]
                                  : ["#3b82f6", "#2563eb"]
                              }
                              style={{
                                paddingVertical: 14,
                                borderRadius: 12,
                                alignItems: "center",
                                opacity:
                                  loadingButtonIndex !== null &&
                                  loadingButtonIndex !== index
                                    ? 0.5
                                    : 1,
                              }}
                            >
                              {loadingButtonIndex === index ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <ActivityIndicator
                                    size="small"
                                    color="white"
                                    style={{ marginRight: 8 }}
                                  />
                                  <Text
                                    style={{
                                      color: "white",
                                      fontSize: 16,
                                      fontWeight: "600",
                                    }}
                                  >
                                    {button.text}
                                  </Text>
                                </View>
                              ) : (
                                <Text
                                  style={{
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: "600",
                                  }}
                                >
                                  {button.text}
                                </Text>
                              )}
                            </LinearGradient>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

// 提供一个便捷的使用方法
export class CustomAlertManager {
  private static alertComponent: React.RefObject<any> = React.createRef();

  static show(options: Omit<CustomAlertProps, "visible" | "onClose">) {
    if (this.alertComponent.current) {
      this.alertComponent.current.show(options);
    }
  }

  static setRef(ref: any) {
    this.alertComponent.current = ref;
  }
}

// Hook for easier usage
export const useCustomAlert = () => {
  const [alertConfig, setAlertConfig] = React.useState<CustomAlertProps>({
    visible: false,
    title: "",
  });

  const showAlert = React.useCallback(
    (config: Omit<CustomAlertProps, "visible" | "onClose">) => {
      setAlertConfig({
        ...config,
        visible: true,
        onClose: () => setAlertConfig((prev) => ({ ...prev, visible: false })),
      });
    },
    []
  );

  const hideAlert = React.useCallback(() => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  }, []);

  return {
    showAlert,
    hideAlert,
    AlertComponent: () => <CustomAlert {...alertConfig} />,
  };
};
