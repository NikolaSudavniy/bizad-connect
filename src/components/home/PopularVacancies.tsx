
import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VacancyCard, { VacancyProps } from './VacancyCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';

// Sample vacancies data mimicking the image
const vacancies: VacancyProps[] = [
  {
    id: 1,
    title: 'Front-end розробник',
    company: 'Діфоменко О. М., ФОП',
    location: 'Дніпро',
    experience: '2 роки',
    postedTime: '16 год. тому',
    progress: 6,
    isNew: true
  },
  {
    id: 2,
    title: 'Front-end розробник',
    company: 'Планета, мебельна майстерня',
    location: 'Дніпро',
    salary: '37 000 грн',
    postedTime: '2 дні тому',
  },
  {
    id: 3,
    title: 'Front-end програміст',
    company: 'Свідк маркетинг, ТОВ',
    location: 'Київ',
    experience: '1 рік',
    postedTime: '4 дні тому',
  },
  {
    id: 4,
    title: 'Junior Front-end Web Developer',
    company: 'Atlas Digital Ventures',
    location: 'Київ',
    salary: '25 000 - 33 000 грн',
    postedTime: '5 днів тому',
  },
  {
    id: 5,
    title: 'Front-end розробник (React.js)',
    company: 'SoftServe LLC',
    location: 'Київ',
    salary: '60 000 грн',
    experience: '3 роки',
    postedTime: '7 днів тому',
  },
];

const PopularVacancies = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

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
              {vacancies.map((vacancy) => (
                <CarouselItem key={vacancy.id} className="pl-1 md:basis-1/2 lg:basis-1/3 h-full">
                  <div className="h-full">
                    <VacancyCard vacancy={vacancy} />
                  </div>
                </CarouselItem>
              ))}
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
