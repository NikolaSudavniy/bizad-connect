import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Search, Building, Users, Book, Star, 
  FileText, Edit, Plus, Bell, ChartLine, GraduationCap, Home, Heart,
  MessageSquare, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AccountType } from '@/components/layout/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import VacancyCard, { VacancyProps } from '@/components/home/VacancyCard';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";

const fetchFavoriteVacancies = async (): Promise<VacancyProps[]> => {
  const favoriteIds = JSON.parse(localStorage.getItem('favoriteVacancies') || '[]');
  
  if (favoriteIds.length === 0) {
    return [];
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allVacancies = [
    { id: 1, title: 'Front-end розробник', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '2 роки', postedTime: '16 год. тому', progress: 6, isNew: true, categories: ['digital', 'social'] },
    { id: 2, title: 'Front-end розробник', company: 'Планета, мебельна майстерня', location: 'Дніпро', salary: '37 000 грн', postedTime: '2 дні тому', categories: ['digital', 'print'] },
    { id: 3, title: 'Front-end програміст', company: 'Свідк маркетинг, ТОВ', location: 'Київ', experience: '1 рік', postedTime: '4 дні тому', categories: ['digital'] },
    { id: 4, title: 'Junior Front-end Web Developer', company: 'Atlas Digital Ventures', location: 'Київ', salary: '25 000 - 33 000 грн', postedTime: '5 днів тому', categories: ['digital', 'social'] },
    { id: 5, title: 'Front-end розробник (React.js)', company: 'SoftServe LLC', location: 'Київ', salary: '60 000 грн', experience: '3 роки', postedTime: '7 днів тому', categories: ['digital'] }
  ];
  
  return allVacancies.filter(vacancy => favoriteIds.includes(vacancy.id));
};

const removeFavorite = (vacancyId: number): void => {
  const favorites = JSON.parse(localStorage.getItem('favoriteVacancies') || '[]');
  const newFavorites = favorites.filter(id => id !== vacancyId);
  localStorage.setItem('favoriteVacancies', JSON.stringify(newFavorites));
};

const Account = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [activeTab, setActiveTab] = useState<string>('profile');
  const { t } = useLanguage();

  useEffect(() => {
    const checkAuth = () => {
      const authState = localStorage.getItem('isAuthenticated');
      const storedAccountType = localStorage.getItem('accountType') as AccountType | null;
      
      if (authState !== 'true') {
        navigate('/');
        return false;
      }
      
      setIsAuthenticated(true);
      setAccountType(storedAccountType);
      return true;
    };
    
    checkAuth();
    
    const handleStorageChange = () => {
      const isStillAuthenticated = checkAuth();
      if (!isStillAuthenticated) {
        navigate('/');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  if (!isAuthenticated || !accountType) {
    return null;
  }

  const getTabContent = () => {
    if (accountType === 'business') {
      switch (activeTab) {
        case 'profile':
          return <BusinessProfile />;
        case 'search':
          return <AdSearch />;
        case 'agencies':
          return <AgencyOffers />;
        case 'favorites':
          return <Favorites />;
        case 'training':
          return <BusinessTraining />;
        case 'reviews':
          return <Reviews />;
        case 'chats':
          return <Chats />;
        default:
          return <BusinessProfile />;
      }
    } else {
      switch (activeTab) {
        case 'profile':
          return <AgencyProfile />;
        case 'offers':
          return <ManagingOffers />;
        case 'requests':
          return <Requests />;
        case 'favorites':
          return <Favorites />;
        case 'training':
          return <AgencyTraining />;
        case 'reports':
          return <Reports />;
        case 'reviews':
          return <Reviews />;
        case 'chats':
          return <Chats />;
        default:
          return <AgencyProfile />;
      }
    }
  };

  const businessUserData = {
    name: 'Діфоменко О. М.',
    type: 'ФОП',
    email: 'difomenko@example.com',
    phone: '+380 97 123 4567',
    website: 'difomenko.com.ua',
    location: 'Дніпро, Україна',
    about: 'Компанія спеціалізується на розробці бізнес-рішень для малого та середнього бізнесу.',
    rating: 4.7,
    verified: true,
    joinDate: 'Січень 2020',
    listingCount: 12,
    premium: true,
    socialLinks: {
      linkedin: 'https://linkedin.com/company/difomenko',
      facebook: 'https://facebook.com/difomenko',
      twitter: 'https://twitter.com/difomenko'
    }
  };

  const advertiserUserData = {
    name: 'Марина Костенко',
    email: 'marina.kostenko@example.com',
    phone: '+380 50 987 6543',
    website: 'marinakostenko.design',
    location: 'Київ, Україна',
    about: 'Дизайнер і консультант з маркетингу з 5-річним досвідом у сфері реклами.',
    rating: 4.9,
    verified: true,
    joinDate: 'Березень 2021',
    clientCount: 24,
    premium: false,
    portfolio: [
      { id: 1, title: 'Рекламна кампанія для "Еко-маркет"', image: 'https://placehold.co/600x400/jpeg' },
      { id: 2, title: 'Брендинг для "Світоч"', image: 'https://placehold.co/600x400/jpeg' },
      { id: 3, title: 'Дизайн упаковки "Мор��инська"', image: 'https://placehold.co/600x400/jpeg' }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/marina.design',
      behance: 'https://behance.net/marina.kostenko',
      dribbble: 'https://dribbble.com/marina_kostenko'
    }
  };

  const businessListings = [
    { id: 1, title: 'Front-end розробник', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '2 роки', postedTime: '16 год. тому', progress: 6, isNew: true, categories: ['digital', 'social'] },
    { id: 2, title: 'Back-end розробник', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', salary: '40 000 грн', postedTime: '2 дні тому', categories: ['digital', 'print'] },
    { id: 3, title: 'DevOps інженер', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '3+ роки', postedTime: '3 дні тому', categories: ['digital', 'events'] }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto pt-24 px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {accountType === 'business' ? t('business.dashboard') : t('agency.dashboard')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {accountType === 'business' ? t('business.manageProfile') : t('agency.manageProfile')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <div className="space-y-4">
            <div className="font-medium text-muted-foreground text-sm mb-2">
              DASHBOARD
            </div>
            
            {accountType === 'business' ? (
              <div className="space-y-1">
                <Button
                  variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <Building className="mr-2 h-4 w-4" />
                  {t('business.profile')}
                </Button>
                <Button
                  variant={activeTab === 'search' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('search')}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {t('business.search')}
                </Button>
                <Button
                  variant={activeTab === 'agencies' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('agencies')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  {t('business.agencies')}
                </Button>
                <Button
                  variant={activeTab === 'favorites' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('favorites')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  {t('business.favorites')}
                </Button>
                <Button
                  variant={activeTab === 'training' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('training')}
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  {t('business.training')}
                </Button>
                <Button
                  variant={activeTab === 'reviews' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('reviews')}
                >
                  <Star className="mr-2 h-4 w-4" />
                  {t('business.reviews')}
                </Button>
                <Button
                  variant={activeTab === 'chats' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('chats')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {t('business.chats')}
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                <Button
                  variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  {t('agency.profile')}
                </Button>
                <Button
                  variant={activeTab === 'offers' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('offers')}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {t('agency.offers')}
                </Button>
                <Button
                  variant={activeTab === 'requests' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('requests')}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  {t('agency.requests')}
                </Button>
                <Button
                  variant={activeTab === 'favorites' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('favorites')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  {t('agency.favorites')}
                </Button>
                <Button
                  variant={activeTab === 'training' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('training')}
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  {t('agency.training')}
                </Button>
                <Button
                  variant={activeTab === 'reports' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('reports')}
                >
                  <ChartLine className="mr-2 h-4 w-4" />
                  {t('agency.reports')}
                </Button>
                <Button
                  variant={activeTab === 'reviews' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('reviews')}
                >
                  <Star className="mr-2 h-4 w-4" />
                  {t('agency.reviews')}
                </Button>
                <Button
                  variant={activeTab === 'chats' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('chats')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {t('agency.chats')}
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm p-6">
            {getTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const Favorites = () => {
  const { t } = useLanguage();
  
  const { data: favorites = [], isLoading, refetch } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavoriteVacancies,
  });
  
  const handleRemoveFromFavorites = (vacancyId: number) => {
    removeFavorite(vacancyId);
    refetch();
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('favorites.title')}</h2>
      <p className="text-muted-foreground">{t('favorites.description')}</p>
      
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">{t('favorites.loading')}</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Heart className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-medium mb-2">{t('favorites.noFavorites')}</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            {t('favorites.noFavoritesDescription')}
          </p>
          <Button onClick={() => window.location.href = '/vacancies'}>
            {t('favorites.browseVacancies')}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(vacancy => (
            <VacancyCard 
              key={vacancy.id} 
              vacancy={vacancy} 
              onFavoriteToggle={() => handleRemoveFromFavorites(vacancy.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const BusinessProfile = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('business.profileTitle')}</h2>
      <p className="text-muted-foreground">{t('business.profileDescription')}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('business.companyInformation')}</CardTitle>
          <CardDescription>{t('business.companyInfoDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-muted-foreground">{t('business.companyFormPlaceholder')}</p>
            <Button disabled className="mt-4">{t('business.updateProfile')}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdSearch = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('business.adSearchTitle')}</h2>
      <p className="text-muted-foreground">{t('business.adSearchDescription')}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('business.searchFilters')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-muted-foreground">{t('business.searchFiltersPlaceholder')}</p>
            <Button className="mt-4">{t('business.searchButton')}</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">{t('business.premiumAdvertising')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('business.digitalMarketing')}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold">{t('business.pricePerMonth')}</span>
              <Button size="sm">{t('business.viewDetails')}</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">{t('business.videoProduction')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('business.videoDesc')}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold">{t('business.pricePerProject')}</span>
              <Button size="sm">{t('business.viewDetails')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AgencyOffers = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('business.agencyOffersTitle')}</h2>
      <p className="text-muted-foreground">{t('business.agencyOffersDescription')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t('business.digitalMastersAgency')}</CardTitle>
              <div className="flex">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <CardDescription>{t('business.digitalSpecialists')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">{t('business.specializingIn')}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Social Media</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">SEO</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">PPC</span>
              </div>
              <Button className="w-full mt-4">{t('business.contactAgency')}</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t('business.creativeVisionStudios')}</CardTitle>
              <div className="flex">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <CardDescription>{t('business.videoContent')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">{t('business.professionalVideo')}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Video</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Design</span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Animation</span>
              </div>
              <Button className="w-full mt-4">{t('business.contactAgency')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const BusinessTraining = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('business.trainingResourcesTitle')}</h2>
      <p className="text-muted-foreground">{t('business.trainingResourcesDescription')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('business.advertisingBasics')}</CardTitle>
            <CardDescription>{t('business.advertisingBasicsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">{t('business.viewCourse')}</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('business.digitalMarketingGuide')}</CardTitle>
            <CardDescription>{t('business.digitalMarketingGuideDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">{t('business.downloadGuide')}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Reviews = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('business.reviewsRatingsTitle')}</h2>
      <p className="text-muted-foreground">{t('business.reviewsRatingsDescription')}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('business.yourReviews')}</CardTitle>
          <CardDescription>{t('business.manageReviews')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{t('business.digitalMastersAgency')}</h3>
                  <div className="flex mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{t('business.daysAgo')}</span>
              </div>
              <p className="text-sm mt-2">{t('business.growthEngagement')}</p>
            </div>
            
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{t('business.creativeVisionStudios')}</h3>
                  <div className="flex mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{t('business.weekAgo')}</span>
              </div>
              <p className="text-sm mt-2">{t('business.exceptionalQuality')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AgencyProfile = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('agency.profileTitle')}</h2>
      <p className="text-muted-foreground">{t('agency.profileDescription')}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('agency.agencyInformation')}</CardTitle>
          <CardDescription>{t('agency.agencyInfoDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-muted-foreground">{t('agency.agencyFormPlaceholder')}</p>
            <Button disabled className="mt-4">{t('business.updateProfile')}</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('agency.portfolio')}</CardTitle>
          <CardDescription>{t('agency.portfolioDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <Button className="mt-4">{t('agency.addPortfolioItem')}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const ManagingOffers = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('agency.managingOffersTitle')}</h2>
          <p className="text-muted-foreground">{t('agency.managingOffersDescription')}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('agency.newOffer')}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{t('agency.socialMediaManagement')}</CardTitle>
              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{t('agency.active')}</div>
            </div>
            <CardDescription>{t('agency.socialMediaPackage')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">{t('agency.description')}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t('agency.socialMediaDesc')}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">{t('agency.price')}</h3>
                  <p className="text-sm font-semibold mt-1">$1,200 / month</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t('agency.duration')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t('agency.minimumMonths')}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  {t('agency.edit')}
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">{t('agency.delete')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{t('agency.videoProduction')}</CardTitle>
              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{t('agency.active')}</div>
            </div>
            <CardDescription>{t('agency.professionalVideos')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">{t('agency.description')}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t('agency.videoProductionDesc')}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">{t('agency.price')}</h3>
                  <p className="text-sm font-semibold mt-1">$2,500 / project</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t('agency.duration')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t('agency.weeksPerProject')}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  {t('agency.edit')}
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">{t('agency.delete')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Requests = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('agency.requestsTitle')}</h2>
      <p className="text-muted-foreground">{t('agency.requestsDescription')}</p>
      
      <Tabs defaultValue="new">
        <TabsList className="mb-4">
          <TabsTrigger value="new">{t('agency.newRequests')}</TabsTrigger>
          <TabsTrigger value="inProgress">{t('agency.inProgress')}</TabsTrigger>
          <TabsTrigger value="completed">{t('agency.completed')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{t('agency.socialMediaCampaign')}</CardTitle>
                <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">{t('agency.new')}</div>
              </div>
              <CardDescription>{t('agency.from')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">{t('agency.requestDetails')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t('agency.lookingFor')}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">{t('agency.budget')}</h3>
                    <p className="text-sm font-semibold mt-1">{t('agency.budgetRange')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{t('agency.timeline')}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t('agency.months')}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm">{t('agency.acceptRequest')}</Button>
                  <Button variant="outline" size="sm">{t('agency.contactClient')}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inProgress">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{t('agency.websiteBannerAds')}</CardTitle>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{t('agency.inProgressStatus')}</div>
              </div>
              <CardDescription>{t('agency.from')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">{t('agency.status')}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t('agency.complete')}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">{t('agency.nextSteps')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t('agency.designReview')}</p>
                </div>
                
                <Button variant="outline" size="sm">{t('agency.viewProjectDetails')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="text-center py-10">
            <p className="text-muted-foreground">{t('agency.noCompletedRequests')}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AgencyTraining = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('agency.trainingTitle')}</h2>
      <p className="text-muted-foreground">{t('agency.trainingDescription')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('agency.ppcStrategies')}</CardTitle>
            <CardDescription>{t('agency.ppcDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('agency.modules')}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t('agency.advanced')}</span>
              </div>
              <Button variant="outline" className="w-full mt-2">{t('agency.startCourse')}</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('agency.contentMarketing')}</CardTitle>
            <CardDescription>{t('agency.contentDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('agency.modules')}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t('agency.intermediate')}</span>
              </div>
              <Button variant="outline" className="w-full mt-2">{t('agency.startCourse')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Reports = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('agency.reportsTitle')}</h2>
      <p className="text-muted-foreground">{t('agency.reportsDescription')}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('agency.totalCampaigns')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 mr-1">{t('agency.increase')}</span> {t('agency.fromLastMonth')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('agency.activeClients')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 mr-1">{t('agency.increase')}</span> {t('agency.fromLastMonth')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('agency.revenue')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,500</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 mr-1">{t('agency.percentIncrease')}</span> {t('agency.fromLastMonth')}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('agency.campaignPerformance')}</CardTitle>
          <CardDescription>{t('agency.campaignMetrics')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60 flex items-center justify-center border rounded-md bg-muted/10">
            <p className="text-muted-foreground">{t('agency.performanceChart')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Chats = () => {
  const { t } = useLanguage();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const chats = [
    {
      id: 1,
      name: 'Діфоменко О. М., ФОП',
      lastMessage: 'Дякую за інформацію, будемо чекати на деталі.',
      time: '14:30',
      unread: 2,
      avatar: 'D',
      messages: [
        { id: 1, text: 'Доброго дня! Зацікавлені у вашій пропозиції.', sent: false, time: '12:15' },
        { id: 2, text: 'Доброго дня! Радий чути. Яка саме пропозиція вас зацікавила?', sent: true, time: '12:20' },
        { id: 3, text: 'Рекламна кампанія для соціальних мереж.', sent: false, time: '12:45' },
        { id: 4, text: 'Чудово, ми можемо організувати зустріч для обговорення деталей.', sent: true, time: '13:05' },
        { id: 5, text: 'Дякую за інформацію, будемо чекати на деталі.', sent: false, time: '14:30' },
      ]
    },
    {
      id: 2,
      name: 'Свідк маркетинг, ТОВ',
      lastMessage: 'Коли можемо розпочати проект?',
      time: '10:45',
      unread: 0,
      avatar: 'С',
      messages: [
        { id: 1, text: 'Добрий день! Хотіли б дізнатися про ваші послуги.', sent: false, time: '9:10' },
        { id: 2, text: 'Добрий день! Звичайно, чим можу допомогти?', sent: true, time: '9:15' },
        { id: 3, text: 'Нас цікавить розробка веб-сайту для нашої компанії.', sent: false, time: '9:30' },
        { id: 4, text: 'Можу надіслати вам наше портфоліо і цінову пропозицію.', sent: true, time: '9:45' },
        { id: 5, text: 'Коли можемо розпочати проект?', sent: false, time: '10:45' },
      ]
    },
    {
      id: 3,
      name: 'Atlas Digital Ventures',
      lastMessage: 'We would like to schedule a meeting next week.',
      time: 'Вчора',
      unread: 0,
      avatar: 'A',
      messages: [
        { id: 1, text: 'Hello! We are looking for a marketing agency.', sent: false, time: 'Вчора, 11:20' },
        { id: 2, text: 'Hello! I would be happy to discuss our services with you.', sent: true, time: 'Вчора, 11:30' },
        { id: 3, text: 'Great! Could you share some information about your rates?', sent: false, time: 'Вчора, 12:15' },
        { id: 4, text: 'Of course, I will send you our price list shortly.', sent: true, time: 'Вчора, 14:00' },
        { id: 5, text: 'We would like to schedule a meeting next week.', sent: false, time: 'Вчора, 16:45' },
      ]
    }
  ];
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('chats.title') || 'Повідомлення'}</h2>
      <p className="text-muted-foreground">{t('chats.description') || 'Керуйте вашими розмовами з клієнтами та партнерами.'}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 h-[600px] border rounded-md overflow-hidden">
        <div className="border-r bg-muted/20">
          <div className="p-4 border-b">
            <h3 className="font-medium">{t('chats.conversations') || 'Розмови'}</h3>
          </div>
          <div className="overflow-y-auto h-[calc(600px-57px)]">
            {chats.map(chat => (
              <div 
                key={chat.id}
                className={`p-4 border-b hover:bg-muted/30 cursor-pointer ${selectedChat === chat.id ? 'bg-muted/50' : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium truncate">{chat.name}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{chat.time}</span>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-muted-foreground truncate mr-2">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {chats.find(c => c.id === selectedChat)?.avatar}
              </div>
              <h3 className="font-medium">{chats.find(c => c.id === selectedChat)?.name}</h3>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chats.find(c => c.id === selectedChat)?.messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sent 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted/50'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className={`text-xs mt-1 block text-right ${
                    message.sent 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input 
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder={t('chats.typeMessage') || "Введіть повідомлення..."}
                className="flex-1"
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                disabled={newMessage.trim() === ''}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
