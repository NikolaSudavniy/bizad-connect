import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VacancyCard from '@/components/home/VacancyCard';
import { Briefcase, Search, MapPin, X } from 'lucide-react';
import { CategoryProvider, useCategory } from '@/contexts/CategoryContext';
import { useLocation, LocationType } from '@/contexts/LocationContext';
import CategorySelector from '@/components/home/CategorySelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from '@/lib/utils';

const fetchAllVacancies = async (params: {
  category?: string;
  location?: string;
  search?: string;
  page: number;
  limit: number;
}) => {
  console.log('Fetching all vacancies with params:', params);
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allVacancies = [
    { id: 1, title: 'Front-end розробник', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '2 роки', postedTime: '16 год. тому', progress: 6, isNew: true, categories: ['digital', 'social'] },
    { id: 2, title: 'Front-end розробник', company: 'Планета, мебельна майстерня', location: 'Дніпро', salary: '37 000 грн', postedTime: '2 дні тому', categories: ['digital', 'print'] },
    { id: 3, title: 'Front-end програміст', company: 'Свідк маркетинг, ТОВ', location: 'Київ', experience: '1 рік', postedTime: '4 дні тому', categories: ['digital', 'events'] },
    { id: 4, title: 'Junior Front-end Web Developer', company: 'Atlas Digital Ventures', location: 'Київ', salary: '25 000 - 33 000 грн', postedTime: '5 днів тому', categories: ['tv', 'social'] },
    { id: 5, title: 'Front-end розробник (React.js)', company: 'SoftServe LLC', location: 'Київ', salary: '60 000 грн', experience: '3 роки', postedTime: '7 днів тому', categories: ['social', 'influencer'] },
    { id: 6, title: 'Senior Front-end Developer', company: 'Intellias', location: 'Львів', salary: '4000 - 5000 $', experience: '5+ років', postedTime: '8 днів тому', categories: ['digital'] },
    { id: 7, title: 'Middle Front-end Developer', company: 'Sigma Software', location: 'Харків', salary: '2500 - 3500 $', experience: '3+ років', postedTime: '9 днів тому', categories: ['digital', 'print'] },
    { id: 8, title: 'Back-end Developer (Node.js)', company: 'GlobalLogic', location: 'Київ', salary: '3000 - 4500 $', experience: '2+ років', postedTime: '10 днів тому', categories: ['digital'] },
    { id: 9, title: 'Full-stack Developer', company: 'EPAM Systems', location: 'Київ', salary: '3500 - 5000 $', experience: '4+ років', postedTime: '11 днів тому', categories: ['digital', 'events'] },
    { id: 10, title: 'UX/UI Designer', company: 'Genesis', location: 'Одеса', salary: '1800 - 2800 $', experience: '2+ років', postedTime: '12 днів тому', categories: ['digital'] }
  ];
  
  let filtered = allVacancies;
  if (params.category && params.category !== 'all') {
    filtered = filtered.filter(v => v.categories.includes(params.category));
  }
  
  if (params.location && params.location !== 'all') {
    if (params.location === 'near') {
      filtered = filtered.filter(v => v.location === 'Дніпро');
    } else if (params.location === 'remote') {
      filtered = filtered.filter(v => v.location.includes('Remote') || v.location.includes('Дистанційно'));
    } else if (params.location === 'abroad') {
      filtered = filtered.filter(v => 
        !['Київ', 'Дніпро', 'Харків', 'Львів', 'Одеса'].includes(v.location)
      );
    } else {
      filtered = filtered.filter(v => v.location === params.location);
    }
  }
  
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(v => 
      v.title.toLowerCase().includes(searchLower) || 
      v.company.toLowerCase().includes(searchLower) ||
      v.location.toLowerCase().includes(searchLower)
    );
  }
  
  const total = filtered.length;
  const startIndex = (params.page - 1) * params.limit;
  const endIndex = startIndex + params.limit;
  const items = filtered.slice(startIndex, endIndex);
  
  return {
    items,
    pagination: {
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit)
    }
  };
};

const saveVacancy = async (vacancyId: number, isFavorite: boolean): Promise<boolean> => {
  console.log(`Saving vacancy ${vacancyId} as favorite: ${isFavorite}`);
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return true;
};

const VacanciesContent = () => {
  const { t } = useLanguage();
  const { selectedCategory } = useCategory();
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;
  const [open, setOpen] = useState(false);
  const [locationSearchValue, setLocationSearchValue] = useState('');
  
  const defaultLocations = [
    { value: 'all', label: t('location.allUkraine')},
    { value: 'Київ', label: t('location.Kyiv') },
    { value: 'Дніпро', label: t('location.Dnipro')},
    { value: 'Харків', label: t('location.Kharkov')},
    { value: 'Одеса', label: t('location.Odesa')},
    { value: 'Львів', label: t('location.Lviv')},
    { value: 'remote', label: t('location.remote')},
    { value: 'abroad', label: t('location.abroad')}
  ];
  
  const hiddenCities = [
    { value: 'Вінниця', label: t('location.Vinnytsia') },
    { value: 'Херсон', label: t('location.Kherson') },
  ];
  
  const allUkrainianCities = [
    ...defaultLocations.filter(loc => 
      ['Київ', 'Дніпро', 'Харків', 'Одеса', 'Львів'].includes(loc.value)
    ),
    ...hiddenCities
  ];
  
  const getFilteredLocations = () => {
    if (locationSearchValue.trim() === '') {
      return defaultLocations;
    }
    
    const searchLower = locationSearchValue.toLowerCase();
    return allUkrainianCities.filter(loc => 
      loc.label.toLowerCase().includes(searchLower) ||
      loc.value.toLowerCase().includes(searchLower)
    );
  };

  const filteredLocations = getFilteredLocations();
  const selectedLocationObj = [...defaultLocations, ...hiddenCities].find(loc => loc.value === selectedLocation);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const clearLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLocation('all');
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allVacancies', selectedCategory, selectedLocation, searchTerm, page, limit],
    queryFn: () => fetchAllVacancies({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      location: selectedLocation === 'all' ? undefined : selectedLocation,
      search: searchTerm,
      page,
      limit
    }),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="mt-[4rem] py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">{t('vacancies.allVacancies')}</h1>
          <p className="text-muted-foreground">{t('vacancies.browseDescription')}</p>
        </div>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow rounded-md bg-background border border-border flex items-center">
              <Search className="h-4 w-4 ml-3 text-muted-foreground" />
              <input 
                placeholder={t('vacancies.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow py-2 px-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
              
              <div className="border-l border-border h-full flex items-center">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      role="combobox"
                      aria-expanded={open}
                      className="py-1 px-3 h-full rounded-none"
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm font-medium">
                          {selectedLocationObj ? selectedLocationObj.label : t('location.allUkraine')}
                        </span>
                        {selectedLocation !== 'all' && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-1 hover:bg-secondary/80" 
                            onClick={clearLocation}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput 
                        placeholder={t('location.searchPlaceholder') || "Пошук міста..."} 
                        value={locationSearchValue}
                        onValueChange={setLocationSearchValue}
                      />
                      <CommandList>
                        <CommandEmpty>{t('location.noResults') || "Нічого не знайдено"}</CommandEmpty>
                        <CommandGroup>
                          {filteredLocations.map((location) => (
                            <CommandItem
                              key={location.value}
                              value={location.value}
                              onSelect={(value) => {
                                setSelectedLocation(value as LocationType);
                                setLocationSearchValue('');
                                setOpen(false);
                              }}
                            >
                              {location.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button type="submit" className="rounded-md">
              {t('search.button')}
            </Button>
          </form>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">{t('categories.filterBy')}</h2>
          <CategorySelector />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-60 w-full" />
            ))}
          </div>
        ) : data?.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-medium mb-2">{t('vacancies.noVacanciesFound')}</h3>
            <p className="text-muted-foreground max-w-md">
              {t('vacancies.tryDifferentSearch')}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.items.map((vacancy) => (
                <VacancyCard 
                  key={vacancy.id} 
                  vacancy={vacancy} 
                  onFavoriteToggle={(isFavorite) => saveVacancy(vacancy.id, isFavorite)} 
                />
              ))}
            </div>
            
            {data?.pagination.totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    {t('pagination.previous')}
                  </Button>
                  
                  {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === data.pagination.totalPages}
                  >
                    {t('pagination.next')}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Vacancies = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">
      <CategoryProvider>
        <VacanciesContent />
      </CategoryProvider>
    </main>
    <Footer />
  </div>
);

export default Vacancies;
