import { Target, Lightbulb, Wrench, Github, ExternalLink, Archive, Search, Globe } from 'lucide-react';

const projects = [
  {
    id: 1,
    badge: { color: 'amber', label: '项目一' },
    title: '拾光 (TimePick)',
    subtitle: '智能资料存储系统 - "让每一个灵感都有归属"',
    icon: Archive,
    iconBg: 'from-amber-400 to-orange-500',
    painPoint: '网页资料收藏后 never read later，设计灵感散落各处，"我知道它存在，但就是找不到"的信息检索难题，日常信息碎片化无法有效整理。',
    solution: '智能资料收集（AI自动提取关键信息）+ 灵感随时记录（语音输入）+ 多维分类管理（无限层级文件夹+多标签）+ 全局极速搜索。',
    mvp: [
      '粘贴链接自动识别标题内容',
      'AI自动提取关键信息并智能分类',
      '多标签系统 + 无限层级文件夹',
      '全文检索 + 每日运势抽签特色功能',
    ],
    techStack: ['React 19', 'TypeScript', 'Vite 6', 'Supabase', 'Tailwind CSS', 'shadcn/ui'],
    stats: { period: '2周', code: '~5000行', ai: '70%' },
    githubUrl: 'https://github.com/Lee0317-ai/TimePick',
    demoUrl: 'https://277078962e8c471691f9db87fae77eb3.prod.enter.pro/',
    order: 'left',
  },
  {
    id: 2,
    badge: { color: 'indigo', label: '项目二' },
    title: 'Skill Search',
    subtitle: 'AI Skill 搜索平台 - "一句话找到想要的AI Skill"',
    icon: Search,
    iconBg: 'from-indigo-500 to-purple-600',
    painPoint: 'AI Skill 分散在GitHub各处缺乏统一入口，现有工具搜索体验不佳（skills.sh不支持语义匹配），"我知道它存在，但就是找不到"的困境。',
    solution: '关键词搜索 + 语义搜索（自然语言描述需求智能匹配）+ 热门推荐 + 本地Skill管理（树状文件浏览器）。',
    mvp: [
      '关键词快速定位已知Skill',
      '语义搜索：描述需求，智能匹配',
      '热门推荐：发现大家都在用的Skill',
      '每日自动从GitHub爬取最新数据',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'SWR', 'GitHub API'],
    stats: { period: '1周', code: '~3000行', ai: '75%' },
    githubUrl: 'https://github.com/Lee0317-ai/skill_search',
    demoUrl: 'https://skill-search-pink.vercel.app/',
    order: 'right',
  },
  {
    id: 3,
    badge: { color: 'emerald', label: '项目三' },
    title: "Lee's Online",
    subtitle: '个人作品集网站 - "用代码+AI写下自己的序章"',
    icon: Globe,
    iconBg: 'from-emerald-400 to-teal-500',
    painPoint: '独立开发者需要展示个人作品，缺乏集中展示多个项目的入口，需要建立个人品牌和在线形象。',
    solution: '个人简介时间线 + 产品展示 + 工具展示 + AI学习区 + 主题切换，打造完整的个人品牌形象。',
    mvp: [
      '个人成长时间线展示',
      '产品作品集展示',
      'AI学习资源分享',
      '深色/浅色主题切换',
    ],
    techStack: ['React 19', 'TypeScript', 'Vite 6', 'Tailwind CSS', 'shadcn/ui', 'Enter.pro'],
    stats: { period: '3天', code: '~2000行', ai: '80%' },
    githubUrl: 'https://github.com/Lee0317-ai/Lee_Online',
    demoUrl: 'https://deea49bca1084f7791316fb28df0e503.prod.enter.pro/',
    order: 'left',
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const isLeft = project.order === 'left';

  // 颜色映射
  const badgeColors = {
    amber: { bg: 'bg-amber-100', text: 'text-amber-700' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  };

  const colors = badgeColors[project.badge.color as keyof typeof badgeColors];

  return (
    <div className="mb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={isLeft ? 'order-2 md:order-1' : ''}>
          <div className={`inline-flex items-center space-x-2 ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-medium mb-4`}>
            <span>{project.badge.label}</span>
          </div>
          <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
          <p className="text-lg text-primary font-medium mb-4">{project.subtitle}</p>

          <div className="space-y-4 mb-6">
            <div className="bg-secondary p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2 text-red-500" />痛点场景
              </h4>
              <p className="text-sm text-muted-foreground">{project.painPoint}</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />解决方案
              </h4>
              <p className="text-sm text-muted-foreground">{project.solution}</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-blue-500" />MVP功能
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {project.mvp.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-secondary text-muted-foreground rounded-full text-xs">{tech}</span>
            ))}
          </div>

          <div className="flex space-x-3">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition">
              <Github className="w-5 h-5" />
              <span className="text-sm">查看代码</span>
            </a>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition">
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm">在线演示</span>
            </a>
          </div>
        </div>
        <div className={isLeft ? 'order-1 md:order-2' : ''}>
          <div className="bg-gradient-to-br from-card to-secondary rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-transform">
            <div className={`bg-gradient-to-br ${project.iconBg} rounded-xl h-64 flex items-center justify-center mb-4`}>
              <div className="text-center text-white">
                <project.icon className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-xl font-semibold">{project.title.split(' ')[0]}</p>
                <p className="text-sm opacity-80">{project.title.includes('(') ? project.title.match(/\(([^)]+)\)/)?.[1] : project.title}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">开发周期</span>
                <span className="font-medium">{project.stats.period}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">代码量</span>
                <span className="font-medium">{project.stats.code}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">AI贡献度</span>
                <span className="font-medium">{project.stats.ai}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">项目路演</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            从发现痛点场景到MVP实现，分享从点击到产品的挖掘思路
          </p>
        </div>

        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
