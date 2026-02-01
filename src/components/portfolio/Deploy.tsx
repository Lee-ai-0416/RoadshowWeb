import { Github, Rocket, Globe, Check } from 'lucide-react';

const deploySteps = [
  { num: 1, icon: Github, title: '上传代码到GitHub', desc: '创建GitHub仓库，将项目代码推送到远程。建议使用GitHub Desktop客户端简化操作。', steps: ['创建新仓库', '初始化Git', '推送代码'] },
  { num: 2, icon: Rocket, title: '部署到Vercel', desc: '使用Vercel连接GitHub仓库，自动构建部署。支持自动预览和自定义域名。', steps: ['导入GitHub仓库', '配置构建设置', '自动生成链接'] },
  { num: 3, icon: Globe, title: '分享公网链接', desc: '获得形如 your-project.vercel.app 的公网链接，可分享给任何人访问。', steps: ['自动HTTPS', '全球CDN加速', '自动持续部署'] },
];

export const Deploy = () => {
  return (
    <section id="deploy" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">上线部署指南</h2>
          <p className="text-xl text-muted-foreground">代码上传到GitHub，通过Vercel生成公网链接</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {deploySteps.map((step) => (
            <div key={step.num} className="bg-secondary rounded-2xl p-8 text-center hover:-translate-y-2 transition-transform">
              <div className="relative w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-background" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center border-4 border-card font-bold text-sm">{step.num}</div>
              </div>
              <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{step.desc}</p>
              <ul className="text-left text-sm text-muted-foreground space-y-2 bg-card p-4 rounded-lg">
                {step.steps.map((s, j) => (
                  <li key={j} className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />{s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-slate-400 text-sm ml-4">快速部署命令</span>
          </div>
          <pre className="text-sm text-slate-300"><code>{`# 1. 初始化Git仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交代码
git commit -m "Initial commit"

# 4. 连接远程仓库
git remote add origin https://github.com/username/repo.git

# 5. 推送到GitHub
git push -u origin main

# 6. Vercel会自动部署，或手动部署:
npx vercel --prod`}</code></pre>
        </div>
      </div>
    </section>
  );
};
