
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Briefcase, Heart } from 'lucide-react';

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
}

const VacancyCard = ({ vacancy }: { vacancy: VacancyProps }) => {
  return (
    <Card className="rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-sm">
      <div className="p-5">
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
              <p className="text-sm text-muted-foreground">{vacancy.company}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Save to favorites</span>
          </Button>
        </div>

        <div className="space-y-2 mb-4">
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

        <div className="flex justify-between items-center">
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
