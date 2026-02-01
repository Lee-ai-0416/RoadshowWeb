import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Bot, X, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { simulateAIResponse } from './chat-responses';

interface Message {
  role: string;
  content: string;
}

export const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // 消息更新时自动滚动
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  useEffect(() => {
    // 优先从 env 读取，如果没有则尝试 localStorage
    const envKey = import.meta.env.VITE_ALIYUN_API_KEY;
    if (envKey) {
      setApiKey(envKey);
    } else {
      const savedKey = localStorage.getItem('aliyun_api_key');
      if (savedKey) setApiKey(savedKey);
    }
  }, []);

  // 知识库内容
  const knowledgeBase = {
    style: {
      speaking: "直接、口语化，用短句表达，不正式，不用客套话",
      writing: "喜欢用短句，一句一意，不喜欢正式官方的书面语，简洁明了不堆砌形容词",
      structure: "介绍项目时：先说痛点（存在的问题），再说解决方案（怎么解决的）"
    },
    courses: {
      lesson1: "AI编程认知和反思 - 了解Vibe Coding，2025年6月开始接触AI编程",
      lesson2: "从网站开始构建一款产品 - 使用Enter.pro开发，Supabase做数据库",
      lesson3: "打造我的AI产品 - 接入智能体，算运势功能，使用阿里云百炼平台",
      lesson4: "走近代码的世界 - 使用Trae CN、Cursor、Claude Code等AI编程工具",
      lesson56: "建立个人主页并部署 - 产品开发全流程：需求→Demo→PRD→UI→开发→测试→上线→迭代",
      lesson7: "做出一个工具产品 - SkillSearch的诞生过程，从痛点到MVP"
    },
    tools: {
      aiCoding: ["Trae CN", "Cursor", "CodeBuddy CN", "Claude Code (Pro会员)"],
      database: "Supabase",
      deployment: ["Vercel", "Enter.pro"],
      workflow: "使用云舒老师的thought-mining skill整理思路"
    }
  };

  // 系统提示词 - 包含完整的项目信息和知识库
  const systemPrompt = `你是Lee的AI分身，一个独立开发者。你的任务是回答访客关于Lee的项目、AI编程经历和学习心得的问题。

## 说话风格（必须遵循）
- ${knowledgeBase.style.speaking}
- ${knowledgeBase.style.writing}
- ${knowledgeBase.style.structure}
- 不要每句话都加"呃"，那是用户的口头禅不是你的

## 项目信息（必须准确使用）

### 项目一：拾光 (TimePick)
- 类型：智能资料存储系统
- Slogan：让每一个灵感都有归属
- 痛点：网页资料收藏后 never read later，设计灵感散落各处，"我知道它存在，但就是找不到"的信息检索难题，日常信息碎片化无法有效整理
- 解决方案：智能资料收集（AI自动提取关键信息）+ 灵感随时记录（语音输入）+ 多维分类管理（无限层级文件夹+多标签）+ 全局极速搜索
- MVP功能：粘贴链接自动识别标题内容、AI自动提取关键信息并智能分类、多标签系统+无限层级文件夹、全文检索+每日运势抽签特色功能
- 技术栈：React 19, TypeScript, Vite 6, Supabase, Tailwind CSS, shadcn/ui
- 开发数据：2周，~5000行代码，AI贡献70%
- 在线演示：https://277078962e8c471691f9db87fae77eb3.prod.enter.pro/
- GitHub：https://github.com/Lee0317-ai/TimePick

### 项目二：Skill Search
- 类型：AI Skill 搜索平台
- Slogan：一句话找到想要的AI Skill
- 痛点：AI Skill分散在GitHub各处缺乏统一入口，现有工具搜索体验不佳（skills.sh不支持语义匹配），"我知道它存在，但就是找不到"的困境
- 解决方案：关键词搜索 + 语义搜索（自然语言描述需求智能匹配）+ 热门推荐 + 本地Skill管理（树状文件浏览器）
- MVP功能：关键词快速定位已知Skill、语义搜索描述需求智能匹配、热门推荐发现大家都在用的Skill、每日自动从GitHub爬取最新数据
- 技术栈：Next.js 14, TypeScript, Tailwind CSS, Supabase, SWR, GitHub API
- 开发数据：1周，~3000行代码，AI贡献75%
- 在线演示：https://skill-search-pink.vercel.app/
- GitHub：https://github.com/Lee0317-ai/skill_search

### 项目三：Lee's Online
- 类型：个人作品集网站
- Slogan：用代码+AI写下自己的序章
- 痛点：独立开发者需要展示个人作品，缺乏集中展示多个项目的入口，需要建立个人品牌和在线形象
- 解决方案：个人简介时间线 + 产品展示 + 工具展示 + AI学习区 + 主题切换，打造完整的个人品牌形象
- MVP功能：个人成长时间线展示、产品作品集展示、AI学习资源分享、深色/浅色主题切换
- 技术栈：React 19, TypeScript, Vite 6, Tailwind CSS, shadcn/ui, Enter.pro
- 开发数据：3天，~2000行代码，AI贡献80%
- 在线演示：https://deea49bca1084f7791316fb28df0e503.prod.enter.pro/
- GitHub：https://github.com/Lee0317-ai/Lee_Online

## 学习历程（知识库内容）
- Vibe Coding训练营学习过程：
  * 第一课：AI编程认知和反思 - 2025年6月开始接触AI编程
  * 第二课：从网站开始构建产品 - 学会使用Enter.pro和Supabase
  * 第三课：打造AI产品 - 接入阿里云百炼智能体，实现算运势功能
  * 第四课：走近代码世界 - 使用Trae CN、Cursor、Claude Code等工具
  * 第五六课：建立个人主页并部署 - 掌握完整的产品开发流程
  * 第七课：做出工具产品 - SkillSearch从痛点发掘到MVP实现

## 常用工具
- AI编程：Trae CN、Cursor、CodeBuddy CN、Claude Code
- 数据库：Supabase
- 部署：Vercel、Enter.pro
- 工作流：云舒老师的thought-mining skill

## 回答要求
- 必须基于上面的信息回答，不要编造
- 如果用户问课程学习相关内容，使用"学习历程"中的信息
- 如果用户问工具使用，参考"常用工具"部分
- **只在用户明确问"网址/链接/地址/在哪里访问"时才给出链接，平时介绍项目不需要带链接**
- 给出链接时，单独成行，方便复制
- 保持直接、口语化的风格，不要用正式书面语`;

  const sendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);

    // 如果没有 API Key，使用模拟回复
    if (!apiKey) {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = simulateAIResponse(userMsg);
      setIsTyping(false);
      setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
      return;
    }

    // 调用 API（本地开发走 Vite 代理，生产环境走 Vercel 代理）
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...chatHistory.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMsg }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.output?.choices?.[0]?.message?.content || '抱歉，我没有理解你的问题，可以再说一遍吗？';

      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('API 调用失败:', error);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'API 调用出错了。请检查 .env 文件中的 API Key 是否正确。'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const saveApiKey = () => {
    localStorage.setItem('aliyun_api_key', apiKey);
    setShowSettings(false);
    setChatHistory(prev => [...prev, { role: 'system', content: 'API Key已保存！现在可以使用AI对话功能了。' }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setShowChat(!showChat)}
        className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl transition-all relative"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
      </Button>

      {showChat && (
        <div className="absolute bottom-16 right-0 w-96 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
          {!showSettings ? (
            <>
              <div className="bg-gradient-to-r from-primary to-primary-glow p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Lee的AI分身</h3>
                    <p className="text-white/70 text-xs">问我关于项目和学习的事</p>
                  </div>
                </div>
                <button onClick={() => setShowChat(false)} className="text-white/70 hover:text-white transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div ref={chatContainerRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-secondary">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-card p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                    <p className="text-sm">嗨！我是Lee的AI分身 👋</p>
                    <p className="text-sm mt-1">我可以帮你了解：</p>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      <li>• 我的三个项目详情</li>
                      <li>• AI编程学习心得</li>
                      <li>• 技术栈选择思路</li>
                      <li>• Vibe Coding课程体验</li>
                    </ul>
                  </div>
                </div>

                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex items-start space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {msg.role === 'system' ? (
                      <div className="w-full text-center">
                        <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">{msg.content}</span>
                      </div>
                    ) : (
                      <>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-300' : 'bg-gradient-to-br from-primary to-primary-glow'}`}>
                          {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                        </div>
                        <div className={`p-3 rounded-2xl shadow-sm max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-card rounded-tl-none'}`}>
                          <p className="text-sm whitespace-pre-wrap break-all">{msg.content}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-card p-3 rounded-2xl rounded-tl-none shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-card border-t border-border">
                <div className="flex items-center space-x-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="输入你的问题..."
                    className="flex-1 bg-secondary"
                  />
                  <Button onClick={sendMessage} size="icon" className="bg-gradient-to-r from-primary to-primary-glow">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">Powered by 阿里通义千问</p>
                  <button onClick={() => setShowSettings(true)} className="text-xs text-primary hover:underline">配置API Key</button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">API设置</h4>
                <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">阿里云 API Key</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="bg-secondary"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  填写你的阿里云百炼 API Key以获得更好的回答体验。
                  <a href="https://bailian.console.aliyun.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">获取Key</a>
                </p>
                <Button onClick={saveApiKey} className="w-full bg-primary">保存</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
