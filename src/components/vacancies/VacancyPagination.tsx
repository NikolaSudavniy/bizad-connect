
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface VacancyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const VacancyPagination = ({ currentPage, totalPages, onPageChange }: VacancyPaginationProps) => {
  const { t } = useLanguage();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12">
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t('pagination.previous')}
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t('pagination.next')}
        </Button>
      </div>
    </div>
  );
};

export default VacancyPagination;
