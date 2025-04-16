import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Clock, Briefcase, Heart, Star, MessageCircle, Reply, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { VacancyProps } from '@/components/home/VacancyCard';
import { toast } from 'sonner';

const fetchVacancyDetails = async (id: string): Promise<VacancyProps & { 
  description?: string;
  requirements?: string[];
  categories?: string[];
  contactPhone?: string;
  contactEmail?: string;
  companyDescription?: string;
  rating?: number;
}> => {
  console.log('Fetching vacancy details for id:', id);
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const vacancyDetails = {
    id: parseInt(id),
    title: 'Front-end розробник',
    company: 'Діфоменко О. М., ФОП',
    location: 'Дніпро',
    experience: '2 роки',
    postedTime: '16 год. тому',
    progress: 6,
    isNew: true,
    description: 'Ми шукаємо талановитого Front-end розробника для приєднання до нашої команди. Ви будете відповідати за розробку та впровадження інтерфейсів для наших клієнтів, використовуючи сучасні технології та фреймворки.',
    requirements: [
      'Глибокі знання JavaScript, HTML5, CSS3',
      'Досвід роботи з React, Redux',
      'Розуміння принципів адаптивного дизайну',
      'Вміння працювати з REST API',
      'Добре знання англійської мови'
    ],
    categories: ['digital', 'social'],
    contactPhone: '+380 67 123 4567',
    contactEmail: 'jobs@difomenko.com',
    companyDescription: 'Діфоменко О. М., ФОП - провідна компанія у сфері веб-розробки, що спеціалізується на створенні сучасних, функціональних та візуально привабливих веб-додатків.',
    rating: 4.7
  };
  
  if (parseInt(id) !== 1) {
    vacancyDetails.title = `${vacancyDetails.title}`;
    vacancyDetails.company = parseInt(id) % 2 === 0 ? 'SoftServe LLC' : 'Планета, мебельна майстерня';
    vacancyDetails.location = parseInt(id) % 2 === 0 ? 'Київ' : 'Львів';
    vacancyDetails.rating = parseInt(id) % 2 === 0 ? 4.2 : 4.9;
  }
  
  return vacancyDetails;
};

const checkIsFavorite = (vacancyId: number): boolean => {
  const favorites = JSON.parse(localStorage.getItem('favoriteVacancies') || '[]');
  return favorites.includes(vacancyId);
};

const toggleFavorite = (vacancyId: number): boolean => {
  const favorites = JSON.parse(localStorage.getItem('favoriteVacancies') || '[]');
  
  let newFavorites;
  if (favorites.includes(vacancyId)) {
    newFavorites = favorites.filter(id => id !== vacancyId);
  } else {
    newFavorites = [...favorites, vacancyId];
  }
  
  localStorage.setItem('favoriteVacancies', JSON.stringify(newFavorites));
  return !favorites.includes(vacancyId);
};

const VacancyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { data: vacancy, isLoading } = useQuery({
    queryKey: ['vacancyDetail', id],
    queryFn: () => fetchVacancyDetails(id!),
    enabled: !!id,
  });
  
  useEffect(() => {
    if (vacancy) {
      setIsFavorite(checkIsFavorite(vacancy.id));
    }
  }, [vacancy]);
  
  const handleFavoriteToggle = () => {
    if (vacancy) {
      const newFavoriteStatus = toggleFavorite(vacancy.id);
      setIsFavorite(newFavoriteStatus);
      toast(
        newFavoriteStatus 
          ? t('favorites.addedToFavorites') 
          : t('favorites.removedFromFavorites')
      );
    }
  };
  
  const handleContact = (type: 'chat' | 'respond') => {
    if (type === 'chat') {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        toast(t('contact.loginRequired'));
        return;
      }
      
      const chatId = `chat${id}`;
      navigate(`/account?tab=messages&chatId=${chatId}`);
    } else {
      toast(t('contact.responseInitiated'));
    }
  };

  const handleCompanyClick = () => {
    if (!vacancy) return;
    
    let companyId;
    if (vacancy.company === "Діфоменко О. М., ФОП") {
      companyId = "business1";
    } else if (vacancy.company === "SoftServe LLC") {
      companyId = "business2";
    } else if (vacancy.company === "Планета, мебельна майстерня") {
      companyId = "advertiser1";
    } else if (vacancy.company === "Digital Creators Agency") {
      companyId = "advertiser2";
    } else {
      companyId = "business1";
    }
    
    navigate(`/company/${companyId}`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <main className="flex-grow pt-32 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-40 w-full mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-60 col-span-2" />
              <Skeleton className="h-60" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!vacancy) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">{t('vacancy.notFound')}</h1>
            <p className="text-muted-foreground mb-6">{t('vacancy.notFoundDescription')}</p>
            <Button onClick={() => navigate('/vacancies')}>{t('vacancy.backToVacancies')}</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 pt-[6rem] px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
              <h1 className="text-3xl font-bold">{vacancy.title}</h1>
              <Button 
                variant="outline" 
                size="icon" 
                className={`h-10 w-10 rounded-full ${isFavorite ? 'text-primary hover:text-primary/80' : 'hover:text-primary'}`}
                onClick={handleFavoriteToggle}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="sr-only">{isFavorite ? t('favorites.removeFromFavorites') : t('favorites.addToFavorites')}</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {vacancy.location}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {vacancy.postedTime}
              </div>
              {vacancy.experience && (
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {vacancy.experience}
                </div>
              )}
              {vacancy.salary && (
                <div className="font-medium text-foreground">
                  {vacancy.salary}
                </div>
              )}
            </div>
            
            {vacancy.isNew && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                New
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">{t('vacancy.description')}</h2>
                    <p className="text-foreground/90">{vacancy.description}</p>
                  </div>
                  
                  {vacancy.requirements && vacancy.requirements.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">{t('vacancy.requirements')}</h2>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/90">
                        {vacancy.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {vacancy.categories && vacancy.categories.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">{t('vacancy.categories')}</h2>
                      <div className="flex flex-wrap gap-2">
                        {vacancy.categories.map((category, index) => (
                          <Badge key={index} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6 space-y-5">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">{t('vacancy.aboutCompany') || "About Company"}</h2>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div>
                        <button 
                          className="font-medium hover:text-primary transition-colors focus:outline-none"
                          onClick={handleCompanyClick}
                        >
                          {vacancy.company}
                        </button>
                        {vacancy.rating && (
                          <div className="flex items-center text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(vacancy.rating!) ? 'fill-current' : ''}`} 
                              />
                            ))}
                            <span className="ml-1 text-sm text-foreground">{vacancy.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {vacancy.companyDescription && (
                      <p className="text-sm text-muted-foreground mb-4">{vacancy.companyDescription}</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">{t('vacancy.contactInfo')}</h3>
                    {vacancy.contactEmail && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Email:</span> {vacancy.contactEmail}
                      </p>
                    )}
                    {vacancy.contactPhone && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Phone:</span> {vacancy.contactPhone}
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-3 space-y-3 border-t">
                    <Button className="w-full" onClick={() => handleContact('chat')}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t('vacancy.startChat')}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleContact('respond')}>
                      <Reply className="mr-2 h-4 w-4" />
                      {t('vacancy.respond')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VacancyDetail;
