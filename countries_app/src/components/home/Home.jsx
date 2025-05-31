import React, { useState, useEffect } from 'react';
import { useCountries } from '../../context/CountriesDataContext';
import CountrySelector from './CountrySelector'
import ReadMore from './ReadMore';

export default function HomeRoute() {
  const { countries, isLoading, error } = useCountries();
  const [selectedCountryId, setSelectedCountryId] = useState(null);

  useEffect(() => {
    if (countries.length > 0) {
      setSelectedCountryId(countries[0].id);
    }
  }, [countries]);

  const selectedCountry = countries.find(c => c.id === selectedCountryId);

  if (isLoading) return <div className="loading">Loading countries...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home">
      <h1>HomeRoute</h1>
      
      <CountrySelector 
        countries={countries}
        value={selectedCountryId}
        onChange={setSelectedCountryId}
      />
      
      <ReadMore country={selectedCountry} />
    </div>
  );
}