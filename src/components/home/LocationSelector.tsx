
import React, { useState } from 'react';
import { useLocation, LocationType } from '@/contexts/LocationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MapPin, Home, Globe, Clock } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';

const LocationSelector = () => {
  const { selectedLocation, setSelectedLocation } = useLocation();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Full list of default locations (always visible when search is empty)
  const defaultLocations = [
    { value: 'all', label: t('location.allUkraine'), icon: Globe },
    { value: 'Київ', label: t('location.Kyiv'), icon: MapPin },
    { value: 'Дніпро', label: t('location.Dnipro'), icon: MapPin },
    { value: 'Харків', label: t('location.Kharkov'), icon: MapPin },
    { value: 'Одеса', label: t('location.Odesa'), icon: MapPin },
    { value: 'Львів', label: t('location.Lviv'), icon: MapPin },
    { value: 'remote', label: t('location.remote'), icon: Clock },
    { value: 'abroad', label: t('location.abroad'), icon: Globe }
  ];

  // Cities that are only shown when searching (hidden initially)
  const hiddenCities = [
    { value: 'Вінниця', label: t('location.Vinnytsia'), icon: MapPin },
    { value: 'Херсон', label: t('location.Kherson'), icon: MapPin },
  ];

  // All Ukrainian cities for search filtering
  const allUkrainianCities = [
    ...defaultLocations.filter(loc => 
      ['Київ', 'Дніпро', 'Харків', 'Одеса', 'Львів'].includes(loc.value)
    ),
    ...hiddenCities
  ];

  // Determine which locations to show based on search input
  const getFilteredLocations = () => {
    // If search field is empty, only show default locations
    if (searchValue.trim() === '') {
      return defaultLocations;
    }
    
    // If there's search text, show all Ukrainian cities that match the search
    const searchLower = searchValue.toLowerCase();
    return allUkrainianCities.filter(loc => 
      loc.label.toLowerCase().includes(searchLower) ||
      loc.value.toLowerCase().includes(searchLower)
    );
  };

  const filteredLocations = getFilteredLocations();
  const selectedLocationObj = [...defaultLocations, ...hiddenCities].find(loc => loc.value === selectedLocation);
  
  return (
    <div className="w-full max-w-md mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between rounded-md bg-background"
          >
            <div className="flex items-center">
              {selectedLocationObj && (
                <>
                  <selectedLocationObj.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{selectedLocationObj.label}</span>
                </>
              )}
            </div>
            <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder={t('location.searchPlaceholder') || "Пошук міста..."}
              value={searchValue}
              onValueChange={setSearchValue}
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
                      setSearchValue('');
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 cursor-pointer",
                      selectedLocation === location.value && "bg-accent"
                    )}
                  >
                    <location.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{location.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationSelector;
