import { Lightbulb, Target, Rocket, Wrench, Sparkles, Zap } from 'lucide-react';

const insights = [
  {
    icon: Lightbulb,
    title: 'AI编程的认知变化',
    color: 'from-amber-400 to-orange-500',
    content: [
      '2025年6月开始接触AI编程，最大的感受是：可以把脑子里的想法实实在在地落地了',
      '以前有想法只能停留在脑海中，现在可以快速变成实用的小工具',
      'AI不是来取代程序员的，而是让每个人都能具备"把想法变成产品"的能力'
    ]
  },
  {
    icon: Target,
    title: '产品开发全流程',
    color: 'from-blue-400 to-indigo-500',
    content: [
      '明确需求 → Demo验证 → 可行性讨论 → 版本规划 → PRD → UI设计 → 开发 → 测试 → 上线 → 迭代',
      '设计产品是做减法：先做最小化MVP验证核心价值，再做加法迭代功能',
      '每个迭代都要更新PRD文档，让产品演进有迹可循'
    ]
  },
  {
    icon: Wrench,
    title: '工具选择心得',
    color: 'from-emerald-400 to-teal-500',
    content: [
      'AI工具：Trae CN、Cursor、CodeBuddy CN（免费够用）、Claude Code Pro（确实好用）',
      '不止要会用工具，还要找到正确的使用方法，才能真正提高效率',
      '不同的场景用不同的工具，选择适合自己的最重要'
    ]
  },
  {
    icon: Sparkles,
    title: '痛点发掘方法',
    color: 'from-purple-400 to-pink-500',
    content: [
      '从自身需求出发：先用thought-mining skill梳理思路，挖掘真实痛点',
      '"我知道它存在，就是找不到"——这句话在我脑子里转了一晚上，于是有了SkillSearch',
      '观察日常场景，记录痛点，深度分析，找到最值得解决的问题'
    ]
  },
  {
    icon: Zap,
    title: '快速上线的秘密',
    color: 'from-yellow-400 to-amber-500',
    content: [
      '前端：Next.js + Vercel，半小时就能上线',
      '数据库：Supabase送的500MB足够MVP使用',
      '别在基础设施上纠结，快速验证想法才是关键'
    ]
  },
  {
    icon: Rocket,
    title: '给新手的话',
    color: 'from-rose-400 to-red-500',
    content: [
      '遇事先问AI，先思考问题再动手',
      '别追求完美，先做一个能用的MVP',
      '产品是迭代出来的，不是规划出来的',
      '享受"想法落地"的成就感，这比任何技术都重要'
    ]
  }
];

const InsightCard = ({ insight }: { insight: typeof insights[0] }) => {
  const Icon = insight.icon;
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${insight.color} mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-4">{insight.title}</h3>
      <ul className="space-y-2">
        {insight.content.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Insights = () => {
  return (
    <section id="insights" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">经验总结</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            从零开始做产品的一些心得和踩坑经验
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <InsightCard key={insight.title} insight={insight} />
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">最重要的一句话</h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            AI不是来取代你的，而是让你有能力把脑子里的想法变成现实。
            <br />
            别光想，动手做，先做出一个能用的MVP，其他的交给迭代。
          </p>
        </div>
      </div>
    </section>
  );
};
