import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Search, Building, Users, Book, Star, 
  MessageSquare, FileText, Edit, Plus, Bell, ChartLine, GraduationCap, Home, Heart
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

const fetchFavoriteVacancies = async (): Promise<VacancyProps[]> => {
  const favoriteIds = JSON.parse(localStorage.getItem('favoriteVacancies') || '[]');
  
  if (favoriteIds.length === 0) {
    return [];
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allVacancies = [
    { id: 1, title: 'Front-end розробник', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '2 роки', postedTime: '16 год. тому', progress: 6, isNew: true },
    { id: 2, title: 'Front-end розробник', company: 'Планета, мебельна майстерня', location: 'Дніпро', salary: '37 000 грн', postedTime: '2 дні тому' },
    { id: 3, title: 'Front-end програміст', company: 'Свідк маркетинг, ТОВ', location: 'Київ', experience: '1 рік', postedTime: '4 дні тому' },
    { id: 4, title: 'Junior Front-end Web Developer', company: 'Atlas Digital Ventures', location: 'Київ', salary: '25 000 - 33 000 грн', postedTime: '5 днів тому' },
    { id: 5, title: 'Front-end розробник (React.js)', company: 'SoftServe LLC', location: 'Київ', salary: '60 000 грн', experience: '3 роки', postedTime: '7 днів тому' }
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
    const authState = localStorage.getItem('isAuthenticated');
    const storedAccountType = localStorage.getItem('accountType') as AccountType | null;
    
    if (authState !== 'true') {
      navigate('/');
      return;
    }
    
    setIsAuthenticated(true);
    setAccountType(storedAccountType);
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
        case 'messages':
          return <Messages />;
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
        default:
          return <AgencyProfile />;
      }
    }
  };

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
                  variant={activeTab === 'messages' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {t('business.messages')}
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

const BusinessProfile = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Business Profile</h2>
    <p className="text-muted-foreground">Manage information about your company.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>Fill in details about your business to help agencies understand your needs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-muted-foreground">Company information form would go here</p>
          <Button disabled className="mt-4">Update Profile</Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

const AdSearch = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Ad Search</h2>
    <p className="text-muted-foreground">Find advertising services with filters by type, budget, and terms.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Search Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-muted-foreground">Ad search filters would go here</p>
          <Button className="mt-4">Search</Button>
        </div>
      </CardContent>
    </Card>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Premium Advertising</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Digital marketing campaign with social media integration</p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold">$1,200 / month</span>
            <Button size="sm">View Details</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Video Production</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Professional video ads for your business</p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold">$800 / project</span>
            <Button size="sm">View Details</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const AgencyOffers = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Agency Offers</h2>
    <p className="text-muted-foreground">Browse agency cards, services, and reviews.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Digital Masters Agency</CardTitle>
            <div className="flex">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <CardDescription>Digital marketing specialists</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">Specializing in SEO, PPC, and social media campaigns.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Social Media</span>
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">SEO</span>
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">PPC</span>
            </div>
            <Button className="w-full mt-4">Contact Agency</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Creative Vision Studios</CardTitle>
            <div className="flex">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
          <CardDescription>Video and visual content creation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">Professional video production and graphic design services.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Video</span>
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Design</span>
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Animation</span>
            </div>
            <Button className="w-full mt-4">Contact Agency</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const BusinessTraining = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Training Resources</h2>
    <p className="text-muted-foreground">Access instructions and materials on advertising.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Advertising Basics</CardTitle>
          <CardDescription>Learn the fundamentals of effective advertising</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">View Course</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Digital Marketing Guide</CardTitle>
          <CardDescription>Comprehensive guide to digital marketing channels</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">Download Guide</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Reviews = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
    <p className="text-muted-foreground">Evaluate the effectiveness of advertising services.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Your Reviews</CardTitle>
        <CardDescription>Manage your reviews of advertising services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Digital Masters Agency</h3>
                <div className="flex mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <p className="text-sm mt-2">Great experience with their social media campaign. Saw significant growth in engagement and followers.</p>
          </div>
          
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Creative Vision Studios</h3>
                <div className="flex mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">1 week ago</span>
            </div>
            <p className="text-sm mt-2">Exceptional video production quality. The team was professional and delivered ahead of schedule.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const Messages = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Messages</h2>
    <p className="text-muted-foreground">Communicate with advertising agencies.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Inbox</CardTitle>
        <CardDescription>Recent communications with agencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Digital Masters Agency</h3>
                  <p className="text-xs text-muted-foreground">Campaign proposal discussion</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>
            <p className="text-sm mt-2 line-clamp-2">Hi there! We've put together a proposal for your social media campaign...</p>
            <Button variant="ghost" size="sm" className="mt-2">Read & Reply</Button>
          </div>
          
          <div>
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Creative Vision Studios</h3>
                  <p className="text-xs text-muted-foreground">Video production contract</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Yesterday</span>
            </div>
            <p className="text-sm mt-2 line-clamp-2">Please find attached the final contract for the video production services we discussed...</p>
            <Button variant="ghost" size="sm" className="mt-2">Read & Reply</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const AgencyProfile = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Agency Profile</h2>
    <p className="text-muted-foreground">Manage your agency information and portfolio.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Agency Information</CardTitle>
        <CardDescription>Update your agency details and specializations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-muted-foreground">Agency profile form would go here</p>
          <Button disabled className="mt-4">Update Profile</Button>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Portfolio</CardTitle>
        <CardDescription>Showcase your previous work</CardDescription>
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
        <Button className="mt-4">Add Portfolio Item</Button>
      </CardContent>
    </Card>
  </div>
);

const ManagingOffers = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Managing Offers</h2>
        <p className="text-muted-foreground">Create and edit your advertising services.</p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        New Offer
      </Button>
    </div>
    
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>Social Media Management</CardTitle>
            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Active</div>
          </div>
          <CardDescription>Complete social media service package</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground mt-1">Full-service social media management including content creation, scheduling, and analytics.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Price</h3>
                <p className="text-sm font-semibold mt-1">$1,200 / month</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Duration</h3>
                <p className="text-sm text-muted-foreground mt-1">Minimum 3 months</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>Video Production</CardTitle>
            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Active</div>
          </div>
          <CardDescription>Professional advertising videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground mt-1">High-quality video production services for promotional and advertising content.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Price</h3>
                <p className="text-sm font-semibold mt-1">$2,500 / project</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Duration</h3>
                <p className="text-sm text-muted-foreground mt-1">2-4 weeks per project</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Requests = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Requests</h2>
    <p className="text-muted-foreground">Manage incoming requests from businesses.</p>
    
    <Tabs defaultValue="new">
      <TabsList className="mb-4">
        <TabsTrigger value="new">New (2)</TabsTrigger>
        <TabsTrigger value="inProgress">In Progress (1)</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="new">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Social Media Campaign Request</CardTitle>
              <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">New</div>
            </div>
            <CardDescription>From: TechStart Inc.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Request Details</h3>
                <p className="text-sm text-muted-foreground mt-1">Looking for a comprehensive social media campaign to promote our new product launch in Q3.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Budget</h3>
                  <p className="text-sm font-semibold mt-1">$5,000 - $8,000</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Timeline</h3>
                  <p className="text-sm text-muted-foreground mt-1">2 months</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm">Accept Request</Button>
                <Button variant="outline" size="sm">Contact Client</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="inProgress">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Website Banner Ads</CardTitle>
              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">In Progress</div>
            </div>
            <CardDescription>From: Global Retail Co.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Status</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">45% Complete</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Next Steps</h3>
                <p className="text-sm text-muted-foreground mt-1">Design review with client scheduled for tomorrow at 2 PM.</p>
              </div>
              
              <Button variant="outline" size="sm">View Project Details</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="completed">
        <div className="text-center py-10">
          <p className="text-muted-foreground">No completed requests yet.</p>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

const AgencyTraining = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Training</h2>
    <p className="text-muted-foreground">Courses and materials on advertising services.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Advanced PPC Strategies</CardTitle>
          <CardDescription>Master pay-per-click advertising techniques</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">8 modules • 4 hours</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Advanced</span>
            </div>
            <Button variant="outline" className="w-full mt-2">Start Course</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Marketing Essentials</CardTitle>
          <CardDescription>Create compelling content strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">6 modules • 3 hours</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Intermediate</span>
            </div>
            <Button variant="outline" className="w-full mt-2">Start Course</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Reports = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Reports & Analytics</h2>
    <p className="text-muted-foreground">Campaign performance analytics.</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 mr-1">↑ 2</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 mr-1">↑ 1</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$28,500</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 mr-1">↑ 12%</span> from last month
          </p>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
        <CardDescription>Overview of active campaign metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60 flex items-center justify-center border rounded-md bg-muted/10">
          <p className="text-muted-foreground">Performance chart would go here</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Account;
