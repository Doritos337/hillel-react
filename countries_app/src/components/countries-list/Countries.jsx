import React from 'react';
import { useCountries } from '../../context/CountriesDataContext';
import CountriesList from './CountriesList';

export default function CountriesListRoute() {
  const { countries, isLoading, error } = useCountries();

  if (isLoading) return <div className="loading">Loading countries...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="countries">
      <h1>Countries</h1>
      <CountriesList countries={countries} />
    </div>
  );
}