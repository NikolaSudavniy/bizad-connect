import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Briefcase, Heart, Building, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from '@/contexts/LanguageContext';

export interface VacancyProps {
  id: number;
  title: string;
  company: string;
  location: string;
  salary?: string;
  experience?: string;
  postedTime: string;
  logo?: string;
  isNew?: boolean;
  progress?: number;
  companyDescription?: string;
  rating?: number;
  contactPhone?: string;
  contactEmail?: string;
  categories: string[];
}

interface VacancyCardProps {
  vacancy: VacancyProps;
  onFavoriteToggle?: (isFavorite: boolean) => void;
}

const VacancyCard = ({ vacancy, onFavoriteToggle }: VacancyCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteVacancies') || '[]');
    setIsFavorite(favorites.includes(vacancy.id));
  }, [vacancy.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('favoriteVacancies') || '[]');
    
    let newFavorites;
    if (favorites.includes(vacancy.id)) {
      newFavorites = favorites.filter(id => id !== vacancy.id);
      toast({
        description: t('favorites.removedFromFavorites') || "Removed from favorites",
        duration: 2000,
      });
    } else {
      newFavorites = [...favorites, vacancy.id];
      toast({
        description: t('favorites.addedToFavorites') || "Added to favorites",
        duration: 2000,
      });
    }
    
    localStorage.setItem('favoriteVacancies', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    if (onFavoriteToggle) {
      onFavoriteToggle(!isFavorite);
    }
  };
  
  const handleCardClick = () => {
    navigate(`/vacancy/${vacancy.id}`);
  };

  const handleCompanyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    let companyId;
    if (vacancy.company === "Діфоменко О. М., ФОП") {
      companyId = "business1";
    } else if (vacancy.company === "SoftServe LLC") {
      companyId = "business2";
    } else if (vacancy.company === "Планета, мебельна майстерня") {
      companyId = "advertiser1";
    } else if (vacancy.company === "Digital Creators Agency") {
      companyId = "advertiser2";
    } else {
      companyId = "business1";
    }
    
    navigate(`/company/${companyId}`);
  };

  return (
    <Card 
      className="rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-sm h-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {vacancy.logo ? (
              <div className="w-10 h-10 rounded-md overflow-hidden mr-3 bg-muted flex items-center justify-center">
                <img src={vacancy.logo} alt={vacancy.company} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-md mr-3 bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary/70" />
              </div>
            )}
            <div>
              <h3 className="font-semibold line-clamp-1">{vacancy.title}</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p 
                      className="text-sm text-muted-foreground line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                      onClick={handleCompanyClick}
                    >
                      {vacancy.company}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('vacancy.clickToViewCompany') || "Click to view company details"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 rounded-full ${isFavorite ? 'text-primary hover:text-primary/80' : 'hover:text-primary'}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="sr-only">Save to favorites</span>
          </Button>
        </div>

        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            <span>{vacancy.location}</span>
          </div>
          
          {vacancy.salary && (
            <div className="flex items-center text-sm font-medium">
              <span>{vacancy.salary}</span>
            </div>
          )}
          
          {vacancy.experience && (
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Experience: {vacancy.experience}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{vacancy.postedTime}</span>
          </div>
          
          {vacancy.isNew && (
            <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200">
              New
            </Badge>
          )}
        </div>
        
        {vacancy.progress !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Relevance</span>
              <span className="font-medium">{vacancy.progress}/7</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${(vacancy.progress / 7) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VacancyCard;
