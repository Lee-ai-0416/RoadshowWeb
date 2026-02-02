import { useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';

export const Navigation = () => {
  const [navShadow, setNavShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavShadow(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 glass-effect transition-shadow ${navShadow ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl gradient-text">LEE</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('about')} className="relative text-muted-foreground hover:text-primary font-medium transition-colors group">
              关于我
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all group-hover:w-full" />
            </button>
            <button onClick={() => scrollToSection('projects')} className="relative text-muted-foreground hover:text-primary font-medium transition-colors group">
              项目路演
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all group-hover:w-full" />
            </button>
            <button onClick={() => scrollToSection('journey')} className="relative text-muted-foreground hover:text-primary font-medium transition-colors group">
              学习复盘
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all group-hover:w-full" />
            </button>
            <button onClick={() => scrollToSection('insights')} className="relative text-muted-foreground hover:text-primary font-medium transition-colors group">
              经验总结
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all group-hover:w-full" />
            </button>
            <button onClick={() => scrollToSection('deploy')} className="relative text-muted-foreground hover:text-primary font-medium transition-colors group">
              上线部署
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all group-hover:w-full" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
