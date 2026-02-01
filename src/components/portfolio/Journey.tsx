import { MessageSquare, GitBranch, Bug, Layers, Heart } from 'lucide-react';

const timeline = [
  { date: '2025年初', title: '第一次与AI对话的震撼', desc: '开始接触AI编程工具，被AI的能力所震撼，开始思考如何将AI融入开发 workflow。' },
  { date: '2025年6月', title: '沉浸AI的焦虑与思考', desc: '深入学习AI编程，经历了从焦虑到适应的过程，开始建立AI辅助开发的系统方法。' },
  { date: 'Vibe Coding训练营', title: '从点击到产品', desc: '完整学习AI编程方法论，从PRD撰写到产品部署，完成3个完整产品的开发。' },
  { date: '现在', title: '用代码+AI写下自己的序章', desc: '成为独立开发者，一个工具一个工具地做下去，用代码解决生活中的小麻烦。', highlight: true },
];

const insights = [
  { icon: MessageSquare, color: 'blue', title: '提示词工程是关键', desc: '学会写清晰的PRD和产品需求文档，AI才能生成符合预期的代码。需求越清晰，输出越准确。' },
  { icon: GitBranch, color: 'green', title: '小步快跑，持续迭代', desc: '不要试图一次性生成完美代码。先跑通MVP，再逐步优化。每个功能点单独对话效果更好。' },
  { icon: Bug, color: 'amber', title: 'Debug能力依然重要', desc: 'AI生成的代码可能有bug，需要具备基础的代码阅读能力和调试能力。理解代码逻辑比死记硬背更重要。' },
  { icon: Layers, color: 'purple', title: '技术栈选择建议', desc: '推荐：React + TypeScript + Tailwind + shadcn/ui + Supabase + Vercel。这套组合AI理解最好，社区资源丰富。' },
  { icon: Heart, color: 'rose', title: '从痛点出发', desc: '最好的产品idea来自自己的真实需求。解决自己遇到的问题，产品才更有价值。' },
];

const learningPath = [
  { num: '1', title: '基础认知', desc: '了解AI编程的能力边界，建立正确预期' },
  { num: '2', title: '工具熟悉', desc: '掌握Cursor/Claude Code等AI编程工具' },
  { num: '3', title: '小项目实战', desc: '从简单工具开始，完整走通开发流程' },
  { num: '4', title: '持续迭代', desc: '不断优化产品，积累开发经验' },
];

export const Journey = () => {
  return (
    <section id="journey" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">学习复盘</h2>
          <p className="text-xl text-muted-foreground">AI编程的心得与收获，给伙伴们的学习路径参考</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8">我的学习历程</h3>
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary-glow rounded-full" />

              {timeline.map((item, i) => (
                <div key={i} className="mb-8 relative">
                  <div className={`absolute -left-8 top-0 w-4 h-4 rounded-full border-4 border-card shadow ${item.highlight ? 'bg-gradient-to-r from-primary to-primary-glow' : 'bg-primary'}`} />
                  <div className={`${item.highlight ? 'bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20' : 'bg-card'} p-6 rounded-xl shadow-sm border border-border`}>
                    <span className="text-sm text-primary font-medium">{item.date}</span>
                    <h4 className="font-bold text-lg mt-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm mt-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-2xl font-bold mb-8">AI编程心得</h3>
            <div className="space-y-4">
              {insights.map((item, i) => (
                <div key={i} className="bg-card p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.color === 'blue' ? 'bg-blue-100' :
                      item.color === 'green' ? 'bg-green-100' :
                      item.color === 'amber' ? 'bg-amber-100' :
                      item.color === 'purple' ? 'bg-purple-100' :
                      'bg-rose-100'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        item.color === 'blue' ? 'text-blue-600' :
                        item.color === 'green' ? 'text-green-600' :
                        item.color === 'amber' ? 'text-amber-600' :
                        item.color === 'purple' ? 'text-purple-600' :
                        'text-rose-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">给新手的AI编程学习路径</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {learningPath.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">{step.num}</span>
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-white/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
