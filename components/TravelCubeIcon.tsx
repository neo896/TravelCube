import React from "react";
import { Animated, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

interface TravelCubeIconProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  animated?: boolean;
}

export const TravelCubeIcon: React.FC<TravelCubeIconProps> = ({
  size = 64,
  primaryColor = "#ffffff",
  secondaryColor = "#e0f2fe",
  animated = true,
}) => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [animated, rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View
        style={{
          transform: [{ rotate: animated ? rotateInterpolate : "0deg" }],
          width: size,
          height: size,
        }}
      >
        <Svg width={size} height={size} viewBox="0 0 120 120">
          <Defs>
            <LinearGradient
              id="cubeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
              <Stop offset="50%" stopColor={secondaryColor} stopOpacity="0.9" />
              <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.8" />
            </LinearGradient>
            <LinearGradient
              id="planeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <Stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <Stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.9" />
            </LinearGradient>
          </Defs>

          {/* 立方体框架 - 更粗的线条 */}
          <Path
            d="M 30 30 L 70 30 L 90 50 L 50 50 Z"
            fill="url(#cubeGradient)"
            stroke={primaryColor}
            strokeWidth="3"
            opacity="0.9"
          />

          <Path
            d="M 70 30 L 90 50 L 90 90 L 70 70 Z"
            fill={primaryColor}
            opacity="0.8"
            stroke={primaryColor}
            strokeWidth="3"
          />

          <Path
            d="M 30 30 L 50 50 L 50 90 L 30 70 Z"
            fill={primaryColor}
            opacity="0.85"
            stroke={primaryColor}
            strokeWidth="3"
          />

          {/* 飞机主体 - 白色填充更显眼 */}
          <Path
            d="M 45 45 L 75 45 L 80 40 L 85 40 L 82 45 L 82 55 L 85 55 L 80 60 L 75 55 L 45 55 L 40 60 L 35 60 L 40 55 L 40 45 L 35 45 L 40 40 Z"
            fill="url(#planeGradient)"
            stroke={primaryColor}
            strokeWidth="2"
          />

          {/* 飞机窗户 - 更大更明显 */}
          <Circle cx="65" cy="50" r="4" fill={primaryColor} opacity="1" />
          <Circle cx="55" cy="50" r="3" fill={primaryColor} opacity="0.9" />

          {/* 云朵 - 更明显 */}
          <Circle cx="25" cy="25" r="5" fill={primaryColor} opacity="0.6" />
          <Circle cx="30" cy="22" r="4" fill={primaryColor} opacity="0.6" />
          <Circle cx="28" cy="28" r="3.5" fill={primaryColor} opacity="0.6" />

          <Circle cx="95" cy="85" r="4" fill={primaryColor} opacity="0.5" />
          <Circle cx="100" cy="82" r="3.5" fill={primaryColor} opacity="0.5" />
          <Circle cx="98" cy="88" r="3" fill={primaryColor} opacity="0.5" />

          {/* 装饰点 - 更大更明显 */}
          <Circle cx="20" cy="70" r="3" fill="#ffffff" opacity="0.8" />
          <Circle cx="15" cy="85" r="2.5" fill="#ffffff" opacity="0.8" />
          <Circle cx="100" cy="20" r="3" fill="#ffffff" opacity="0.8" />
          <Circle cx="105" cy="30" r="2.5" fill="#ffffff" opacity="0.8" />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default TravelCubeIcon;
