import { Navigation } from '@/components/portfolio/Navigation';
import { SideNav } from '@/components/portfolio/SideNav';
import { Hero } from '@/components/portfolio/Hero';
import { Projects } from '@/components/portfolio/Projects';
import { Journey } from '@/components/portfolio/Journey';
import { Insights } from '@/components/portfolio/Insights';
import { MonthlySummary } from '@/components/portfolio/MonthlySummary';
import { Deploy } from '@/components/portfolio/Deploy';
import { Footer } from '@/components/portfolio/Footer';
import { ChatWidget } from '@/components/portfolio/ChatWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SideNav />
      <Hero />
      <Projects />
      <Journey />
      <Insights />
      <MonthlySummary />
      <Deploy />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
