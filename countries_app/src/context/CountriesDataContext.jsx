import React, { createContext, useContext, useState, useEffect } from 'react';

const CountriesContext = createContext();

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchCountries = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3", {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const simplifiedData = data.map(country => ({
          id: country.cca3,
          flag: country.flags.png,
          name: country.name.official,
          common: country.name.common
        }));
        
        setCountries(simplifiedData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error("Fetch error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
    
    return () => controller.abort();
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, isLoading, error }}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error('useCountries must be used within a CountriesProvider');
  }
  return context;
}