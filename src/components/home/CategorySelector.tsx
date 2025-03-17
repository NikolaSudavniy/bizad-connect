
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Sample category data
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'digital', name: 'Digital Marketing' },
  { id: 'print', name: 'Print Media' },
  { id: 'outdoor', name: 'Outdoor' },
  { id: 'social', name: 'Social Media' },
  { id: 'tv', name: 'TV & Radio' },
  { id: 'events', name: 'Events' },
  { id: 'influencer', name: 'Influencer' },
];

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
