
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Available locations in Ukraine
export type LocationType = 
  | 'all'
  | 'Київ'
  | 'Дніпро'
  | 'Харків'
  | 'Львів'
  | 'Одеса'
  | 'Вінниця'
  | 'Херсон'
  | 'near'
  | 'remote'
  | 'abroad';

interface LocationContextType {
  selectedLocation: LocationType;
  setSelectedLocation: (location: LocationType) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('all');

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
