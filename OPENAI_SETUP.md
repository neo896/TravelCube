# TravelCube - OpenAI AI润色功能配置指南

## 🚀 功能介绍

TravelCube 现已集成 OpenAI ChatGPT，为您的旅行分享提供智能润色服务。AI可以根据您的照片数量、选择的风格和描述内容，生成生动有趣的旅行文案。

## 📋 配置步骤

### 1. 获取 OpenAI API Key

1. 访问 [OpenAI Platform](https://platform.openai.com)
2. 注册并登录账号
3. 进入 [API Keys 页面](https://platform.openai.com/api-keys)
4. 点击 "Create new secret key" 创建新密钥
5. 复制生成的 API Key（以 `sk-` 开头）

### 2. 配置环境变量

在项目根目录创建 `.env` 文件：

```env
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

示例：
```env
EXPO_PUBLIC_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. 可选配置

您也可以自定义以下配置：

```env
# 使用不同的模型（默认：gpt-3.5-turbo）
EXPO_PUBLIC_OPENAI_MODEL=gpt-4

# 自定义API地址（如使用代理）
EXPO_PUBLIC_OPENAI_BASE_URL=https://your-proxy.com/v1
```

### 4. 重启应用

配置完成后，重启 Expo 开发服务器：

```bash
npm start
```

## ✨ 功能特性

### 智能润色
- 📝 根据用户输入的描述进行优化
- 🎨 支持9种不同的文案风格
- 📸 结合照片数量智能生成内容
- 🏷️ 自动添加相关话题标签
- 😊 适当添加表情符号

### 故障转移
- 🔄 API调用失败时自动使用本地润色
- ⚡ 支持重试机制，提高成功率
- 📊 详细的错误日志和状态显示

### 用户体验
- 💡 实时显示API配置状态
- 🎯 智能提示配置方法
- 🔍 测试功能验证配置正确性

## 🎯 使用方法

1. **选择照片**：从相机拍摄或相册选择旅行照片
2. **输入描述**：写下您的旅行感受（可选）
3. **选择风格**：从9种风格中选择最适合的
4. **AI润色**：点击"AI润色优化"按钮
5. **查看结果**：预览润色后的内容并选择使用

## 🔧 故障排除

### 配置检查
在开发者控制台中查看配置状态：
```javascript
import { quickConfigCheck } from './services/api/test';
quickConfigCheck();
```

### 常见问题

**Q: 显示"OpenAI API Key未配置"怎么办？**
A: 检查 `.env` 文件是否存在，确保 API Key 正确填写。

**Q: API调用失败怎么办？**
A: 检查网络连接、API Key余额、或尝试使用代理。

**Q: 如何测试配置是否正确？**
A: 使用测试功能：
```javascript
import { testOpenAIAPI } from './services/api/test';
testOpenAIAPI().then(result => console.log(result));
```

## 💰 费用说明

- OpenAI API按使用量计费
- GPT-3.5-turbo 价格约为每1000个token $0.001-0.002
- 单次润色大约消耗200-500个token
- 建议设置使用限额避免意外费用

## 🔒 安全注意事项

- ⚠️ **不要将 `.env` 文件提交到版本控制系统**
- 🔑 API Key 是敏感信息，请妥善保管
- 🚫 不要在代码中硬编码 API Key
- 📱 考虑在生产环境中使用服务器端代理

## 📈 高级配置

### 自定义模型参数

在 `services/api/config.ts` 中可以调整：

```typescript
export const API_CONFIG = {
  openai: {
    maxTokens: 500,      // 最大生成长度
    temperature: 0.8,    // 创意度 (0-1)
    // ...
  }
};
```

### 添加自定义风格

在润色提示词中可以添加更多个性化的风格定义。

## 🤝 技术支持

如遇到问题，请：
1. 查看控制台日志
2. 检查API配置状态
3. 运行测试功能验证
4. 查看OpenAI官方文档

---

**祝您使用愉快！享受AI驱动的智能旅行分享体验** ✈️✨ 