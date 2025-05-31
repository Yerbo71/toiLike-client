import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CityEnum = 'ALMATY' | 'ASTANA' | 'SHYMKENT';

type GlobalFilterContextType = {
  city: CityEnum | null;
  setCity: (city: CityEnum | null) => void;
};

const GlobalFilterContext = createContext<GlobalFilterContextType | undefined>(
  undefined,
);

export const GlobalFilterProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<CityEnum | null>(null);

  return (
    <GlobalFilterContext.Provider value={{ city, setCity }}>
      {children}
    </GlobalFilterContext.Provider>
  );
};

export const useGlobalFilters = () => {
  const context = useContext(GlobalFilterContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalFilters must be used within a GlobalFilterProvider',
    );
  }
  return context;
};
