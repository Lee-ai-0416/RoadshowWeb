import { Sparkles, Braces, Database, Bot, Rocket, ArrowRight, CheckCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center hero-pattern pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Vibe Coding 课程毕业作品</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              用代码解决生活中的<br />
              <span className="gradient-text">小麻烦</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              一个工具一个工具地做下去。从第一次与AI对话的震撼，到用代码+AI写下自己的序章。
              这是我在Vibe Coding训练营的学习成果展示。
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Braces, text: 'React / TypeScript' },
                { icon: Database, text: 'Supabase' },
                { icon: Bot, text: 'AI 编程' },
                { icon: Rocket, text: 'Vercel' },
              ].map((skill, i) => (
                <span key={i} className="bg-card px-4 py-2 rounded-lg shadow-sm border border-border text-sm font-medium hover:scale-105 transition-transform cursor-default">
                  <skill.icon className="w-4 h-4 inline mr-1 text-primary" />{skill.text}
                </span>
              ))}
            </div>
            <div className="flex space-x-4 pt-4">
              <Button onClick={() => scrollToSection('projects')} className="bg-primary hover:bg-primary/90">
                <span>查看项目</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button onClick={() => scrollToSection('journey')} variant="outline">
                学习历程
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-3xl blur-3xl opacity-20" />
            <div className="relative bg-card rounded-3xl shadow-2xl p-8 animate-float">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Lee</h3>
                  <p className="text-muted-foreground">独立开发者 / AI编程学习者</p>
                </div>
              </div>
              <div className="space-y-4">
                {['3个完整产品从0到1', 'Vibe Coding 训练营结业', 'AI辅助开发实践者'].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">"让每一个灵感都有归属"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
