import { useMemo } from "react";
import { useFlightSearchStore } from "./useFlightSearchStore";

export function useFlightSearch(allFlights) {
  const { searchParams } = useFlightSearchStore();

  const searchResults = useMemo(() => {
    if (!allFlights) return { type: "LOADING" };
    if (!searchParams) return { type: "INITIAL", data: allFlights };

    const routeMatches = allFlights.filter(
      (flight) =>
        flight.origin
          .toLowerCase()
          .includes(searchParams.origin.toLowerCase()) &&
        flight.destination
          .toLowerCase()
          .includes(searchParams.destination.toLowerCase())
    );

    if (routeMatches.length === 0) {
      return { type: "NO_RESULTS" };
    }

    const exactDateMatches = routeMatches.filter(
      (flight) => flight.departureDate === searchParams.departureDate
    );

    if (exactDateMatches.length > 0) {
      return { type: "EXACT_MATCH", data: exactDateMatches };
    }

    const searchDateObj = new Date(searchParams.departureDate);
    const futureRouteFlights = routeMatches.filter(
      (f) => new Date(f.departureDate) > searchDateObj
    );

    if (futureRouteFlights.length > 0) {
      const nearestFlight = futureRouteFlights.reduce((nearest, current) => {
        const nearestDiff = new Date(nearest.departureDate) - searchDateObj;
        const currentDiff = new Date(current.departureDate) - searchDateObj;
        return currentDiff < nearestDiff ? current : nearest;
      });
      return { type: "SUGGESTION", data: [nearestFlight] };
    }

    return { type: "NO_RESULTS_ON_DATE" };
  }, [allFlights, searchParams]);

  return searchResults;
}
