import React from "react";
import { useCountries } from "../../context/CountriesDataContext";
import CountriesList from "./CountriesList";

export default function CountriesListRoute() {
  const { countries, isLoading, error } = useCountries();

  if (isLoading)
    return <div className="text-center py-20">Loading countries...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Countries</h1>
      <CountriesList countries={countries} />
    </div>
  );
}
