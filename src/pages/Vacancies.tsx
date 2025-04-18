import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CategoryProvider } from '@/contexts/CategoryContext';
import CategorySelector from '@/components/home/CategorySelector';
import { useLanguage } from '@/contexts/LanguageContext';
import VacancySearch from '@/components/vacancies/VacancySearch';
import VacancyResults from '@/components/vacancies/VacancyResults';
import VacancyPagination from '@/components/vacancies/VacancyPagination';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allVacancies', searchTerm, page, limit],
    queryFn: () => fetchAllVacancies({
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
          <VacancySearch 
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">{t('categories.filterBy')}</h2>
          <CategorySelector />
        </div>
        
        <VacancyResults 
          isLoading={isLoading}
          items={data?.items}
          onFavoriteToggle={saveVacancy}
        />
        
        {data && (
          <VacancyPagination
            currentPage={page}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
          />
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
