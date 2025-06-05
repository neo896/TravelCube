import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, View } from "react-native";

interface TravelCubeIconSimpleProps {
  size?: number;
  primaryColor?: string;
  animated?: boolean;
}

export const TravelCubeIconSimple: React.FC<TravelCubeIconSimpleProps> = ({
  size = 64,
  primaryColor = "#ffffff",
  animated = true,
}) => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (animated) {
      // 旋转动画
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        })
      ).start();

      // 脉动动画
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animated, rotateAnim, pulseAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 背景立方体 */}
      <Animated.View
        style={{
          position: "absolute",
          width: size * 0.9,
          height: size * 0.9,
          backgroundColor: primaryColor,
          opacity: 0.15,
          borderRadius: size * 0.18,
          transform: [
            { rotate: animated ? rotateInterpolate : "0deg" },
            { scale: animated ? pulseAnim : 1 },
          ],
        }}
      />

      {/* 中间立方体 */}
      <Animated.View
        style={{
          position: "absolute",
          width: size * 0.7,
          height: size * 0.7,
          backgroundColor: primaryColor,
          opacity: 0.3,
          borderRadius: size * 0.15,
          transform: [{ rotate: animated ? rotateInterpolate : "45deg" }],
        }}
      />

      {/* 内部立方体 */}
      <View
        style={{
          position: "absolute",
          width: size * 0.5,
          height: size * 0.5,
          backgroundColor: primaryColor,
          opacity: 0.5,
          borderRadius: size * 0.12,
        }}
      />

      {/* 中心飞机图标 */}
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: size * 0.08,
          width: size * 0.4,
          height: size * 0.4,
        }}
      >
        <Ionicons name="airplane" size={size * 0.25} color={primaryColor} />
      </View>

      {/* 装饰点 - 更明显 */}
      <View
        style={{
          position: "absolute",
          top: size * 0.05,
          right: size * 0.1,
          width: size * 0.12,
          height: size * 0.12,
          backgroundColor: "#ffffff",
          borderRadius: size * 0.06,
          opacity: 0.9,
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: size * 0.1,
          left: size * 0.05,
          width: size * 0.1,
          height: size * 0.1,
          backgroundColor: "#ffffff",
          borderRadius: size * 0.05,
          opacity: 0.8,
        }}
      />
    </View>
  );
};

export default TravelCubeIconSimple;
