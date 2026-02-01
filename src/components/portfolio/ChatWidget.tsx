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
    const savedKey = localStorage.getItem('deepseek_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const sendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = simulateAIResponse(userMsg);
    setIsTyping(false);
    setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
  };

  const saveApiKey = () => {
    localStorage.setItem('deepseek_api_key', apiKey);
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
                  <p className="text-xs text-muted-foreground">Powered by DeepSeek AI</p>
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
                  <label className="text-xs text-muted-foreground block mb-1">DeepSeek API Key</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="bg-secondary"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  填写你的DeepSeek API Key以获得更好的回答体验。
                  <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">获取Key</a>
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
