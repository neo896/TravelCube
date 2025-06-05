import { Redirect } from "expo-router";

export default function Index() {
  // 认证状态检查现在在_layout.tsx中处理
  // 如果到达这里，说明用户已经登录，直接重定向到主页面
  return <Redirect href="/(tabs)" />;
}
