import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

interface TravelCubeIconMinimalProps {
  size?: number;
  primaryColor?: string;
}

export const TravelCubeIconMinimal: React.FC<TravelCubeIconMinimalProps> = ({
  size = 64,
  primaryColor = "#4f46e5",
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* 主立方体背景 */}
      <View
        style={{
          width: size * 0.85,
          height: size * 0.85,
          backgroundColor: primaryColor,
          borderRadius: size * 0.2,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {/* 内部白色圆形 */}
        <View
          style={{
            width: size * 0.6,
            height: size * 0.6,
            backgroundColor: "#ffffff",
            borderRadius: size * 0.3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 飞机图标 */}
          <Ionicons name="airplane" size={size * 0.3} color={primaryColor} />
        </View>
      </View>

      {/* 右上角装饰 */}
      <View
        style={{
          position: "absolute",
          top: size * 0.05,
          right: size * 0.05,
          width: size * 0.15,
          height: size * 0.15,
          backgroundColor: "#ffffff",
          borderRadius: size * 0.075,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        }}
      />

      {/* 左下角装饰 */}
      <View
        style={{
          position: "absolute",
          bottom: size * 0.05,
          left: size * 0.05,
          width: size * 0.12,
          height: size * 0.12,
          backgroundColor: "#ffffff",
          borderRadius: size * 0.06,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        }}
      />
    </View>
  );
};

export default TravelCubeIconMinimal;
