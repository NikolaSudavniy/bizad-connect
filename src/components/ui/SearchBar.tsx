
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
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
          placeholder="Search for ads, companies, or keywords..."
          className="w-full py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      <div className="pr-2">
        <Button
          type="submit"
          className="rounded-full"
          size="sm"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
