import { useEffect, useState } from 'react';
import { User, Briefcase, BookOpen, Lightbulb, Star, Rocket, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface NavItem {
  id: string;
  icon: typeof User;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'about', icon: User, label: '关于我' },
  { id: 'projects', icon: Briefcase, label: '项目路演' },
  { id: 'journey', icon: BookOpen, label: '学习复盘' },
  { id: 'insights', icon: Lightbulb, label: '经验总结' },
  { id: 'summary', icon: Star, label: '月度总结' },
  { id: 'deploy', icon: Rocket, label: '上线部署' },
];

export const SideNav = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }));

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
      isExpanded ? 'translate-x-0' : 'translate-x-[calc(100%-3rem)]'
    }`}>
      <div className="bg-card/90 backdrop-blur-md border-l border-t border-b border-border rounded-l-2xl shadow-2xl py-4">
        {/* 展开/收起按钮 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-16 bg-gradient-to-b from-primary to-primary-glow rounded-l-xl flex items-center justify-center text-white hover:shadow-lg transition-all"
        >
          {isExpanded ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
        </button>

        {/* 导航项 */}
        <div className="flex flex-col gap-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex items-center gap-3 p-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-primary group-hover:text-primary'}`} />
                <span className={`whitespace-nowrap text-sm font-medium transition-all ${
                  isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
