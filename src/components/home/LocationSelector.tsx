
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

  // Determine which locations to show based on search input
  const getFilteredLocations = () => {
    // Always include special categories
    const specialCategories = defaultLocations.filter(loc => 
      ['all', 'remote', 'abroad'].includes(loc.value)
    );
    
    // If search field is empty, only show default locations
    if (!searchValue.trim()) {
      return defaultLocations;
    }
    
    // If there's search text, show all cities that match (including hidden ones)
    const searchTerms = transliterate(searchValue.toLowerCase());
    
    // Include all cities (including hidden ones) in the search
    const cityMatches = allUkrainianCities.filter(loc => {
      const locValueTerms = transliterate(loc.value.toLowerCase());
      const locLabelTerms = transliterate(loc.label.toLowerCase());
      
      return locValueTerms.includes(searchValue.toLowerCase()) || 
             locLabelTerms.includes(searchValue.toLowerCase()) ||
             searchTerms.includes(loc.value.toLowerCase()) ||
             searchTerms.includes(loc.label.toLowerCase());
    });
    
    // Combine with special categories and ensure uniqueness
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
