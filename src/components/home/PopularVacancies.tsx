
import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VacancyCard, { VacancyProps } from './VacancyCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi
} from '@/components/ui/carousel';
import { useCategory } from '@/contexts/CategoryContext';

// Sample vacancies data with categories
const vacancies: (VacancyProps & { categories: string[] })[] = [
  {
    id: 1,
    title: 'Front-end розробник',
    company: 'Діфоменко О. М., ФОП',
    location: 'Дніпро',
    experience: '2 роки',
    postedTime: '16 год. тому',
    progress: 6,
    isNew: true,
    categories: ['digital', 'social']
  },
  {
    id: 2,
    title: 'Front-end розробник',
    company: 'Планета, мебельна майстерня',
    location: 'Дніпро',
    salary: '37 000 грн',
    postedTime: '2 дні тому',
    categories: ['digital', 'print']
  },
  {
    id: 3,
    title: 'Front-end програміст',
    company: 'Свідк маркетинг, ТОВ',
    location: 'Київ',
    experience: '1 рік',
    postedTime: '4 дні тому',
    categories: ['digital', 'events']
  },
  {
    id: 4,
    title: 'Junior Front-end Web Developer',
    company: 'Atlas Digital Ventures',
    location: 'Київ',
    salary: '25 000 - 33 000 грн',
    postedTime: '5 днів тому',
    categories: ['tv', 'social']
  },
  {
    id: 5,
    title: 'Front-end розробник (React.js)',
    company: 'SoftServe LLC',
    location: 'Київ',
    salary: '60 000 грн',
    experience: '3 роки',
    postedTime: '7 днів тому',
    categories: ['social', 'influencer']
  },
];

const PopularVacancies = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const { selectedCategory } = useCategory();

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  // Filter vacancies based on selected category
  const filteredVacancies = React.useMemo(() => {
    if (selectedCategory === 'all') {
      return vacancies;
    }
    return vacancies.filter(vacancy => 
      vacancy.categories.includes(selectedCategory)
    );
  }, [selectedCategory]);

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
        
        <div className="relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hidden md:flex z-10"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous slide</span>
          </Button>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {filteredVacancies.length > 0 ? (
                filteredVacancies.map((vacancy) => (
                  <CarouselItem key={vacancy.id} className="pl-1 md:basis-1/2 lg:basis-1/3 h-full">
                    <div className="h-full">
                      <VacancyCard vacancy={vacancy} />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="pl-1 basis-full h-full">
                  <div className="h-full flex items-center justify-center p-8 border border-dashed rounded-xl border-muted-foreground/30">
                    <p className="text-muted-foreground text-center">
                      No vacancies found for this category.
                    </p>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hidden md:flex z-10"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularVacancies;
