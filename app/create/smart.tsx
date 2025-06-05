import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useCustomAlert } from "../../components/CustomAlert";

// 新增数据类型定义
interface AIAnalysisResult {
  scenes: string[];
  emotions: string[];
  people: string;
  recommendedStyle: string;
  confidence: number;
  suggestions: string[];
}

interface ContentSource {
  type: 'photo' | 'text' | 'location';
  id: string;
  content: any;
  analysis?: any;
  timestamp?: string;
}

export default function SmartCreate() {
  const [step, setStep] = useState(1); // 从内容收集开始
  const [contentSources, setContentSources] = useState<ContentSource[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [targetAudience, setTargetAudience] = useState<string>("");
  const [articleDetail, setArticleDetail] = useState(50);
  const [dynamicQuestions, setDynamicQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [travelTime, setTravelTime] = useState<string>("");
  const [travelLocation, setTravelLocation] = useState<string>("");

  const { showAlert, AlertComponent } = useCustomAlert();

  // 动态生成的情绪标签（基于AI分析）
  const [availableMoods, setAvailableMoods] = useState([
    { emoji: "😌", label: "放松" },
    { emoji: "💕", label: "浪漫" },
    { emoji: "🤩", label: "兴奋" },
    { emoji: "🥰", label: "幸福" },
    { emoji: "😍", label: "惊艳" },
    { emoji: "🤔", label: "思考" },
    { emoji: "✨", label: "感动" },
    { emoji: "🎉", label: "庆祝" },
  ]);

  const styles = [
    { id: "浪漫情侣", title: "💕 浪漫情侣", desc: "甜蜜温馨的爱情旅行记录" },
    { id: "社交分享", title: "📱 社交分享", desc: "适合小红书、朋友圈的种草文" },
    { id: "深度游记", title: "📖 深度游记", desc: "详细的文化历史背景介绍" },
    { id: "美食探店", title: "🍜 美食探店", desc: "专注美食体验的垂直内容" },
    { id: "户外探险", title: "🏔️ 户外探险", desc: "刺激的户外活动和冒险经历" },
    { id: "文艺慢游", title: "🎨 文艺慢游", desc: "注重文化体验的深度旅行" },
  ];

  const audiences = ["情侣/夫妻", "单身旅行者", "亲子家庭", "年轻人", "银发族", "商务人士"];

  // 模拟AI分析照片内容
  const analyzePhotos = async (photos: string[]) => {
    setIsAnalyzing(true);
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟AI分析结果 - 更加详细和实用
    const mockAnalysis: AIAnalysisResult = {
      scenes: ["海滩日落", "城市夜景", "餐厅用餐", "街头漫步", "景点合影"],
      emotions: ["放松", "浪漫", "幸福"],
      people: "2人（情侣）",
      recommendedStyle: "浪漫情侣",
      confidence: 0.89,
      suggestions: [
        "检测到5张照片的场景变化，建议按地点和场景组织文章结构",
        "识别到海滩、日落、城市等不同场景，可以按空间逻辑安排叙述",
        "发现美食和街景元素，适合加入视觉描述和地点介绍",
        "检测到多人合影，建议加入人物互动和社交体验描述"
      ]
    };
    
    setAiAnalysis(mockAnalysis);
    setSelectedMoods(mockAnalysis.emotions);
    setSelectedStyle(mockAnalysis.recommendedStyle);
    
    // 基于分析结果生成动态问题
    generateDynamicQuestions(mockAnalysis);
    setIsAnalyzing(false);
  };

  // 基于AI分析结果生成个性化问题
  const generateDynamicQuestions = (analysis: AIAnalysisResult) => {
    const questions = [];
    
    if (analysis.scenes.includes("海滩日落")) {
      questions.push({
        id: "sunset_feeling",
        question: "🌅 看到日落的那一刻，你的内心有什么感受？",
        placeholder: "比如：时间仿佛静止了，只有我们两个人..."
      });
    }
    
    if (analysis.scenes.includes("餐厅用餐")) {
      questions.push({
        id: "food_experience",
        question: "🍽️ 这顿饭有什么特别的地方？印象最深的是什么？",
        placeholder: "分享这次用餐的特别之处..."
      });
    }
    
    if (analysis.people.includes("情侣")) {
      questions.push({
        id: "couple_moment",
        question: "💑 和TA一起的这次旅行，有哪个瞬间让你觉得特别甜蜜？",
        placeholder: "记录你们之间的美好时光..."
      });
    }
    
    // 通用问题
    questions.push({
      id: "memorable_moment",
      question: "✨ 这次旅行最难忘的是什么？为什么？",
      placeholder: "描述那个让你印象最深刻的瞬间..."
    });
    
    setDynamicQuestions(questions);
  };

  const addContentSource = (type: ContentSource['type'], content: any) => {
    const newSource: ContentSource = {
      type,
      id: Date.now().toString(),
      content,
      timestamp: new Date().toISOString()
    };
    setContentSources(prev => [...prev, newSource]);
  };

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const proceedToAnalysis = () => {
    if (contentSources.filter(s => s.type === 'photo').length === 0) {
      showAlert({
        title: "提示",
        message: "请至少上传一张照片进行AI分析",
        type: "info",
      });
      return;
    }
    
    setStep(2);
    // 开始AI分析
    analyzePhotos(contentSources.filter(s => s.type === 'photo').map(s => s.content));
  };

  const generateArticle = () => {
    if (!aiAnalysis) {
      showAlert({
        title: "提示",
        message: "请等待AI分析完成",
        type: "info",
      });
      return;
    }

    if (selectedMoods.length === 0) {
      showAlert({
        title: "提示",
        message: "请至少选择一个情绪标签",
        type: "info",
      });
      return;
    }

    setStep(3);
    // 模拟文章生成
    setTimeout(() => {
      showAlert({
        title: "生成完成",
        message: "AI已为您生成了专业级的旅行文章！",
        type: "success",
        buttons: [{ text: "确定", onPress: () => router.back() }],
      });
    }, 3000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <AlertComponent />
      
      {/* 渐变导航栏 */}
      <LinearGradient colors={["#667eea", "#764ba2"]} className="px-6 py-4">
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ width: 32, height: 32, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
            智能创作 - 回忆整理
          </Text>
          <TouchableOpacity onPress={() => router.replace("../create/quick")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="swap-horizontal" size={16} color="white" style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 14, fontWeight: "500", color: "white" }}>切换模式</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 模式说明 */}
        <View style={{ alignItems: "center", marginTop: 12 }}>
          <View style={{ 
            backgroundColor: "rgba(255,255,255,0.2)", 
            borderRadius: 16, 
            paddingHorizontal: 12, 
            paddingVertical: 6, 
            flexDirection: "row", 
            alignItems: "center" 
          }}>
            <Ionicons name="sparkles" size={16} color="#c084fc" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 14, color: "white", opacity: 0.9 }}>
              AI智能整理你的旅行回忆
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }}>
        {/* 进度指示器 */}
        <View style={{ padding: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            {/* 步骤1：内容收集 */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{
                width: 32, height: 32,
                backgroundColor: step >= 1 ? "#10b981" : "#d1d5db",
                borderRadius: 16, alignItems: "center", justifyContent: "center"
              }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: step >= 1 ? "white" : "#9ca3af" }}>1</Text>
              </View>
              <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: "500", color: step >= 1 ? "#374151" : "#9ca3af" }}>
                收集回忆
              </Text>
            </View>
            
            <View style={{ flex: 1, height: 2, backgroundColor: "#e5e7eb", marginHorizontal: 16 }} />
            
            {/* 步骤2：智能分析 */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{
                width: 32, height: 32,
                backgroundColor: step >= 2 ? "#667eea" : "#d1d5db",
                borderRadius: 16, alignItems: "center", justifyContent: "center",
                shadowColor: step === 2 ? "#667eea" : "transparent",
                shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4,
              }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: step >= 2 ? "white" : "#9ca3af" }}>2</Text>
              </View>
              <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: "500", color: step >= 2 ? "#374151" : "#9ca3af" }}>
                AI分析
              </Text>
            </View>
            
            <View style={{ flex: 1, height: 2, backgroundColor: "#e5e7eb", marginHorizontal: 16 }} />
            
            {/* 步骤3：生成文章 */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{
                width: 32, height: 32,
                backgroundColor: step >= 3 ? "#8b5cf6" : "#d1d5db",
                borderRadius: 16, alignItems: "center", justifyContent: "center"
              }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: step >= 3 ? "white" : "#9ca3af" }}>3</Text>
              </View>
              <Text style={{ marginLeft: 8, fontSize: 14, color: step >= 3 ? "#374151" : "#9ca3af" }}>
                生成文章
              </Text>
            </View>
          </View>
        </View>

        {/* 步骤1：内容收集 */}
        {step === 1 && (
          <>
            {/* 旅行基本信息 */}
            <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#1f2937", marginBottom: 16 }}>
                旅行基本信息
              </Text>
              <View style={{ backgroundColor: "white", borderRadius: 12, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 }}>
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151", marginBottom: 8 }}>
                    旅行目的地
                  </Text>
                  <TextInput
                    style={{ backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, padding: 12, fontSize: 14 }}
                    placeholder="如：巴厘岛、东京、巴黎..."
                    value={travelLocation}
                    onChangeText={setTravelLocation}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151", marginBottom: 8 }}>
                    旅行时间
                  </Text>
                  <TextInput
                    style={{ backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, padding: 12, fontSize: 14 }}
                    placeholder="如：上周末、去年夏天、三月份..."
                    value={travelTime}
                    onChangeText={setTravelTime}
                  />
                </View>
              </View>
            </View>

            {/* 多维度内容输入 - 重新设计为更简洁的流程 */}
            <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#1f2937", marginBottom: 8 }}>
                上传你的旅行回忆
              </Text>
               <Text style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
                 AI会识别照片中的场景、物体、人物，并结合你的补充描述生成文章
               </Text>
              
              {/* 主要内容：照片批量上传 */}
              <TouchableOpacity
                onPress={() => {
                  // 模拟批量选择照片
                  for(let i = 0; i < 5; i++) {
                    addContentSource('photo', `photo_${Date.now()}_${i}`);
                  }
                }}
                style={{
                  backgroundColor: "white", 
                  borderRadius: 12, 
                  padding: 20, 
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: contentSources.filter(s => s.type === 'photo').length > 0 ? "#3b82f6" : "#e5e7eb",
                  borderStyle: "dashed",
                  shadowColor: "#000", 
                  shadowOffset: { width: 0, height: 2 }, 
                  shadowOpacity: 0.05, 
                  shadowRadius: 3, 
                  elevation: 2,
                  marginBottom: 16
                }}
              >
                <Ionicons name="images" size={32} color="#3b82f6" style={{ marginBottom: 8 }} />
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1f2937", marginBottom: 4 }}>
                  📸 上传旅行照片
                </Text>
                <Text style={{ fontSize: 14, color: "#6b7280", textAlign: "center" }}>
                                     {contentSources.filter(s => s.type === 'photo').length > 0 
                     ? `已选择 ${contentSources.filter(s => s.type === 'photo').length} 张照片` 
                     : "支持批量选择，AI会识别场景、物体、人物"}
                </Text>
              </TouchableOpacity>

              {/* 可选补充内容 */}
              <View style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                  <Ionicons name="add-circle" size={20} color="#6b7280" style={{ marginRight: 8 }} />
                  <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151" }}>
                    可选：补充更多回忆细节
                  </Text>
                </View>
                
                {/* 文字补充（支持语音输入） */}
                <TouchableOpacity
                  onPress={() => {
                    // 展开文字输入区域
                    setContentSources(prev => {
                      if (prev.some(s => s.type === 'text')) {
                        return prev; // 已经添加过，不重复添加
                      }
                      return [...prev, {
                        type: 'text',
                        id: Date.now().toString(),
                        content: '',
                        timestamp: new Date().toISOString()
                      }];
                    });
                  }}
                  style={{
                    backgroundColor: "white", 
                    borderRadius: 8, 
                    padding: 16, 
                    alignItems: "center",
                    borderWidth: contentSources.some(s => s.type === 'text') ? 2 : 1,
                    borderColor: contentSources.some(s => s.type === 'text') ? "#10b981" : "#e5e7eb",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                    <Ionicons name="create" size={24} color="#10b981" style={{ marginRight: 8 }} />
                    <Ionicons name="mic" size={20} color="#ef4444" />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: "500", color: "#1f2937", marginBottom: 4, textAlign: "center" }}>
                    ✍️ 文字补充
                  </Text>
                  <Text style={{ fontSize: 12, color: "#6b7280", textAlign: "center" }}>
                    支持打字或语音输入转文字
                  </Text>
                  <Text style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 4 }}>
                    记录照片背后的故事、感受、推荐理由
                  </Text>
                </TouchableOpacity>
                
                {/* 如果有文字输入源，显示输入框 */}
                {contentSources.some(s => s.type === 'text') && (
                  <View style={{ marginTop: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151" }}>
                        ✍️ 补充文字描述
                      </Text>
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <TouchableOpacity
                          style={{ 
                            backgroundColor: "#f0f9ff", 
                            paddingHorizontal: 8, 
                            paddingVertical: 4, 
                            borderRadius: 6,
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                          onPress={() => {
                            // 模拟语音输入转文字
                            setContentSources(prev => prev.map(source => 
                              source.type === 'text' ? { 
                                ...source, 
                                content: source.content + "\n\n[语音转文字] 这次旅行真的很棒，特别是那个日落的瞬间，我们两个人坐在海边，感觉整个世界都安静下来了..."
                              } : source
                            ));
                          }}
                        >
                          <Ionicons name="mic" size={14} color="#3b82f6" style={{ marginRight: 4 }} />
                          <Text style={{ fontSize: 12, color: "#3b82f6", fontWeight: "500" }}>语音输入</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ 
                            backgroundColor: "#f0fdf4", 
                            paddingHorizontal: 8, 
                            paddingVertical: 4, 
                            borderRadius: 6,
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                          onPress={() => {
                            // 清空内容
                            setContentSources(prev => prev.map(source => 
                              source.type === 'text' ? { ...source, content: '' } : source
                            ));
                          }}
                        >
                          <Ionicons name="refresh" size={14} color="#16a34a" style={{ marginRight: 4 }} />
                          <Text style={{ fontSize: 12, color: "#16a34a", fontWeight: "500" }}>清空</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                                         <TextInput
                       style={{ 
                         backgroundColor: "white", 
                         borderWidth: 1, 
                         borderColor: "#e5e7eb", 
                         borderRadius: 8, 
                         padding: 12, 
                         fontSize: 14,
                         minHeight: 100,
                         textAlignVertical: 'top'
                       }}
                       placeholder={`分享照片背后的故事、当时的感受、推荐理由等...\n\n💡 可以点击上方"语音输入"按钮说话转文字`}
                       placeholderTextColor="#9ca3af"
                       multiline
                       numberOfLines={6}
                       value={contentSources.find(s => s.type === 'text')?.content || ''}
                       onChangeText={(text: string) => {
                         setContentSources(prev => prev.map(source => 
                           source.type === 'text' ? { ...source, content: text } : source
                         ));
                       }}
                     />
                  </View>
                )}
                
                <Text style={{ fontSize: 12, color: "#9ca3af", marginTop: 8, fontStyle: "italic" }}>
                  💡 提示：AI会将照片信息与你的文字描述智能结合，创作出个性化文章
                </Text>
              </View>
            </View>

            {/* 智能内容预览 - 显示AI将如何处理这些内容 */}
            {contentSources.length > 0 && (
              <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                <Text style={{ fontSize: 16, fontWeight: "500", color: "#1f2937", marginBottom: 12 }}>
                  📋 内容概览
                </Text>
                <View style={{ backgroundColor: "white", borderRadius: 12, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 }}>
                  
                  {/* 照片分析预览 */}
                  {contentSources.filter(s => s.type === 'photo').length > 0 && (
                    <View style={{ marginBottom: 12 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                        <Ionicons name="images" size={16} color="#3b82f6" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151" }}>
                          {contentSources.filter(s => s.type === 'photo').length} 张照片
                        </Text>
                      </View>
                                             <Text style={{ fontSize: 12, color: "#6b7280", paddingLeft: 24 }}>
                         AI将分析：场景识别、物体检测、人物识别、基础描述生成
                       </Text>
                    </View>
                  )}
                  
                  {/* 文字内容预览 */}
                  {contentSources.filter(s => s.type === 'text').length > 0 && (
                    <View style={{ marginBottom: 12 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                        <Ionicons name="create" size={16} color="#10b981" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151" }}>
                          文字描述
                        </Text>
                        <View style={{ marginLeft: 8, backgroundColor: "#dbeafe", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                          <Text style={{ fontSize: 10, color: "#1d4ed8", fontWeight: "500" }}>支持语音转文字</Text>
                        </View>
                      </View>
                      <Text style={{ fontSize: 12, color: "#6b7280", paddingLeft: 24 }}>
                        AI将整合：与照片内容关联、情感渲染、细节丰富
                      </Text>
                    </View>
                  )}
                  
                  <View style={{ backgroundColor: "#f0f9ff", borderRadius: 8, padding: 8, marginTop: 8 }}>
                    <Text style={{ fontSize: 12, color: "#1e40af", textAlign: "center" }}>
                      🤖 AI将智能整合所有内容，生成图文并茂的个性化文章
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* 下一步按钮 */}
            <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
              <TouchableOpacity onPress={proceedToAnalysis}>
                <LinearGradient
                  colors={["#3b82f6", "#1d4ed8"]}
                  style={{ paddingVertical: 16, borderRadius: 12, alignItems: "center" }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="analytics" size={20} color="white" style={{ marginRight: 8 }} />
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                      开始AI智能分析
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* 步骤2：智能分析 */}
        {step === 2 && (
          <>
            {/* AI分析状态 */}
            {isAnalyzing ? (
              <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                <LinearGradient
                  colors={["#f0f9ff", "#e0f2fe"]}
                  style={{ borderRadius: 12, padding: 20, alignItems: "center" }}
                >
                  <View style={{ marginBottom: 16 }}>
                    <Ionicons name="hardware-chip" size={32} color="#0ea5e9" />
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: "600", color: "#0369a1", marginBottom: 8 }}>
                    AI正在分析您的内容...
                  </Text>
                  <Text style={{ fontSize: 14, color: "#0891b2", textAlign: "center" }}>
                    正在识别场景、分析情绪、理解内容深度
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 16, gap: 8 }}>
                    {[1, 2, 3].map((i) => (
                      <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#0ea5e9", opacity: 0.6 }} />
                    ))}
                  </View>
                </LinearGradient>
              </View>
            ) : aiAnalysis && (
              <>
                {/* AI智能分析结果 */}
                <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                  <LinearGradient
                    colors={["#a8edea", "#fed6e3"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#4ecdc4" }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                      <Ionicons name="hardware-chip" size={20} color="#0891b2" style={{ marginRight: 8 }} />
                      <Text style={{ fontSize: 16, fontWeight: "600", color: "#1f2937" }}>
                        🧠 AI智能分析结果
                      </Text>
                      <View style={{ marginLeft: "auto", backgroundColor: "rgba(255,255,255,0.8)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
                        <Text style={{ fontSize: 12, color: "#0891b2", fontWeight: "500" }}>
                          置信度 {Math.round(aiAnalysis.confidence * 100)}%
                        </Text>
                      </View>
                    </View>
                    
                    {/* 内容整合分析 */}
                    <View style={{ backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                        <Ionicons name="layers" size={16} color="#3b82f6" style={{ marginRight: 6 }} />
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#1f2937" }}>
                          📸 照片内容识别
                        </Text>
                      </View>
                      <Text style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>
                        • 场景分析：{aiAnalysis.scenes.join(" → ")}
                      </Text>
                                             <Text style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>
                         • 环境识别：明亮海滩 → 日落场景 → 城市夜景 → 室内用餐
                       </Text>
                                             <Text style={{ fontSize: 13, color: "#6b7280" }}>
                         • 人物识别：{aiAnalysis.people}，检测到多人合影
                       </Text>
                    </View>

                    {/* 文章结构预览 */}
                    <View style={{ backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                        <Ionicons name="document-text" size={16} color="#10b981" style={{ marginRight: 6 }} />
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#1f2937" }}>
                          📝 建议文章结构
                        </Text>
                      </View>
                      <View style={{ paddingLeft: 8 }}>
                        <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>
                          1. 开篇：旅行地点介绍 + 心情描述 [结合基本信息]
                        </Text>
                        <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>
                          2. 中段：按场景逻辑展开体验 [穿插5张照片]
                        </Text>
                                               <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>
                         3. 体验：重点描述精彩瞬间 [结合文字补充]
                       </Text>
                        <Text style={{ fontSize: 12, color: "#6b7280" }}>
                          4. 结尾：总结感受 + 推荐建议
                        </Text>
                      </View>
                    </View>

                    {/* AI写作建议 */}
                    <View style={{ backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 8, padding: 12 }}>
                      <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151", marginBottom: 8 }}>
                        💡 AI个性化建议
                      </Text>
                      {aiAnalysis.suggestions.map((suggestion, index) => (
                        <Text key={index} style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                          • {suggestion}
                        </Text>
                      ))}
                    </View>
                  </LinearGradient>
                </View>

                {/* 内容关联预览 */}
                <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                  <View style={{ backgroundColor: "white", borderRadius: 12, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                      <Ionicons name="link" size={20} color="#8b5cf6" style={{ marginRight: 8 }} />
                      <Text style={{ fontSize: 16, fontWeight: "500", color: "#1f2937" }}>
                        🔗 内容智能关联
                      </Text>
                    </View>
                    
                    {/* 照片与文字的关联 */}
                    {contentSources.filter(s => s.type === 'text').length > 0 && (
                      <View style={{ backgroundColor: "#f0f9ff", borderRadius: 8, padding: 12, marginBottom: 8 }}>
                        <Text style={{ fontSize: 13, fontWeight: "500", color: "#1e40af", marginBottom: 4 }}>
                          📸 + ✍️ 照片与文字描述关联
                        </Text>
                        <Text style={{ fontSize: 12, color: "#3730a3" }}>
                          AI将你的文字描述（包括语音转文字内容）与对应照片智能匹配，为每张图片生成贴切的情境描述
                        </Text>
                      </View>
                    )}
                    
                    {/* 时间地点整合 */}
                    <View style={{ backgroundColor: "#f0fdf4", borderRadius: 8, padding: 12 }}>
                      <Text style={{ fontSize: 13, fontWeight: "500", color: "#16a34a", marginBottom: 4 }}>
                                                 🕐 + 📍 场景信息整合
                      </Text>
                                             <Text style={{ fontSize: 12, color: "#15803d" }}>
                         通过AI场景识别和你填写的地点时间信息，构建完整的旅行叙述
                       </Text>
                    </View>
                  </View>
                </View>

                {/* 动态个性化问答 */}
                {dynamicQuestions.length > 0 && (
                  <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                    <LinearGradient
                      colors={["#e0f2fe", "#b3e5fc"]}
                      style={{ borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#81d4fa" }}
                    >
                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <Ionicons name="chatbubble-ellipses" size={20} color="#0284c7" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#1f2937" }}>
                          AI个性化问答
                        </Text>
                        <View style={{ marginLeft: "auto", backgroundColor: "rgba(59, 130, 246, 0.1)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
                          <Text style={{ fontSize: 12, color: "#3b82f6", fontWeight: "500" }}>
                            基于内容生成
                          </Text>
                        </View>
                      </View>
                      
                      <View style={{ gap: 12 }}>
                        {dynamicQuestions.map((item, index) => (
                          <View key={item.id} style={{ backgroundColor: "rgba(255,255,255,0.6)", borderRadius: 8, padding: 12 }}>
                            <Text style={{ fontSize: 14, color: "#374151", marginBottom: 8 }}>
                              {item.question}
                            </Text>
                            <TextInput
                              style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, padding: 8, fontSize: 14, color: "#1f2937" }}
                              placeholder={item.placeholder}
                              placeholderTextColor="#9ca3af"
                              value={userAnswers[item.id] || ""}
                              onChangeText={(text) => setUserAnswers(prev => ({ ...prev, [item.id]: text }))}
                              multiline
                              numberOfLines={2}
                            />
                          </View>
                        ))}
                      </View>
                    </LinearGradient>
                  </View>
                )}

                {/* 情绪标签优化 */}
                <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                  <Text style={{ fontSize: 16, fontWeight: "500", color: "#1f2937", marginBottom: 12 }}>
                    确认或调整情绪标签
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                    {availableMoods.map((mood, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => toggleMood(mood.label)}
                        style={{
                          paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
                          backgroundColor: selectedMoods.includes(mood.label) ? "#667eea" : "#f3f4f6",
                          shadowColor: selectedMoods.includes(mood.label) ? "#667eea" : "transparent",
                          shadowOffset: { width: 0, height: 4 }, shadowOpacity: selectedMoods.includes(mood.label) ? 0.3 : 0,
                          shadowRadius: 15, elevation: selectedMoods.includes(mood.label) ? 4 : 0,
                        }}
                      >
                        <Text style={{ fontSize: 14, color: selectedMoods.includes(mood.label) ? "white" : "#374151" }}>
                          {mood.emoji} {mood.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* 个性化设置 */}
                <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                  <Text style={{ fontSize: 18, fontWeight: "600", color: "#1f2937", marginBottom: 16 }}>
                    个性化设置
                  </Text>

                  {/* 文章风格选择 */}
                  <View style={{ backgroundColor: "white", borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                      <Text style={{ fontSize: 16, fontWeight: "500", color: "#1f2937" }}>
                        选择文章风格
                      </Text>
                      {selectedStyle === aiAnalysis.recommendedStyle && (
                        <View style={{ marginLeft: 8, backgroundColor: "#dbeafe", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                          <Text style={{ fontSize: 10, color: "#1d4ed8", fontWeight: "500" }}>AI推荐</Text>
                        </View>
                      )}
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                      {styles.map((style, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setSelectedStyle(style.id)}
                          style={{
                            borderWidth: 2,
                            borderColor: selectedStyle === style.id ? "#3b82f6" : "#e5e7eb",
                            backgroundColor: selectedStyle === style.id ? "#eff6ff" : "white",
                            borderRadius: 8, padding: 12, flex: 1, minWidth: "45%",
                          }}
                        >
                          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: selectedStyle === style.id ? "#1d4ed8" : "#374151" }}>
                              {style.title}
                            </Text>
                            {selectedStyle === style.id && (
                              <Ionicons name="checkmark-circle" size={16} color="#3b82f6" />
                            )}
                          </View>
                          <Text style={{ fontSize: 12, color: selectedStyle === style.id ? "#1d4ed8" : "#6b7280" }}>
                            {style.desc}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* 目标读者 */}
                  <View style={{ backgroundColor: "white", borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 }}>
                    <Text style={{ fontSize: 16, fontWeight: "500", color: "#1f2937", marginBottom: 12 }}>
                      目标读者
                    </Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                      {audiences.map((audience, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setTargetAudience(audience)}
                          style={{
                            paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
                            backgroundColor: targetAudience === audience ? "#dbeafe" : "#f3f4f6",
                          }}
                        >
                          <Text style={{ fontSize: 14, color: targetAudience === audience ? "#1d4ed8" : "#6b7280" }}>
                            {audience}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* 文章长度和详细程度 */}
                  <View style={{ backgroundColor: "white", borderRadius: 12, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <Text style={{ fontSize: 16, fontWeight: "500", color: "#1f2937" }}>
                        文章详细程度
                      </Text>
                      <Text style={{ fontSize: 14, color: "#3b82f6" }}>
                        {articleDetail < 33 ? "简洁" : articleDetail < 67 ? "适中" : "详细"}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                      <View style={{ flex: 1, height: 4, backgroundColor: "#e5e7eb", borderRadius: 2 }}>
                        <View style={{ width: `${articleDetail}%`, height: "100%", backgroundColor: "#3b82f6", borderRadius: 2 }} />
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                      <TouchableOpacity onPress={() => setArticleDetail(20)}>
                        <Text style={{ fontSize: 12, color: articleDetail < 33 ? "#3b82f6" : "#6b7280" }}>简洁</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setArticleDetail(50)}>
                        <Text style={{ fontSize: 12, color: articleDetail >= 33 && articleDetail < 67 ? "#3b82f6" : "#6b7280" }}>适中</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setArticleDetail(80)}>
                        <Text style={{ fontSize: 12, color: articleDetail >= 67 ? "#3b82f6" : "#6b7280" }}>详细</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* 生成文章按钮 */}
                <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
                  <TouchableOpacity onPress={generateArticle}>
                    <LinearGradient
                      colors={["#3b82f6", "#8b5cf6"]}
                      style={{ paddingVertical: 16, borderRadius: 12, alignItems: "center", shadowColor: "#3b82f6", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 25, elevation: 8 }}
                    >
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="sparkles" size={20} color="white" style={{ marginRight: 8 }} />
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                          AI智能生成文章
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 12 }}>
                    <Ionicons name="time" size={16} color="#6b7280" style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 14, color: "#6b7280" }}>
                      预计生成时间：15-20秒
                    </Text>
                  </View>
                  
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
                    <Ionicons name="shield-checkmark" size={16} color="#9ca3af" style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 12, color: "#9ca3af" }}>
                      基于{contentSources.length}个内容源智能生成
                    </Text>
                  </View>
                </View>
              </>
            )}
          </>
        )}

        {/* 步骤3：生成文章 */}
        {step === 3 && (
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <LinearGradient
              colors={["#f0f9ff", "#e0f2fe"]}
              style={{ borderRadius: 12, padding: 20, alignItems: "center" }}
            >
              <View style={{ marginBottom: 16 }}>
                <Ionicons name="sparkles" size={32} color="#8b5cf6" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#7c3aed", marginBottom: 8 }}>
                AI正在生成您的专业文章...
              </Text>
              <Text style={{ fontSize: 14, color: "#8b5cf6", textAlign: "center" }}>
                融合多维度内容，创作个性化旅行故事
              </Text>
              <View style={{ flexDirection: "row", marginTop: 16, gap: 8 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#8b5cf6", opacity: 0.6 }} />
                ))}
              </View>
            </LinearGradient>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
