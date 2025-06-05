// TravelCube 登录页面标题文案集合

// 应用名称配置
export const appNames = {
  current: "WanderBox", // 可以改为: TravelCube, WanderBox, JourneyMate, 足迹, 等
  alternatives: [
    "TravelCube",
    "WanderBox",
    "JourneyMate",
    "足迹",
    "Voyagely",
    "PathCube",
  ],
};

export const titleOptions = {
  // 现代简洁风格
  modern: {
    login: {
      main: "世界那么大，欢迎回来继续探索",
      sub: "带着回忆归来，装满新的故事",
    },
    register: {
      main: "每一次出发，都是梦想的开始",
      sub: "用脚步丈量世界，用心感受美好",
    },
  },

  // 诗意文艺风格
  poetic: {
    login: {
      main: "山河湖海，因你而精彩",
      sub: "愿归来时，你已是另一个自己",
    },
    register: {
      main: "生活不止眼前的苟且，还有诗和远方",
      sub: "让我们一起去看看这个美丽的世界",
    },
  },

  // 激励励志风格
  inspiring: {
    login: {
      main: "再次出发，去遇见更好的世界",
      sub: "每一段旅程，都让我们成长",
    },
    register: {
      main: "世界在等你，梦想在召唤",
      sub: "勇敢迈出第一步，精彩从这里开始",
    },
  },

  // 温暖亲切风格
  warm: {
    login: {
      main: "欢迎回家，我们一直在这里等你",
      sub: "分享你的旅行故事，让美好延续",
    },
    register: {
      main: "你好，未来的旅行家",
      sub: "准备好了吗？让我们一起踏上冒险之旅",
    },
  },

  // 简约商务风格
  business: {
    login: {
      main: "欢迎回来，继续您的旅程",
      sub: "让科技为您的旅行助力",
    },
    register: {
      main: "开始您的智能旅行体验",
      sub: "记录、分享、发现更多可能",
    },
  },

  // 年轻活力风格
  youthful: {
    login: {
      main: "Hey！又见面了",
      sub: "准备好下一场说走就走的旅行了吗？",
    },
    register: {
      main: "嗨！来一场奇妙的冒险吧",
      sub: "年轻就要去疯狂，世界那么大等你闯",
    },
  },
};

// 当前使用的风格
export const currentStyle = "modern";

// 获取当前标题
export const getCurrentTitles = (isLogin: boolean) => {
  const style = titleOptions[currentStyle as keyof typeof titleOptions];
  return isLogin ? style.login : style.register;
};
