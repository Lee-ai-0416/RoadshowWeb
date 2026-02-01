export const simulateAIResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('你好') || lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
    return '你好！很高兴见到你 👋 我是Lee的AI分身，可以问我关于Lee的项目、AI编程学习经历，或者任何你想了解的事情！';
  }
  
  if (lowerMsg.includes('拾光') || lowerMsg.includes('timepick')) {
    const lines = [
      '拾光是我做的第一个完整产品，是一个智能资料存储系统。 slogan是"让每一个灵感都有归属"。',
      '',
      '主要解决了"收藏即遗忘"的问题——你有没有收藏了很多文章却再也没看过？拾光用AI自动提取收藏内容的关键信息，还支持语音快速记录灵感。用了React+Supabase这套技术栈，2周就做出来了，AI帮我写了大概70%的代码。'
    ];
    return lines.join('\n');
  }
  
  if (lowerMsg.includes('skill')) {
    const lines = [
      'Skill Search是一个AI Skill搜索平台，slogan是"一句话找到想要的AI Skill"。',
      '',
      '痛点是AI Skill分散在GitHub各处，找起来很麻烦。我这个工具支持语义搜索——你可以用自然语言描述需求，比如"帮我找个能生成思维导图的skill"，它会智能匹配相关的Skill。还接入了GitHub API每天自动同步最新数据。'
    ];
    return lines.join('\n');
  }
  
  if (lowerMsg.includes('学习') || lowerMsg.includes('怎么学')) {
    const lines = [
      '我的AI编程学习经历了三个阶段：',
      '',
      '1. **2025年初**：第一次接触AI，被能力震撼到了',
      '2. **2025年6月**：参加Vibe Coding训练营，系统学习',
      '3. **现在**：能独立开发完整产品',
      '',
      '我的建议是：先掌握提示词工程，这比什么都重要。然后从小项目开始，走通完整的开发流程。技术栈推荐 React + TypeScript + Tailwind + shadcn/ui + Supabase + Vercel，这套组合AI理解得最好。'
    ];
    return lines.join('\n');
  }
  
  const lines = [
    '这是个好问题！作为Lee的AI分身，我对这个问题的理解还不够深入。不过我可以分享一些相关的经验...',
    '',
    'Lee常说，做产品最重要的是解决真实痛点。如果你有具体想了解的项目细节（拾光、Skill Search、Lee\'s Online）或者AI编程学习的问题，我很乐意详细聊聊！'
  ];
  return lines.join('\n');
};
