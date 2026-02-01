import { Code2, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">Lee.dev</span>
            </div>
            <p className="text-slate-400 text-sm">
              用代码解决生活中的小麻烦，一个工具一个工具地做下去。
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">项目</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">拾光 (TimePick)</a></li>
              <li><a href="#" className="hover:text-white transition">Skill Search</a></li>
              <li><a href="#" className="hover:text-white transition">Lee's Online</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">链接</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a></li>
              <li><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Vercel</a></li>
              <li><a href="https://enter.pro" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Enter.pro</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">联系我</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>287796033@qq.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© 2025 Lee. Vibe Coding 课程毕业作品. 使用 AI + 代码构建.</p>
        </div>
      </div>
    </footer>
  );
};
