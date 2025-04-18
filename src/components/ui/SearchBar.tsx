
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
  const [locationSearchValue, setLocationSearchValue] = useState('');
  
  const defaultLocations = [
    { value: 'all', label: t('location.allUkraine')},
    { value: 'Київ', label: t('location.Kyiv') },
    { value: 'Дніпро', label: t('location.Dnipro')},
    { value: 'Харків', label: t('location.Kharkov')},
    { value: 'Одеса', label: t('location.Odesa')},
    { value: 'Львів', label: t('location.Lviv')},
    { value: 'remote', label: t('location.remote')},
    { value: 'abroad', label: t('location.abroad')}
  ];

  const hiddenCities = [
    { value: 'Вінниця', label: t('location.Vinnytsia') },
    { value: 'Херсон', label: t('location.Kherson') },
  ];

  const allUkrainianCities = [
    ...defaultLocations.filter(loc => 
      ['Київ', 'Дніпро', 'Харків', 'Одеса', 'Львів'].includes(loc.value)
    ),
    ...hiddenCities
  ];

  // Improved transliteration for search matching
  const transliterate = (text: string): string => {
    // Transliteration maps for bidirectional conversion
    const cyrillicToLatin: Record<string, string> = {
      'к': 'k', 'и': 'y', 'е': 'e', 'о': 'o', 'в': 'v', 'х': 'h', 'л': 'l',
      'д': 'd', 'н': 'n', 'і': 'i', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
      'ь': '', 'ц': 'ts', 'я': 'ya', 'й': 'y', 'ї': 'yi', 'є': 'ye',
      'ж': 'zh', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ю': 'yu', 'а': 'a',
      'б': 'b', 'г': 'g', 'ґ': 'g', 'з': 'z', 'м': 'm', 'ф': 'f', 'у': 'u'
    };
    
    const latinToCyrillic: Record<string, string> = {
      'k': 'к', 'y': 'и', 'e': 'е', 'o': 'о', 'v': 'в', 'h': 'х', 'l': 'л',
      'd': 'д', 'n': 'н', 'i': 'і', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т',
      'ts': 'ц', 'ya': 'я', 'yi': 'ї', 'ye': 'є', 'zh': 'ж', 'ch': 'ч',
      'sh': 'ш', 'sch': 'щ', 'yu': 'ю', 'a': 'а', 'b': 'б', 'g': 'г',
      'z': 'з', 'm': 'м', 'f': 'ф', 'u': 'у'
    };
    
    // Normalize text to lowercase for consistent matching
    const normalizedText = text.toLowerCase();
    
    // Create normalized versions of the text: one Latinized, one Cyrillicized
    let latinized = '';
    let cyrillicized = '';
    
    // Process each character
    for (let i = 0; i < normalizedText.length; i++) {
      const char = normalizedText[i];
      
      // Determine if it's a Cyrillic character
      if (/[а-яіїєґ]/.test(char)) {
        latinized += cyrillicToLatin[char] || char;
        cyrillicized += char;
      } else {
        // It's a Latin character or other
        cyrillicized += latinToCyrillic[char] || char;
        latinized += char;
      }
    }
    
    // Return the original normalized text for comparison
    return normalizedText + ' ' + latinized + ' ' + cyrillicized;
  };

  const getFilteredLocations = () => {
    const specialCategories = defaultLocations.filter(loc => 
      ['all', 'remote', 'abroad'].includes(loc.value)
    );
    
    if (!locationSearchValue.trim()) {
      return defaultLocations;
    }
    
    const searchTerms = transliterate(locationSearchValue.toLowerCase());
    
    // Include all cities (including hidden ones) in the search
    const cityMatches = allUkrainianCities.filter(loc => {
      const locValueTerms = transliterate(loc.value.toLowerCase());
      const locLabelTerms = transliterate(loc.label.toLowerCase());
      
      return locValueTerms.includes(locationSearchValue.toLowerCase()) || 
             locLabelTerms.includes(locationSearchValue.toLowerCase()) ||
             searchTerms.includes(loc.value.toLowerCase()) ||
             searchTerms.includes(loc.label.toLowerCase());
    });
    
    const combined = [...specialCategories, ...cityMatches];
    const uniqueValues = new Set();
    
    return combined.filter(loc => {
      if (uniqueValues.has(loc.value)) {
        return false;
      }
      uniqueValues.add(loc.value);
      return true;
    });
  };

  const filteredLocations = getFilteredLocations();
  const selectedLocationObj = [...defaultLocations, ...hiddenCities].find(loc => loc.value === selectedLocation);

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
              <CommandInput 
                placeholder={t('location.searchPlaceholder') || "Пошук міста..."} 
                value={locationSearchValue}
                onValueChange={setLocationSearchValue}
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
                        setLocationSearchValue('');
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
