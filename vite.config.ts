import { defineConfig, PluginOption, loadEnv } from "vite";
import { enterDevPlugin, enterProdPlugin } from 'vite-plugin-enter-dev';
import path from "path";

// 本地开发时代理阿里云 API 的插件
const apiProxyPlugin = (apiKey: string): PluginOption => ({
  name: 'api-proxy',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res, next) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: '只允许 POST 请求' }));
        return;
      }

      // 读取请求体
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const { messages } = JSON.parse(body);

          if (!apiKey) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: '未配置 API Key，请检查 .env 文件' }));
            return;
          }

          console.log('代理请求到阿里云，API Key:', apiKey.slice(0, 10) + '...');

          // 使用 node-fetch 或原生 fetch (Node 18+)
          const fetchFn = globalThis.fetch || (await import('node-fetch')).default;

          const response = await fetchFn('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'qwen-turbo',
              input: { messages },
              parameters: {
                result_format: 'message',
                max_tokens: 1500,
                temperature: 0.7,
              }
            }),
          });

          const data = await response.json();
          console.log('阿里云响应:', JSON.stringify(data).slice(0, 200));

          res.statusCode = response.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (error: any) {
          console.error('API 代理错误:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: '代理请求失败', message: error.message }));
        }
      });
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载 env 文件
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.VITE_ALIYUN_API_KEY || '';

  const plugins = [
    ...enterProdPlugin(),
  ];

  if (mode === 'development') {
    plugins.push(...enterDevPlugin());
    plugins.push(apiProxyPlugin(apiKey));
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean) as PluginOption[],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: '/',
    build: {
      outDir: 'dist',
    }
  };
});
