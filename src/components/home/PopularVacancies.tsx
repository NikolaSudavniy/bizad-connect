import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VacancyCard, { VacancyProps } from './VacancyCard';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { useCategory } from '@/contexts/CategoryContext';

// TODO: Fetch vacancies from database
const fetchVacancies = async (): Promise<(VacancyProps & { categories: string[] })[]> => {
  return [
    { id: 1, title: 'Front-end розробник', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '2 роки', postedTime: '16 год. тому', progress: 6, isNew: true, categories: ['digital', 'social'] },
    { id: 2, title: 'Front-end розробник', company: 'Планета, мебельна майстерня', location: 'Дніпро', salary: '37 000 грн', postedTime: '2 дні тому', categories: ['digital', 'print'] },
    { id: 3, title: 'Front-end програміст', company: 'Свідк маркетинг, ТОВ', location: 'Київ', experience: '1 рік', postedTime: '4 дні тому', categories: ['digital', 'events'] },
    { id: 4, title: 'Junior Front-end Web Developer', company: 'Atlas Digital Ventures', location: 'Київ', salary: '25 000 - 33 000 грн', postedTime: '5 днів тому', categories: ['tv', 'social'] },
    { id: 5, title: 'Front-end розробник (React.js)', company: 'SoftServe LLC', location: 'Київ', salary: '60 000 грн', experience: '3 роки', postedTime: '7 днів тому', categories: ['social', 'influencer'] },
    { id: 6, title: 'UI/UX Designer', company: 'Design Hub', location: 'Львів', experience: '2 роки', postedTime: '3 дні тому', categories: ['design', 'digital'] },
    { id: 7, title: 'Back-end Developer', company: 'CodeCraft', location: 'Харків', salary: '50 000 грн', postedTime: '6 днів тому', categories: ['digital', 'backend'] },
    { id: 8, title: 'Marketing Manager', company: 'AdStars', location: 'Київ', salary: '45 000 грн', postedTime: '2 дні тому', categories: ['marketing', 'social'] }
  ];
};

const PopularVacancies = () => {
  const [api, setApi] = useState<CarouselApi>();
  const { selectedCategory } = useCategory();
  const [vacancies, setVacancies] = useState<(VacancyProps & { categories: string[] })[]>([]);

  useEffect(() => {
    fetchVacancies().then(setVacancies);
  }, []);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const filteredVacancies = useMemo(() => {
    if (selectedCategory === 'all') return vacancies;
    return vacancies.filter(vacancy => vacancy.categories.includes(selectedCategory));
  }, [selectedCategory, vacancies]);

  const vacanciesCount = filteredVacancies.length;
  const isSingleOrFew = vacanciesCount > 0 && vacanciesCount < 4;
  const isMany = vacanciesCount > 5;

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Popular Vacancies</h2>
            <p className="text-muted-foreground">Discover the most in-demand job opportunities</p>
          </div>
          <Button variant="outline" className="rounded-full mt-4 md:mt-0">
            View All Vacancies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {vacanciesCount === 0 ? (
          <div className="flex items-center justify-center p-8 border border-dashed rounded-xl border-muted-foreground/30">
            <p className="text-muted-foreground text-center">No vacancies found for this category.</p>
          </div>
        ) : (
          <div className="relative">
            {!isSingleOrFew && !isMany && (
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hidden md:flex z-10"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}

            <Carousel
              opts={{ align: "center", loop: !isSingleOrFew && !isMany }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent className={`flex ${isSingleOrFew ? 'justify-center' : ''}`}>
                {filteredVacancies.map((vacancy) => (
                  <CarouselItem 
                    key={vacancy.id} 
                    className={`pl-1 ${isSingleOrFew ? 'basis-full max-w-md' : 'md:basis-1/2 lg:basis-1/3'} h-full flex justify-center`}
                  >
                    <div className="h-full w-full max-w-md">
                      <VacancyCard vacancy={vacancy} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {!isSingleOrFew && !isMany && (
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hidden md:flex z-10"
                onClick={scrollNext}
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
