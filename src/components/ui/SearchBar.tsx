
import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation, LocationType } from '@/contexts/LocationContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [open, setOpen] = useState(false);
  
  const locations = [
    { value: 'all', label: t('location.allUkraine')},
    { value: 'Київ', label: t('location.Kyiv') },
    { value: 'Дніпро', label: t('location.Dnipro')},
    { value: 'Харків', label: t('location.Kharkov')},
    { value: 'Одеса', label: t('location.Odesa')},
    { value: 'Львів', label: t('location.Lviv')},
    { value: 'remote', label: t('location.remote')},
    { value: 'abroad', label: t('location.abroad')}
  ];


  const selectedLocationObj = locations.find(loc => loc.value === selectedLocation);

  const clearLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLocation('all');
  };
  
  return (
    <div 
      className={cn(
        "w-full relative transition-all duration-300 bg-background rounded-full border border-border",
        "flex items-center shadow-sm",
        focused ? "ring-2 ring-primary/20" : ""
      )}
    >
      <div className="flex-grow flex items-center pl-5">
        <Search className="h-5 w-5 text-muted-foreground mr-3" />
        <input
          type="text"
          placeholder={t('search.placeholder')}
          className="w-full py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      
      <div className="border-l border-border px-3 flex items-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className="justify-between py-1"
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm font-medium">
                  {selectedLocationObj ? selectedLocationObj.label : t('location.allUkraine')}
                </span>
                {selectedLocation !== 'all' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 ml-1 hover:bg-secondary/80" 
                    onClick={clearLocation}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder={t('location.searchPlaceholder') || "Пошук міста..."} />
              <CommandList>
                <CommandEmpty>{t('location.noResults') || "Нічого не знайдено"}</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem
                      key={location.value}
                      value={location.value}
                      onSelect={(value) => {
                        setSelectedLocation(value as LocationType);
                        setOpen(false);
                      }}
                    >
                      {location.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="pr-2">
        <Button
          type="submit"
          className="rounded-full"
          size="sm"
        >
          {t('search.button')}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
