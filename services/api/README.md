# OpenAI API 配置说明

## 环境变量配置

请在项目根目录创建 `.env` 文件，添加以下配置：

```env
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

## 获取 OpenAI API Key

1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 登录你的OpenAI账号
3. 点击 "Create new secret key" 创建新的API密钥
4. 复制生成的API密钥到环境变量中

## 使用说明

环境变量配置完成后，AI润色功能将自动使用OpenAI API进行内容生成。如果API调用失败，系统会自动回退到本地生成的内容。

## 注意事项

- API Key是敏感信息，请不要提交到版本控制系统
- 确保 `.env` 文件已添加到 `.gitignore` 中
- OpenAI API调用会产生费用，请合理使用 