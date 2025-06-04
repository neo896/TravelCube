import OpenAI from 'openai';
import { API_CONFIG, validateConfig } from './config';

// OpenAI配置
const openai = new OpenAI({
  apiKey: API_CONFIG.openai.apiKey,
  baseURL: API_CONFIG.openai.baseURL,
  dangerouslyAllowBrowser: true, // 允许在浏览器环境中使用
});

// 重试功能
async function retryWithDelay<T>(
  fn: () => Promise<T>,
  attempts: number = API_CONFIG.request.retryAttempts,
  delay: number = API_CONFIG.request.retryDelay
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) {
      throw error;
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithDelay(fn, attempts - 1, delay);
  }
}

// 生成文案的提示词模板
function generatePrompt(userDescription: string, photos: string[], style: string): string {
  return `你是一个专业的旅行文案写手，请帮助用户润色他们的旅行内容。

用户信息：
- 用户描述：${userDescription || '用户未提供具体描述'}
- 照片数量：${photos.length}张
- 期望风格：${style}

请按照以下要求润色内容：
1. 如果用户有具体描述，在保持原意的基础上进行润色和优化
2. 如果用户没有描述，根据照片数量和风格生成合适的内容
3. 风格要符合用户选择的"${style}"特色
4. 内容要生动有趣，有感染力
5. 适当添加emoji表情符号
6. 添加3-5个相关的话题标签
7. 内容长度控制在100-200字左右
8. 语言要自然流畅，符合社交媒体发布习惯
9. 请使用中文回复

请直接返回润色后的内容，不要包含其他说明文字。`;
}

// 生成备用内容
function generateFallbackContent(userDescription: string, photos: string[], style: string): string {
  if (userDescription.trim()) {
    return `✨ ${userDescription.trim()}\n\n这次旅行真的让我收获满满，每一个瞬间都值得珍藏。看着这些照片，仿佛又回到了那个美好的时光。生活就是要这样，用心感受每一份美好，记录下每一个值得纪念的时刻。\n\n📸 ${photos.length}张美图记录\n🎨 ${style}风格\n\n#旅行日记 #美好时光 #生活记录`;
  } else {
    return `🌟 今天的旅行真是太棒了！\n\n从照片中可以感受到满满的快乐和美好。每一张照片都诉说着不同的故事，每一个角度都展现着独特的魅力。这就是旅行的意义吧，不只是到达某个地方，而是在路上收获的那些珍贵回忆。\n\n📸 ${photos.length}张精选美图\n🎨 ${style}风格\n\n#旅行打卡 #美好生活 #记录时光`;
  }
}

// AI润色接口
export async function polishTravelContent({
  userDescription,
  photos,
  style,
}: {
  userDescription: string;
  photos: string[];
  style: string;
}): Promise<string> {
  // 检查配置
  const { isValid } = validateConfig();
  if (!isValid) {
    throw new Error('OpenAI API未配置，无法使用AI润色功能');
  }

  try {
    const polishedContent = await retryWithDelay(async () => {
      const completion = await openai.chat.completions.create({
        model: API_CONFIG.openai.model,
        messages: [
          {
            role: "system",
            content: "你是一个专业的旅行文案写手，擅长写出生动有趣的旅行分享内容。你总是用中文回复。"
          },
          {
            role: "user",
            content: generatePrompt(userDescription, photos, style)
          }
        ],
        max_tokens: API_CONFIG.openai.maxTokens,
        temperature: API_CONFIG.openai.temperature,
      });

      const content = completion.choices[0]?.message?.content?.trim();
      
      if (!content) {
        throw new Error('AI未能生成润色内容');
      }

      return content;
    });

    return polishedContent;
  } catch (error) {
    console.error('OpenAI API调用失败:', error);
    
    // 记录错误详情
    if (error instanceof Error) {
      console.error('错误详情:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    }
    
    // 重新抛出错误而不是返回备用内容
    throw error;
  }
}

// 检查API Key是否配置
export function checkOpenAIConfig(): boolean {
  return validateConfig().isValid;
}

// 获取配置状态
export function getOpenAIStatus(): string {
  const { isValid, missingKeys } = validateConfig();
  
  if (isValid) {
    return '✅ OpenAI API已配置';
  }
  
  return `❌ 缺少配置: ${missingKeys.join(', ')}`;
} 