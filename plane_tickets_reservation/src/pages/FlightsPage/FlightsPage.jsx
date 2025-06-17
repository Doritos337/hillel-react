import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllFlights } from "../../api/flightService";
import { useFlightSearch } from "../../hooks/useFlightSearch";
import { useFlightSearchStore } from "../../hooks/useFlightSearchStore";
import { FLIGHTS_QUERY_KEY } from "../../utils/constants";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SearchForm from "../../components/SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/SearchResults";

function FlightsPage() {
  const { setSearchParams } = useFlightSearchStore();

  const {
    data: allFlights,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: FLIGHTS_QUERY_KEY,
    queryFn: fetchAllFlights,
  });

  const uniqueCities = useMemo(() => {
    if (!allFlights) return [];
    const cities = new Set();
    allFlights.forEach((flight) => {
      cities.add(flight.origin);
      cities.add(flight.destination);
    });
    return Array.from(cities).sort();
  }, [allFlights]);

  const searchResults = useFlightSearch(allFlights);

  return (
    <div className="container mx-auto p-4">
      <SearchForm uniqueCities={uniqueCities} onSearch={setSearchParams} />

      <div>
        {isLoading && <LoadingSpinner />}
        {isError && (
          <div className="text-center text-red-400 text-xl">
            Error: {error.message}
          </div>
        )}

        {!isLoading && !isError && (
          <SearchResults searchResults={searchResults} />
        )}
      </div>
    </div>
  );
}

export default FlightsPage;
