
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VacancyCard, { VacancyProps } from './VacancyCard';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { useCategory } from '@/contexts/CategoryContext';
import { useLocation } from '@/contexts/LocationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// API functions for server interaction
const fetchVacanciesFromServer = async (params: { category?: string, location?: string }): Promise<(VacancyProps)[]> => {
  console.log('Fetching vacancies from server, params:', params);
  await new Promise(resolve => setTimeout(resolve, 500));

  const allVacancies = [
    { 
      id: 1, 
      title: 'Front-end розробник', 
      company: 'Діфоменко О. М., ФОП', 
      location: 'Дніпро', 
      experience: '2 роки', 
      postedTime: '16 год. тому', 
      progress: 6, 
      isNew: true, 
      categories: ['digital', 'social'],
      companyDescription: 'Діфоменко О. М., ФОП - провідна компанія у сфері веб-розробки, що спеціалізується на створенні сучасних, функціональних та візуально привабливих веб-додатків.',
      rating: 4.7,
      contactPhone: '+380 67 123 4567',
      contactEmail: 'jobs@difomenko.com'
    },
    { 
      id: 2, 
      title: 'Front-end розробник', 
      company: 'Планета, мебельна майстерня', 
      location: 'Дніпро', 
      salary: '37 000 грн', 
      postedTime: '2 дні тому', 
      categories: ['digital', 'print'],
      companyDescription: 'Планета - відома меблева майстерня з багаторічним досвідом та власним виробництвом меблів. Наша команда складається з досвідчених дизайнерів та майстрів.',
      rating: 4.9,
      contactEmail: 'career@planeta.ua'
    },
    { 
      id: 3, 
      title: 'Front-end програміст', 
      company: 'Свідк маркетинг, ТОВ', 
      location: 'Київ', 
      experience: '1 рік', 
      postedTime: '4 дні тому', 
      categories: ['digital', 'events'],
      companyDescription: 'Свідк маркетинг - маркетингова агенція з повним спектром послуг, що спеціалізується на digital-маркетингу та організації заходів.',
      rating: 4.3,
      contactPhone: '+380 50 987 6543'
    },
    { 
      id: 4, 
      title: 'Junior Front-end Web Developer', 
      company: 'Atlas Digital Ventures', 
      location: 'Київ', 
      salary: '25 000 - 33 000 грн', 
      postedTime: '5 днів тому', 
      categories: ['tv', 'social'],
      companyDescription: 'Atlas Digital Ventures - інноваційна технологічна компанія, що спеціалізується на розробці цифрових продуктів та рішень.',
      rating: 4.5,
      contactEmail: 'hr@atlasventures.com'
    },
    { 
      id: 5, 
      title: 'Front-end розробник (React.js)', 
      company: 'SoftServe LLC', 
      location: 'Київ', 
      salary: '60 000 грн', 
      experience: '3 роки', 
      postedTime: '7 днів тому', 
      categories: ['social', 'influencer'],
      companyDescription: 'SoftServe - провідна ІТ-компанія з понад 20-річною історією, що спеціалізується на розробці програмного забезпечення та консалтингу.',
      rating: 4.8,
      contactPhone: '+380 44 123 4567',
      contactEmail: 'careers@softserve.com'
    },
    {
      id: 6,
      title: 'Senior Front-end Developer',
      company: 'Intellias',
      location: 'Львів',
      salary: '4000 - 5000 $',
      experience: '5+ років',
      postedTime: '8 днів тому',
      categories: ['digital'],
      companyDescription: 'Intellias - глобальна ІТ-компанія з сильною експертизою у сфері автомобільної індустрії, фінтеху та ритейлу.',
      rating: 4.6,
      contactEmail: 'careers@intellias.com'
    },
    {
      id: 7,
      title: 'Middle Front-end Developer',
      company: 'Sigma Software',
      location: 'Харків',
      salary: '2500 - 3500 $',
      experience: '3+ років',
      postedTime: '9 днів тому',
      categories: ['digital', 'print'],
      companyDescription: 'Sigma Software - міжнародна IT-компанія, що надає послуги з розробки програмного забезпечення та IT-консалтингу.',
      rating: 4.5,
      contactEmail: 'jobs@sigma.software'
    },
    {
      id: 8,
      title: 'UX/UI Designer',
      company: 'Genesis',
      location: 'Одеса',
      salary: '2000 - 3000 $',
      experience: '2+ років',
      postedTime: '3 дні тому',
      categories: ['digital'],
      companyDescription: 'Genesis - одна з найбільших продуктових IT-компаній в Україні, що створює інноваційні проекти та сервіси.',
      rating: 4.7,
      contactEmail: 'hr@gen.tech'
    }
  ];
  
  // Filter by category
  let filtered = [...allVacancies];
  if (params.category && params.category !== 'all') {
    filtered = filtered.filter(v => v.categories.includes(params.category));
  }
  
  // Filter by location
  if (params.location && params.location !== 'all') {
    if (params.location === 'near') {
      // Simulate "near me" filtering - in a real app, this would use actual geolocation
      filtered = filtered.filter(v => v.location === 'Дніпро'); // Example: default to Dnipro
    } else if (params.location === 'remote') {
      // For remote work - would have a "remote" field in real data
      filtered = filtered.filter(v => v.location.includes('Remote') || v.location.includes('Дистанційно'));
    } else if (params.location === 'abroad') {
      // For international jobs
      filtered = filtered.filter(v => 
        !['Київ', 'Дніпро', 'Харків', 'Львів', 'Одеса'].includes(v.location)
      );
    } else {
      // For specific city
      filtered = filtered.filter(v => v.location === params.location);
    }
  }
  
  return filtered;
};

const PopularVacancies = () => {
  const [api, setApi] = useState<CarouselApi>();
  const { selectedCategory } = useCategory();
  const { selectedLocation } = useLocation();
  const { t } = useLanguage();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Track screen width
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: vacancies = [], isLoading } = useQuery({
    queryKey: ['vacancies', selectedCategory, selectedLocation],
    queryFn: () => fetchVacanciesFromServer({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      location: selectedLocation === 'all' ? undefined : selectedLocation
    }),
  });

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    onSelect();

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const filteredVacancies = useMemo(() => {
    // Filter vacancies by category and location
    let filtered = [...vacancies];

    // Category filtering already handled in the query function
    
    return filtered;
  }, [vacancies]);

  const vacanciesCount = filteredVacancies.length;
  const shouldShowButtons = vacanciesCount >= 4;

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">{t('offers.popular')}</h2>
            <p className="text-muted-foreground">{t('offers.discover')}</p>
          </div>
          <Link to="/vacancies">
            <Button variant="outline" className="rounded-full mt-4 md:mt-0">
              {t('offers.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">{t('offers.loading')}</p>
          </div>
        ) : vacanciesCount === 0 ? (
          <div className="flex items-center justify-center p-8 border border-dashed rounded-xl border-muted-foreground/30">
            <p className="text-muted-foreground text-center">{t('offers.noOffers')}</p>
          </div>
        ) : (
          <div className="relative px-6 md:px-12">
            {shouldShowButtons && (
              <Button 
                variant="outline" 
                size="icon" 
                className={`absolute left-0 md:left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hidden md:flex z-10 bg-background ${!canScrollPrev && 'opacity-50 cursor-not-allowed'}`}
                onClick={scrollPrev}
                disabled={!canScrollPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}

            {(vacanciesCount > 1 || (isMobile && vacanciesCount > 1)) ? (
              <Carousel opts={{ align: "center", loop: false }} className="w-full" setApi={setApi}>
                <CarouselContent>
                  {filteredVacancies.map((vacancy) => (
                    <CarouselItem 
                      key={vacancy.id} 
                      className="pl-1 basis-[90%] sm:basis-[45%] lg:basis-[30%] xl:basis-[28%] h-full flex justify-center"
                    >
                      <div className="h-full w-full max-w-md">
                        <VacancyCard vacancy={vacancy} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="flex justify-center gap-4">
                {filteredVacancies.map((vacancy) => (
                  <div 
                    key={vacancy.id} 
                    className="flex-1 min-w-[250px] max-w-md"
                  >
                    <VacancyCard vacancy={vacancy} />
                  </div>
                ))}
              </div>
            )}

            {shouldShowButtons && (
              <Button 
                variant="outline" 
                size="icon" 
                className={`absolute right-0 md:right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hidden md:flex z-10 bg-background ${!canScrollNext && 'opacity-50 cursor-not-allowed'}`}
                onClick={scrollNext}
                disabled={!canScrollNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularVacancies;
