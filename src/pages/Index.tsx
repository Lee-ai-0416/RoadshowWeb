import { Navigation } from '@/components/portfolio/Navigation';
import { Hero } from '@/components/portfolio/Hero';
import { Projects } from '@/components/portfolio/Projects';
import { Journey } from '@/components/portfolio/Journey';
import { Deploy } from '@/components/portfolio/Deploy';
import { Footer } from '@/components/portfolio/Footer';
import { ChatWidget } from '@/components/portfolio/ChatWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Projects />
      <Journey />
      <Deploy />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
