
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Briefcase, Megaphone, User, LogOut, Home, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthModal from '@/components/auth/AuthModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

// Define the account types
export type AccountType = 'business' | 'advertiser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  // Check if we are on homepage
  const isHomePage = location.pathname === '/';
  
  // Extended authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check localStorage for auth state and account type on component mount
  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated');
    const storedAccountType = localStorage.getItem('accountType') as AccountType | null;
    
    if (authState === 'true') {
      setIsAuthenticated(true);
      setAccountType(storedAccountType);
    }
  }, []);

  const handleSignInClick = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  };

  const handleAccountSelection = (type: AccountType) => {
    setAccountType(type);
    localStorage.setItem('accountType', type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccountType(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('accountType');
  };

  const goToAccount = () => {
    navigate('/account');
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
          <Link to="/" className="text-2xl font-display font-bold text-foreground">
            BizAd<span className="text-primary">Connect</span>
          </Link>
          
          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isHomePage && (
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={() => navigate('/')}
              >
                <Home className="h-4 w-4 mr-2" />
                {t('nav.home')}
              </Button>
            )}
            
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="relative cursor-pointer">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className={cn(
                      "text-white font-medium",
                      accountType === 'business' ? "bg-blue-500" : "bg-primary"
                    )}>
                      {accountType === 'business' ? 'B' : 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-blue-500 border-2 border-background"></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {accountType === 'business' ? t('account.business') : t('account.advertiser')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {accountType && (
                    <>
                      <DropdownMenuItem className="cursor-pointer" onClick={goToAccount}>
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('nav.myAccount')}</span>
                      </DropdownMenuItem>
                      
                      {accountType === 'business' ? (
                        <DropdownMenuItem className="cursor-pointer">
                          {/* <Search className="mr-2 h-4 w-4" />
                          <span>{t('nav.findServices')}</span> */}
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="cursor-pointer">
                          <Megaphone className="mr-2 h-4 w-4" />
                          <span>{t('nav.myListings')}</span>
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                  
                  {!accountType && (
                    <>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleAccountSelection('business')}
                      >
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>{t('account.business')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleAccountSelection('advertiser')}
                      >
                        <Megaphone className="mr-2 h-4 w-4" />
                        <span>{t('account.advertiser')}</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('nav.signOut')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default"
                size="sm" 
                className="rounded-full"
                onClick={handleSignInClick}
              >
                {t('nav.signIn')}
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button 
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass animate-fade-in py-5 px-6 md:hidden">
            <nav className="flex flex-col space-y-4 mb-5">
              {!isHomePage && (
                <Link to="/" className="flex items-center text-foreground/80 hover:text-foreground py-2 transition-colors">
                  <Home className="h-4 w-4 mr-2" />
                  {t('nav.home')}
                </Link>
              )}
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
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 py-2">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback className={cn(
                        "text-white font-medium text-sm",
                        accountType === 'business' ? "bg-blue-500" : "bg-primary"
                      )}>
                        {accountType === 'business' ? 'B' : 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {accountType === 'business' ? 'Business Account' : 'Advertiser Account'}
                    </span>
                    <div className="ml-auto h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={goToAccount}
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Button>
                  
                  {!accountType && (
                    <div className="flex flex-col space-y-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleAccountSelection('business')}
                      >
                        <Briefcase className="mr-2 h-4 w-4" />
                        Business Account
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleAccountSelection('advertiser')}
                      >
                        <Megaphone className="mr-2 h-4 w-4" />
                        Advertiser Account
                      </Button>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="justify-start text-destructive border-destructive/20 hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
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
              // Get account type from localStorage if it exists
              const storedAccountType = localStorage.getItem('accountType') as AccountType | null;
              if (storedAccountType) {
                setAccountType(storedAccountType);
              }
            }
          }
        }} 
        defaultTab={authModalTab}
        onAuthSuccess={(selectedAccountType) => {
          // Set authentication state and store in localStorage
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
          // Set account type if provided (for registration)
          if (selectedAccountType) {
            setAccountType(selectedAccountType);
            localStorage.setItem('accountType', selectedAccountType);
          }
        }}
      />
    </>
  );
};

export default Navbar;
