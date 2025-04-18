
import React from 'react';
import { Briefcase } from 'lucide-react';
import VacancyCard from '@/components/home/VacancyCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { VacancyType } from '@/types/vacancy';

interface VacancyResultsProps {
  isLoading: boolean;
  items?: VacancyType[];
  onFavoriteToggle: (id: number, isFavorite: boolean) => Promise<boolean>;
}

const VacancyResults = ({ isLoading, items, onFavoriteToggle }: VacancyResultsProps) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-60 w-full" />
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Briefcase className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-medium mb-2">{t('vacancies.noVacanciesFound')}</h3>
        <p className="text-muted-foreground max-w-md">
          {t('vacancies.tryDifferentSearch')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((vacancy) => (
        <VacancyCard 
          key={vacancy.id} 
          vacancy={vacancy} 
          onFavoriteToggle={(isFavorite) => onFavoriteToggle(vacancy.id, isFavorite)} 
        />
      ))}
    </div>
  );
};

export default VacancyResults;
