
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CategorySelector from '@/components/home/CategorySelector';
import LocationSelector from '@/components/home/LocationSelector';
import PopularVacancies from '@/components/home/PopularVacancies';
import { ArrowRight, MousePointer, Zap, BarChart } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import { CategoryProvider } from '@/contexts/CategoryContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('register');
  const { t } = useLanguage();

  const handleGetStartedClick = () => {
    setAuthModalTab('register');
    setAuthModalOpen(true);
  };

  const handleDemoClick = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Category, Location and Vacancies with shared context */}
        <CategoryProvider>
          <div className="py-10 border-y border-border">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">{t('categories.filterBy')}</h2>
                  <CategorySelector />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4">{t('location.filterByLocation')}</h2>
                  <LocationSelector />
                </div>
              </div>
            </div>
          </div>
          <PopularVacancies />
        </CategoryProvider>
        
        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {t('features.heading')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('features.subheading')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-xl p-8 border border-border transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <MousePointer className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">{t('features.interface.title')}</h3>
                <p className="text-muted-foreground">
                  {t('features.interface.description')}
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-8 border border-border transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">{t('features.connections.title')}</h3>
                <p className="text-muted-foreground">
                  {t('features.connections.description')}
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-8 border border-border transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">{t('features.insights.title')}</h3>
                <p className="text-muted-foreground">
                  {t('features.insights.description')}
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <a href="#" className="inline-flex items-center text-primary font-medium hover:underline">
                {t('features.learnMore')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-r from-primary/90 to-primary rounded-2xl p-10 md:p-16 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {t('cta.heading')}
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                {t('cta.subheading')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={handleGetStartedClick}
                  className="bg-white text-primary px-8 py-3 rounded-full font-medium transition-transform hover:scale-105"
                >
                  {t('cta.getStarted')}
                </button>
                <button 
                  onClick={handleDemoClick}
                  className="text-white border border-white/30 px-8 py-3 rounded-full font-medium transition-transform hover:scale-105"
                >
                  {t('cta.demo')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default Index;
