
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VacancyCard from '@/components/home/VacancyCard';
import { Briefcase, Filter, Search } from 'lucide-react';
import { CategoryProvider, useCategory } from '@/contexts/CategoryContext';
import CategorySelector from '@/components/home/CategorySelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';

// API function to fetch all vacancies with pagination and filters
const fetchAllVacancies = async (params: {
  category?: string;
  search?: string;
  page: number;
  limit: number;
}) => {
  // In a real app, this would be an API call to your backend
  // Example: return await fetch(`/api/vacancies?category=${params.category || 'all'}&search=${params.search || ''}&page=${params.page}&limit=${params.limit}`).then(res => res.json());
  
  console.log('Fetching all vacancies with params:', params);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data for demonstration
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
    { id: 10, title: 'UX/UI Designer', company: 'Luxoft', location: 'Дніпро', salary: '1800 - 2800 $', experience: '2+ років', postedTime: '12 днів тому', categories: ['digital'] }
  ];
  
  // Filter by category
  let filtered = allVacancies;
  if (params.category && params.category !== 'all') {
    filtered = filtered.filter(v => v.categories.includes(params.category));
  }
  
  // Filter by search term
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(v => 
      v.title.toLowerCase().includes(searchLower) || 
      v.company.toLowerCase().includes(searchLower) ||
      v.location.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
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

// Function to save a vacancy (e.g., when marking as favorite)
const saveVacancy = async (vacancyId: number, isFavorite: boolean): Promise<boolean> => {
  // In a real app, this would be an API call to your backend
  console.log(`Saving vacancy ${vacancyId} as favorite: ${isFavorite}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return true; // Success
};

const VacanciesContent = () => {
  const { t } = useLanguage();
  const { selectedCategory } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  // Use React Query to fetch vacancies
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allVacancies', selectedCategory, searchTerm, page, limit],
    queryFn: () => fetchAllVacancies({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      search: searchTerm,
      page,
      limit
    }),
  });

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="mt-10 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">{t('vacancies.allVacancies')}</h1>
          <p className="text-muted-foreground">{t('vacancies.browseDescription')}</p>
        </div>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t('vacancies.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
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
            
            {/* Pagination */}
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
