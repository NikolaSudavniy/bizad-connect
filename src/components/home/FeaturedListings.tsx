
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample listings data
const listings = [
  {
    id: 1,
    title: 'Premium Billboard Space in City Center',
    company: 'Urban Displays Co.',
    category: 'Outdoor',
    price: '$1,200/month',
    location: 'New York, NY',
    featured: true,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: 2,
    title: 'Social Media Campaign Manager',
    company: 'TechGrowth Inc.',
    category: 'Digital Marketing',
    price: '$800/campaign',
    location: 'Remote',
    featured: false,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: 3,
    title: 'Radio Advertisement Slot - Prime Time',
    company: 'ClearChannel Media',
    category: 'TV & Radio',
    price: '$500/week',
    location: 'Chicago, IL',
    featured: true,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=300'
  },
  {
    id: 4,
    title: 'Magazine Full Page Advertisement',
    company: 'Global Print Media',
    category: 'Print Media',
    price: '$950/issue',
    location: 'Los Angeles, CA',
    featured: false,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&h=300'
  },
];

const ListingCard = ({ listing }) => {
  const { t } = useLanguage();
  
  return (
    <div className="group rounded-xl overflow-hidden border border-border bg-card transition-all hover:shadow-md hover:border-primary/20">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {listing.featured && (
          <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1 fill-white" />
            {t('listings.featured.label')}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/50 text-foreground/70">
            {listing.category}
          </span>
          <span className="text-sm font-semibold text-primary">
            {listing.price}
          </span>
        </div>
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{listing.title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{listing.company}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{listing.location}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-0 hover:bg-transparent hover:text-primary"
          >
            {t('listings.viewDetails')}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedListings = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">{t('listings.featured')}</h2>
            <p className="text-muted-foreground">{t('listings.discover')}</p>
          </div>
          <Button variant="outline" className="rounded-full mt-4 md:mt-0">
            {t('listings.viewAll')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
