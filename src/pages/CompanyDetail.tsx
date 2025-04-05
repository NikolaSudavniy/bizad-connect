
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building, Star, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { VacancyProps } from '@/components/home/VacancyCard';
import VacancyCard from '@/components/home/VacancyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CompanyData {
  id: string;
  name: string;
  description?: string;
  rating?: number;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  address?: string;
  type: 'business' | 'advertiser';
  portfolio?: {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
  }[];
  vacancies?: VacancyProps[];
}

// Function to fetch company data
const fetchCompanyData = async (id: string): Promise<CompanyData> => {
  console.log('Fetching company data for id:', id);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data for demonstration
  const isBusiness = id === "business1" || id === "business2";
  
  if (isBusiness) {
    return {
      id,
      name: id === "business1" ? "Діфоменко О. М., ФОП" : "SoftServe LLC",
      description: id === "business1" 
        ? "Діфоменко О. М., ФОП - провідна компанія у сфері веб-розробки, що спеціалізується на створенні сучасних, функціональних та візуально привабливих веб-додатків."
        : "SoftServe is a leading digital authority that advises and provides at the cutting-edge of technology. We reveal, transform, accelerate, and optimize the way enterprises and software companies do business.",
      rating: id === "business1" ? 4.7 : 4.2,
      contactPhone: "+380 67 123 4567",
      contactEmail: id === "business1" ? "jobs@difomenko.com" : "careers@softserveinc.com",
      website: id === "business1" ? "https://difomenko.com" : "https://softserveinc.com",
      address: id === "business1" ? "Дніпро, вул. Центральна 42" : "Львів, вул. Садова 102",
      type: "business",
      vacancies: Array(id === "business1" ? 3 : 5).fill(0).map((_, index) => ({
        id: 100 + index,
        title: id === "business1" 
          ? [`Front-end розробник`, `Back-end розробник`, `UI/UX дизайнер`][index % 3] 
          : [`Java Developer`, `DevOps Engineer`, `QA Automation`, `Project Manager`, `Business Analyst`][index % 5],
        company: id === "business1" ? "Діфоменко О. М., ФОП" : "SoftServe LLC",
        location: id === "business1" ? "Дніпро" : "Львів",
        experience: `${(index % 3) + 1}-${(index % 3) + 3} років`,
        postedTime: `${(index % 14) + 1} ${(index % 2) === 0 ? 'год.' : 'дн.'} тому`,
        isNew: index % 3 === 0,
        progress: (index % 7) + 1,
      }))
    };
  } else {
    // Advertiser
    return {
      id,
      name: id === "advertiser1" ? "Планета, мебельна майстерня" : "Digital Creators Agency",
      description: id === "advertiser1" 
        ? "Планета - місце, де народжуються унікальні меблі. Наші майстри перетворюють деревину на витвори мистецтва, що стануть гордістю вашого дому."
        : "Digital Creators Agency specializes in transforming brands through innovative digital experiences, creative content, and strategic marketing campaigns.",
      rating: id === "advertiser1" ? 4.9 : 4.5,
      contactPhone: id === "advertiser1" ? "+380 50 987 6543" : "+380 67 555 7777",
      contactEmail: id === "advertiser1" ? "info@planeta-mebliv.ua" : "hello@digitalcreators.agency",
      website: id === "advertiser1" ? "https://planeta-mebliv.ua" : "https://digitalcreators.agency",
      address: id === "advertiser1" ? "Київ, вул. Деревообробна 5" : "Харків, вул. Творча 15",
      type: "advertiser",
      portfolio: Array(6).fill(0).map((_, index) => ({
        id: index + 1,
        title: id === "advertiser1" 
          ? [`Кухонний гарнітур "Модерн"`, `Шафа-купе "Класик"`, `Диван "Комфорт"`, `Стіл "Мінімалізм"`, `Ліжко "Релакс"`, `Крісло "Затишок"`][index % 6] 
          : [`Brand Redesign for TechCorp`, `Social Media Campaign for FreshFoods`, `Website Development for FinServe`, `Mobile App UI for TravelBuddy`, `Video Production for SportPlus`, `Marketing Strategy for EduLearn`][index % 6],
        description: id === "advertiser1" 
          ? "Ексклюзивні меблі ручної роботи, виготовлені з натуральних матеріалів. Ергономічний дизайн, висока якість виконання та увага до деталей." 
          : "A comprehensive digital solution that transformed client expectations and delivered outstanding results across multiple platforms.",
        imageUrl: `https://picsum.photos/seed/${id}-${index}/800/600`,
      })),
      vacancies: Array(id === "advertiser1" ? 2 : 3).fill(0).map((_, index) => ({
        id: 200 + index,
        title: id === "advertiser1" 
          ? [`Майстер меблів`, `Дизайнер інтер'єрів`][index % 2] 
          : [`Marketing Specialist`, `Graphic Designer`, `Content Writer`][index % 3],
        company: id === "advertiser1" ? "Планета, мебельна майстерня" : "Digital Creators Agency",
        location: id === "advertiser1" ? "Київ" : "Харків",
        experience: `${index + 1} ${index === 0 ? 'рік' : 'роки'}`,
        postedTime: `${(index % 10) + 1} ${(index % 2) === 0 ? 'год.' : 'дн.'} тому`,
        isNew: index === 0,
        progress: (index % 7) + 1,
      }))
    };
  }
};

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const { data: company, isLoading } = useQuery({
    queryKey: ['companyDetail', id],
    queryFn: () => fetchCompanyData(id!),
    enabled: !!id,
  });
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-10 w-40 mb-8" />
            <Skeleton className="h-36 w-full mb-8" />
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">{t('company.notFound')}</h1>
            <p className="text-muted-foreground mb-6">{t('company.notFoundDescription')}</p>
            <Button onClick={handleGoBack}>{t('common.goBack')}</Button>
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
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 pl-0 hover:bg-transparent"
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.goBack') || 'Go back'}
          </Button>
          
          <div className="mb-10">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-primary/10 flex items-center justify-center text-primary">
                <Building className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                {company.rating && (
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(company.rating || 0) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{company.rating.toFixed(1)}</span>
                  </div>
                )}
                <p className="text-muted-foreground">{company.description}</p>
              </div>
            </div>
          </div>
          
          <Card className="p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {company.contactPhone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t('company.contactPhone') || 'Phone'}</h3>
                    <p>{company.contactPhone}</p>
                  </div>
                </div>
              )}
              
              {company.contactEmail && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t('company.contactEmail') || 'Email'}</h3>
                    <p>{company.contactEmail}</p>
                  </div>
                </div>
              )}
              
              {company.website && (
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium">{t('company.website') || 'Website'}</h3>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {company.website.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  </div>
                </div>
              )}
              
              {company.address && (
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium">{t('company.address') || 'Address'}</h3>
                    <p>{company.address}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Tabs defaultValue={company.type === 'business' ? 'vacancies' : 'portfolio'} className="w-full">
            <TabsList className="mb-6">
              {company.vacancies && company.vacancies.length > 0 && (
                <TabsTrigger value="vacancies">
                  {t('company.vacancies') || 'Job Listings'} ({company.vacancies.length})
                </TabsTrigger>
              )}
              {company.portfolio && company.portfolio.length > 0 && (
                <TabsTrigger value="portfolio">
                  {t('company.portfolio') || 'Portfolio'} ({company.portfolio.length})
                </TabsTrigger>
              )}
            </TabsList>
            
            {company.vacancies && company.vacancies.length > 0 && (
              <TabsContent value="vacancies" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">{t('company.vacancies') || 'Job Listings'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {company.vacancies.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                  ))}
                </div>
              </TabsContent>
            )}
            
            {company.portfolio && company.portfolio.length > 0 && (
              <TabsContent value="portfolio" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">{t('company.portfolio') || 'Portfolio'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {company.portfolio.map((item) => (
                    <Card key={item.id} className="overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-sm">
                      {item.imageUrl && (
                        <div className="aspect-video w-full overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyDetail;
