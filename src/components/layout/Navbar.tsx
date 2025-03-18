
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthModal from '@/components/auth/AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignInClick = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
          isScrolled ? "glass" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-2xl font-display font-bold text-foreground">
            BizAd<span className="text-primary">Connect</span>
          </a>
          
          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="rounded-full">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="default"
              size="sm" 
              className="rounded-full"
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass animate-fade-in py-5 px-6 md:hidden">
            <nav className="flex flex-col space-y-4 mb-5">
              <a href="#" className="text-foreground/80 hover:text-foreground py-2 transition-colors">
                Find Ads
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground py-2 transition-colors">
                Post Ad
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground py-2 transition-colors">
                Business Solutions
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground py-2 transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex flex-col space-y-3">
              <Button variant="outline" size="sm" className="justify-start rounded-full">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button 
                variant="default"
                size="sm" 
                className="justify-center rounded-full"
                onClick={handleSignInClick}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </header>
      
      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen} 
        defaultTab={authModalTab} 
      />
    </>
  );
};

export default Navbar;
