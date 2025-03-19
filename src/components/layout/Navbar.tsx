
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthModal from '@/components/auth/AuthModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  // Simulated authentication state - this would typically come from an auth context
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check localStorage for auth state on component mount
  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignInClick = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  };

  const handleAvatarClick = () => {
    // For demo purposes: toggle authentication state
    if (isAuthenticated) {
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    }
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
            
            {isAuthenticated ? (
              <div className="relative cursor-pointer" onClick={handleAvatarClick}>
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-blue-500 border-2 border-background"></div>
              </div>
            ) : (
              <Button 
                variant="default"
                size="sm" 
                className="rounded-full"
                onClick={handleSignInClick}
              >
                Sign In
              </Button>
            )}
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
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 py-2" onClick={handleAvatarClick}>
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">My Account</span>
                  <div className="ml-auto h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                </div>
              ) : (
                <Button 
                  variant="default"
                  size="sm" 
                  className="justify-center rounded-full"
                  onClick={handleSignInClick}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={(open) => {
          setAuthModalOpen(open);
          // Check if user was authenticated through the modal
          if (!open) {
            const authState = localStorage.getItem('isAuthenticated');
            if (authState === 'true') {
              setIsAuthenticated(true);
            }
          }
        }} 
        defaultTab={authModalTab}
        onAuthSuccess={() => {
          // Set authentication state and store in localStorage
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
        }}
      />
    </>
  );
};

export default Navbar;
