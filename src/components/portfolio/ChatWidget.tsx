import { useState, useEffect } from 'react';
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

    // 调用阿里云 API（通过 Vercel 代理避免 CORS）
    setIsTyping(true);

    // 本地开发环境直接调用（需要处理 CORS）
    const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    try {
      let response;

      if (isLocalDev) {
        // 本地开发：直接调用阿里云（需要浏览器安装 CORS 插件或配置）
        response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'qwen-turbo',
            input: {
              messages: [
                { role: 'system', content: '你是Lee的AI分身。说话风格：直接、口语化，常用"呃"开头，用短句表达，不正式。介绍项目时先说痛点再说解决方案。可以回答关于Lee的项目（拾光、Skill Search、Lee\'s Online）和AI编程学习的问题。' },
                ...chatHistory.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
                { role: 'user', content: userMsg }
              ]
            },
            parameters: {
              result_format: 'message',
              max_tokens: 1500,
              temperature: 0.7,
            }
          }),
        });
      } else {
        // 生产环境：通过 Vercel 代理
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: '你是Lee的AI分身。说话风格：直接、口语化，常用"呃"开头，用短句表达，不正式。介绍项目时先说痛点再说解决方案。可以回答关于Lee的项目（拾光、Skill Search、Lee\'s Online）和AI编程学习的问题。' },
              ...chatHistory.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: userMsg }
            ]
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.output?.choices?.[0]?.message?.content || '抱歉，我没有理解你的问题，可以再说一遍吗？';

      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('API 调用失败:', error);
      const isCorsError = error.message?.includes('Failed to fetch') || error.name === 'TypeError';
      const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      if (isCorsError && isLocalDev) {
        // 本地开发 CORS 错误，使用模拟回复
        const mockResponse = simulateAIResponse(userMsg);
        setChatHistory(prev => [...prev, { role: 'assistant', content: mockResponse }]);
      } else {
        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: '呃，API 调用出错了。请检查 API Key 是否正确，或者部署到 Vercel 后再试。'
        }]);
      }
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

              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-secondary">
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
                          <p className="text-sm whitespace-pre-line">{msg.content}</p>
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
