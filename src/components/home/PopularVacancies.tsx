
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VacancyCard, { VacancyProps } from './VacancyCard';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { useCategory } from '@/contexts/CategoryContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// API functions for server interaction
const fetchVacanciesFromServer = async (category?: string): Promise<(VacancyProps & { categories: string[] })[]> => {
  // In a real app, this would be an API call to your backend
  // Example: return await fetch(`/api/vacancies?category=${category || 'all'}`).then(res => res.json());
  
  // For demonstration, we're using mock data
  console.log('Fetching vacancies from server, category:', category);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, title: 'Front-end розробник', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '2 роки', postedTime: '16 год. тому', progress: 6, isNew: true, categories: ['digital', 'social'] },
    { id: 2, title: 'Front-end розробник', company: 'Планета, мебельна майстерня', location: 'Дніпро', salary: '37 000 грн', postedTime: '2 дні тому', categories: ['digital', 'print'] },
    { id: 3, title: 'Front-end програміст', company: 'Свідк маркетинг, ТОВ', location: 'Київ', experience: '1 рік', postedTime: '4 дні тому', categories: ['digital', 'events'] },
    { id: 4, title: 'Junior Front-end Web Developer', company: 'Atlas Digital Ventures', location: 'Київ', salary: '25 000 - 33 000 грн', postedTime: '5 днів тому', categories: ['tv', 'social'] },
    { id: 5, title: 'Front-end розробник (React.js)', company: 'SoftServe LLC', location: 'Київ', salary: '60 000 грн', experience: '3 роки', postedTime: '7 днів тому', categories: ['social', 'influencer'] }
  ];
};

// Function to save a vacancy (e.g., when marking as favorite)
const saveVacancy = async (vacancyId: number, isFavorite: boolean): Promise<boolean> => {
  // In a real app, this would be an API call to your backend
  // Example: return await fetch(`/api/vacancies/${vacancyId}/favorite`, { 
  //   method: 'POST', 
  //   body: JSON.stringify({ isFavorite }) 
  // }).then(res => res.json());
  
  console.log(`Saving vacancy ${vacancyId} as favorite: ${isFavorite}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return true; // Success
};

const PopularVacancies = () => {
  const [api, setApi] = useState<CarouselApi>();
  const { selectedCategory } = useCategory();
  const { t } = useLanguage();

  // Use React Query to fetch vacancies
  const { data: vacancies = [], isLoading } = useQuery({
    queryKey: ['vacancies', selectedCategory],
    queryFn: () => fetchVacanciesFromServer(selectedCategory === 'all' ? undefined : selectedCategory),
  });

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const filteredVacancies = useMemo(() => {
    if (selectedCategory === 'all') return vacancies;
    return vacancies.filter(vacancy => vacancy.categories.includes(selectedCategory));
  }, [selectedCategory, vacancies]);

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
          <div className="relative">
            {shouldShowButtons && (
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hidden md:flex z-10"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}

			{vacanciesCount >= 4 ? (
				<Carousel opts={{ align: "center", loop: false }} className="w-full" setApi={setApi}>
					<CarouselContent>
						{filteredVacancies.map((vacancy) => (
							<CarouselItem 
								key={vacancy.id} 
								className="pl-1 md:basis-1/2 lg:basis-1/3 h-full flex justify-center"
							>
								<div className="h-full w-full max-w-md">
									<VacancyCard vacancy={vacancy} onFavoriteToggle={(isFavorite) => saveVacancy(vacancy.id, isFavorite)} />
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
							<VacancyCard vacancy={vacancy} onFavoriteToggle={(isFavorite) => saveVacancy(vacancy.id, isFavorite)} />
						</div>
					))}
				</div>
			)}

            {shouldShowButtons && (
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
