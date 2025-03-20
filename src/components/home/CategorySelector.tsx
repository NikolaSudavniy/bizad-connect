
import React from 'react';
import { cn } from '@/lib/utils';
import { useCategory } from '@/contexts/CategoryContext';
import { useLanguage } from '@/contexts/LanguageContext';

const CategorySelector = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const { t } = useLanguage();
  
  // Sample category data with translation keys
  const categories = [
    { id: 'all', name: t('categories.all') },
    { id: 'digital', name: t('categories.digital') },
    { id: 'print', name: t('categories.print') },
    { id: 'outdoor', name: t('categories.outdoor') },
    { id: 'social', name: t('categories.social') },
    { id: 'tv', name: t('categories.tv') },
    { id: 'events', name: t('categories.events') },
    { id: 'influencer', name: t('categories.influencer') },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-start overflow-x-auto pb-2 space-x-2 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all",
              "hover:bg-secondary",
              selectedCategory === category.id 
                ? "bg-primary text-white" 
                : "bg-secondary/50 text-foreground/70"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
