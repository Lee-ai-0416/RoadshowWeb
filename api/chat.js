// Vercel Serverless Function - 代理阿里云百炼 API 请求
export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允许 POST 请求' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: '缺少 messages 参数' });
  }

  try {
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_ALIYUN_API_KEY || process.env.ALIYUN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: messages
        },
        parameters: {
          result_format: 'message',
          max_tokens: 1500,
          temperature: 0.7,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('阿里云 API 错误:', errorText);
      return res.status(response.status).json({ error: '阿里云 API 调用失败', details: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('代理请求失败:', error);
    return res.status(500).json({ error: '服务器内部错误', message: error.message });
  }
}
