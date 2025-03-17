
import React from 'react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/SearchBar';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background pointer-events-none" />
      
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 blur-3xl opacity-30 w-[600px] h-[600px] bg-primary/30 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 blur-3xl opacity-30 w-[600px] h-[600px] bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/3" />
      
      <div className="relative container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-slide-down">
              Where Business Meets <span className="text-primary">Advertising</span>
            </h1>
            <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto animate-slide-down animate-delay-100">
              The most intuitive platform to connect businesses with the perfect advertising opportunities.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mt-8 animate-slide-down animate-delay-200">
            <SearchBar />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slide-down animate-delay-300">
            <Button size="lg" className="rounded-full min-w-[140px]">
              Post an Ad
            </Button>
            <Button variant="outline" size="lg" className="rounded-full min-w-[140px]">
              Browse Listings
            </Button>
          </div>
          
          <div className="pt-10 flex flex-col md:flex-row items-center justify-center text-sm text-muted-foreground space-y-2 md:space-y-0 md:space-x-8 animate-slide-down animate-delay-400">
            <div className="flex items-center">
              <div className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                <div className="h-2 w-2 bg-primary rounded-full" />
              </div>
              <span>10,000+ Active Listings</span>
            </div>
            <div className="flex items-center">
              <div className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                <div className="h-2 w-2 bg-primary rounded-full" />
              </div>
              <span>5,000+ Companies</span>
            </div>
            <div className="flex items-center">
              <div className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                <div className="h-2 w-2 bg-primary rounded-full" />
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
