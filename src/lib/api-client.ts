interface Message {
  role: string;
  content: string;
}

interface ChatResponse {
  output?: {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };
}

const PLATFORM_ERROR_MESSAGE = `⚠️ AI功能在当前部署平台暂不可用。

要启用AI对话功能，请：
1. 在本地运行：npm run dev
2. 或部署到 Vercel（支持 Serverless Functions）

当前你可以：
• 查看页面上展示的项目信息
• 访问项目的在线演示链接
• 查看 GitHub 源代码`;

export async function sendChatMessage(messages: Message[]): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    console.log('API 响应状态:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 错误:', errorText);
      
      if (response.status === 405) {
        throw new Error('PLATFORM_NOT_SUPPORTED');
      }
      
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    const content = data.output?.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('API 返回数据格式错误');
    }
    
    return content;
  } catch (error) {
    console.error('发送消息失败:', error);
    
    if (error instanceof Error && error.message === 'PLATFORM_NOT_SUPPORTED') {
      return PLATFORM_ERROR_MESSAGE;
    }
    
    throw error;
  }
}
