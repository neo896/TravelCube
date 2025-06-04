// API配置管理
export const API_CONFIG = {
  // OpenAI配置
  openai: {
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    baseURL: process.env.EXPO_PUBLIC_OPENAI_BASE_URL || 'https://api.openai.com/v1',
    model: process.env.EXPO_PUBLIC_OPENAI_MODEL || 'gpt-3.5-turbo',
    maxTokens: 500,
    temperature: 0.8,
  },
  
  // 请求配置
  request: {
    timeout: 30000, // 30秒超时
    retryAttempts: 2, // 重试次数
    retryDelay: 1000, // 重试延迟(毫秒)
  },
};

// 检查配置是否完整
export function validateConfig(): {
  isValid: boolean;
  missingKeys: string[];
} {
  const missingKeys: string[] = [];
  
  if (!API_CONFIG.openai.apiKey) {
    missingKeys.push('EXPO_PUBLIC_OPENAI_API_KEY');
  }
  
  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
}

// 获取配置状态信息
export function getConfigStatus(): string {
  const { isValid, missingKeys } = validateConfig();
  
  if (isValid) {
    return 'API配置完整，已启用AI润色功能';
  }
  
  return `缺少配置项: ${missingKeys.join(', ')}`;
} 