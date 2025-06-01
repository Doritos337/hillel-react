import React, { useState, useEffect } from 'react';
import { useCountries } from '../../context/CountriesDataContext';
import CountrySelector from './CountrySelector';
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

  if (isLoading) return <div className="text-center py-20">Loading countries...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Home</h1>
      
      <CountrySelector 
        countries={countries}
        value={selectedCountryId}
        onChange={setSelectedCountryId}
      />
      
      {selectedCountry && <ReadMore country={selectedCountry} />}
    </div>
  );
}