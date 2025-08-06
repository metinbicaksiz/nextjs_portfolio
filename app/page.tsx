import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Navigation />
        <HeroSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
} 