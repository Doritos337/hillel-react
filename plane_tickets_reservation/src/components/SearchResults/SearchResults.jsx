import React from "react";
import FlightCard from "../FlightCard/FlightCard";

function SearchResults({ searchResults }) {
  if (
    searchResults.type === "INITIAL" ||
    searchResults.type === "EXACT_MATCH"
  ) {
    return (
      <div className="space-y-4">
        {searchResults.data.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    );
  }

  if (searchResults.type === "SUGGESTION") {
    return (
      <>
        <div className="text-center text-yellow-300 text-lg bg-yellow-900/50 p-4 rounded-md">
          No flights found for the selected date. You might be interested in the
          next available flight:
        </div>
        <FlightCard flight={searchResults.data[0]} />
      </>
    );
  }

  if (
    searchResults.type === "NO_RESULTS" ||
    searchResults.type === "NO_RESULTS_ON_DATE"
  ) {
    return (
      <div className="text-center text-gray-400 text-xl py-10">
        No flights were found for your request.
      </div>
    );
  }

  return null;
}

export default SearchResults;
