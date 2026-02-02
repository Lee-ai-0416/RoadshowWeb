import { Heart, TrendingUp, Lightbulb, Rocket, Target, Sparkles, ArrowRight } from 'lucide-react';

const phases = [
  {
    icon: Heart,
    title: '学习前的认知',
    content: '知道AI编程方便，但不知道如何从0到1开始。更多时候把AI当成工具或导师，遇到问题时才问问它。',
    color: 'from-slate-400 to-slate-500'
  },
  {
    icon: TrendingUp,
    title: '认知的转变',
    highlights: [
      'AI不仅仅能解决问题，还能从零到一实现想法',
      '技术不再是门槛 - C#、Java、Vue、Python、Next.js、React...都不再是障碍',
      '最大的进步：学会与AI交流',
      '从开发思维转向产品思维'
    ],
    color: 'from-blue-400 to-indigo-500'
  },
  {
    icon: Lightbulb,
    title: '产品方法论',
    highlights: [
      '先做减法：把想法一直减少，到最小化MVP',
      '跟AI讨论细化MVP，做出Demo验证可行性',
      '从0到1的正反馈：产品诞生的成就感是坚持下去的动力',
      '再做加法：MVP完成后逐步迭代功能',
      '记录PRD：避免反复返工，让产品演进有迹可循'
    ],
    color: 'from-amber-400 to-orange-500'
  },
  {
    icon: Rocket,
    title: '未来愿景',
    content: '在这个AI时代做出一些自己的事情，让大家认识我，分享AI，一起学习。做一个个人产品矩阵，把想法一个个实现。保持学习的态度迎接AI浪潮。',
    color: 'from-emerald-400 to-teal-500'
  }
];

const corePrinciples = [
  { icon: '🤝', title: 'AI不是工具，是合作伙伴', desc: '从零到一帮你实现想法' },
  { icon: '🚀', title: '技术不是门槛', desc: '不需要纠结语法，只需要审核和理解' },
  { icon: '💬', title: '学会与AI交流', desc: '比技术本身更重要' },
  { icon: '📦', title: '产品思维 > 开发思维', desc: '站在产品角度思考问题' },
  { icon: '➖', title: '先减后加', desc: 'MVP最小化验证，然后逐步迭代' },
  { icon: '📝', title: '记录PRD', desc: '避免反复返工，让产品演进有迹可循' },
  { icon: '✨', title: '享受从0到1', desc: '产品诞生的正反馈是坚持下去的动力' },
];

const PhaseCard = ({ phase }: { phase: typeof phases[0] }) => {
  const Icon = phase.icon;
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${phase.color} mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
      {phase.content ? (
        <p className="text-muted-foreground leading-relaxed">{phase.content}</p>
      ) : (
        <ul className="space-y-2">
          {phase.highlights?.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start">
              <ArrowRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const MonthlySummary = () => {
  return (
    <section id="summary" className="py-20 bg-gradient-to-b from-card to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">一个月的学习历程</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">AI Coding 月度总结</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            从把AI当工具，到学会与AI协作；从技术焦虑，到想法爆发
          </p>
        </div>

        {/* 学习历程 */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {phases.map((phase) => (
            <PhaseCard key={phase.title} phase={phase} />
          ))}
        </div>

        {/* 核心心法 */}
        <div className="bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">核心心法</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corePrinciples.map((principle, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{principle.icon}</div>
                <h4 className="font-semibold mb-1">{principle.title}</h4>
                <p className="text-sm opacity-90">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 最重要的话 */}
        <div className="bg-card rounded-2xl p-8 border-2 border-primary/20">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Target className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground">最想说的话</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                有了AI，编程技术真的再也不是我们的卡点了。我不需要再绞尽脑汁去关心语法和如何实现，只需要审核AI写的代码，看懂并应用即可。
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                学习了AI Coding之后，脑中的想法便是一发不可收拾。先做减法到MVP，再做加法迭代。
                <span className="text-primary font-semibold"> 当产品问世的那一刻，你会觉得一切好像都值得。</span>
                这种正反馈，就是一直坚持下去的动力。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
