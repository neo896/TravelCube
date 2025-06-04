import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// 添加类型定义
interface MenuItemData {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

interface MenuItemProps {
  item: MenuItemData;
  isLast?: boolean;
}

export default function My() {
  const userStats = [
    { value: '15', label: '文章' },
    { value: '1.2K', label: '阅读' },
    { value: '89', label: '点赞' },
    { value: '23', label: '粉丝' },
  ];

  const achievements = [
    { icon: 'star', title: '首篇文章', earned: true },
    { icon: 'heart', title: '百赞达人', earned: true },
    { icon: 'camera', title: '摄影达人', earned: true },
    { icon: 'lock-closed', title: '未解锁', earned: false },
  ];

  const menuItems = [
    {
      icon: 'bookmark',
      title: '我的收藏',
      subtitle: '收藏的精彩文章',
      color: '#3B82F6',
      bgColor: '#DBEAFE',
    },
    {
      icon: 'time',
      title: '浏览记录',
      subtitle: '最近阅读的文章',
      color: '#10B981',
      bgColor: '#D1FAE5',
    },
    {
      icon: 'share',
      title: '分享记录',
      subtitle: '分享到社交平台',
      color: '#8B5CF6',
      bgColor: '#EDE9FE',
    },
    {
      icon: 'trending-up',
      title: '数据统计',
      subtitle: '文章数据分析',
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
  ];

  const settingsItems = [
    {
      icon: 'person',
      title: '编辑资料',
      subtitle: '修改个人信息',
      color: '#6B7280',
      bgColor: '#F3F4F6',
    },
    {
      icon: 'notifications',
      title: '消息设置',
      subtitle: '通知和提醒设置',
      color: '#6B7280',
      bgColor: '#F3F4F6',
    },
    {
      icon: 'shield-checkmark',
      title: '隐私设置',
      subtitle: '账号隐私和安全',
      color: '#6B7280',
      bgColor: '#F3F4F6',
    },
    {
      icon: 'help-circle',
      title: '帮助中心',
      subtitle: '常见问题和支持',
      color: '#6B7280',
      bgColor: '#F3F4F6',
    },
  ];

  const otherItems = [
    {
      icon: 'heart',
      title: '推荐给朋友',
      subtitle: '分享应用给好友',
      color: '#EF4444',
      bgColor: '#FEE2E2',
    },
    {
      icon: 'star',
      title: '给我们评分',
      subtitle: '在App Store评价',
      color: '#EAB308',
      bgColor: '#FEF3C7',
    },
    {
      icon: 'information-circle',
      title: '关于我们',
      subtitle: '版本信息和团队',
      color: '#6B7280',
      bgColor: '#F3F4F6',
    },
  ];

  const MenuItem = ({ item, isLast = false }: MenuItemProps) => (
    <TouchableOpacity 
      className={`flex-row items-center justify-between px-4 py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View 
          className="w-10 h-10 rounded-full justify-center items-center mr-3"
          style={{ backgroundColor: item.bgColor }}
        >
          <Ionicons name={item.icon as any} size={20} color={item.color} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-medium text-gray-800 mb-0.5">{item.title}</Text>
          <Text className="text-sm text-gray-600">{item.subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* 个人信息头部 */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        className="px-6 pt-4 pb-6"
      >
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-row items-center">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
              }}
              className="w-20 h-20 rounded-full mr-4"
              style={{ borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)' }}
            />
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white mb-1">旅行达人张三</Text>
              <View className="flex-row items-center mb-1">
                <Text className="text-sm text-white opacity-90 mr-2">Lv.5 探索者</Text>
                <Ionicons name="star" size={14} color="#FDE047" />
              </View>
              <Text className="text-sm text-white opacity-75">已加入 256 天</Text>
            </View>
          </View>
          <TouchableOpacity className="w-8 h-8 bg-white bg-opacity-20 rounded-full justify-center items-center">
            <Ionicons name="settings" size={20} />
          </TouchableOpacity>
        </View>

        {/* 等级进度 */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm text-white opacity-90">距离下一级还需</Text>
            <Text className="text-sm text-white opacity-90">350/500 经验值</Text>
          </View>
          <View className="h-2 bg-white bg-opacity-30 rounded-sm overflow-hidden">
            <View 
              className="h-full bg-white rounded-sm"
              style={{ width: '65%' }}
            />
          </View>
        </View>

        {/* 数据统计 */}
        <View className="flex-row justify-between">
          {userStats.map((stat, index) => (
            <View key={index} className="bg-white bg-opacity-90 rounded-xl p-3 items-center flex-1 mx-0.5">
              <Text className="text-lg font-bold text-gray-800 mb-0.5">{stat.value}</Text>
              <Text className="text-xs text-gray-600">{stat.label}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 成就徽章 */}
        <View className="bg-white mx-6 mt-4 rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800">我的成就</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-500 font-medium">查看全部</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-between">
            {achievements.map((achievement, index) => (
              <View key={index} className="items-center flex-1">
                <View 
                  className={`w-12 h-12 rounded-full justify-center items-center mb-2 ${
                    achievement.earned 
                      ? 'bg-yellow-500 shadow-lg' 
                      : 'bg-gray-200'
                  }`}
                  style={achievement.earned ? {
                    shadowColor: '#F59E0B',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 4,
                  } : {}}
                >
                  <Ionicons 
                    name={achievement.icon as any} 
                    size={20} 
                    color={achievement.earned ? "white" : "#9CA3AF"} 
                  />
                </View>
                <Text 
                  className={`text-xs text-center ${
                    achievement.earned ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {achievement.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 功能菜单 */}
        <View className="bg-white mx-6 rounded-xl mb-4 shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              item={item} 
              isLast={index === menuItems.length - 1} 
            />
          ))}
        </View>

        {/* 设置菜单 */}
        <View className="bg-white mx-6 rounded-xl mb-4 shadow-sm overflow-hidden">
          {settingsItems.map((item, index) => (
            <MenuItem 
              key={index} 
              item={item} 
              isLast={index === settingsItems.length - 1} 
            />
          ))}
        </View>

        {/* 其他功能 */}
        <View className="bg-white mx-6 rounded-xl mb-4 shadow-sm overflow-hidden">
          {otherItems.map((item, index) => (
            <MenuItem 
              key={index} 
              item={item} 
              isLast={index === otherItems.length - 1} 
            />
          ))}
        </View>

        {/* 登出按钮 */}
        <View className="px-6 py-4 pb-24">
          <TouchableOpacity className="flex-row items-center justify-center bg-red-50 border border-red-200 rounded-xl py-4" activeOpacity={0.7}>
            <Ionicons name="log-out" size={18} color="#EF4444" />
            <Text className="text-base font-medium text-red-500 ml-2">退出登录</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
