import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { flightSearchSchema } from "../../utils/validationSchemas";
import { useAutocomplete } from "../../hooks/useAutocomplete";
import { useFlightSearchStore } from "../../hooks/useFlightSearchStore";

function SearchForm({ uniqueCities, onSearch }) {
  const { searchParams } = useFlightSearchStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: {
      origin: searchParams?.origin || "",
      destination: searchParams?.destination || "",
      departureDate: searchParams?.departureDate || "",
    },
  });

  const originValue = watch("origin");
  const destinationValue = watch("destination");

  const {
    suggestions: originSuggestions,
    containerRef: originRef,
    closeSuggestions: closeOriginSuggestions,
  } = useAutocomplete(originValue, uniqueCities);
  const {
    suggestions: destinationSuggestions,
    containerRef: destinationRef,
    closeSuggestions: closeDestinationSuggestions,
  } = useAutocomplete(destinationValue, uniqueCities);

  const handleSuggestionClick = (fieldName, value, closeCallback) => {
    setValue(fieldName, value, { shouldValidate: true });
    closeCallback();
  };

  const submitHandler = (data) => {
    onSearch(data);
    closeOriginSuggestions();
    closeDestinationSuggestions();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-4">Search Flights</h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start"
      >
        <div ref={originRef} className="relative flex flex-col">
          <label htmlFor="origin" className="mb-1 text-sm font-medium">
            From
          </label>
          <input
            {...register("origin")}
            autoComplete="off"
            id="origin"
            className="p-2 bg-gray-700 rounded border border-gray-600"
          />
          {errors.origin && (
            <p className="text-red-400 text-sm mt-1">{errors.origin.message}</p>
          )}
          {originSuggestions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full bg-gray-600 border border-gray-500 rounded-md z-10 max-h-48 overflow-y-auto">
              {originSuggestions.map((city) => (
                <li
                  key={city}
                  onClick={() =>
                    handleSuggestionClick(
                      "origin",
                      city,
                      closeOriginSuggestions
                    )
                  }
                  className="p-2 hover:bg-blue-600 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div ref={destinationRef} className="relative flex flex-col">
          <label htmlFor="destination" className="mb-1 text-sm font-medium">
            To
          </label>
          <input
            {...register("destination")}
            autoComplete="off"
            id="destination"
            className="p-2 bg-gray-700 rounded border border-gray-600"
          />
          {errors.destination && (
            <p className="text-red-400 text-sm mt-1">
              {errors.destination.message}
            </p>
          )}
          {destinationSuggestions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full bg-gray-600 border border-gray-500 rounded-md z-10 max-h-48 overflow-y-auto">
              {destinationSuggestions.map((city) => (
                <li
                  key={city}
                  onClick={() =>
                    handleSuggestionClick(
                      "destination",
                      city,
                      closeDestinationSuggestions
                    )
                  }
                  className="p-2 hover:bg-blue-600 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="departureDate" className="mb-1 text-sm font-medium">
            Date
          </label>
          <input
            {...register("departureDate")}
            type="date"
            id="departureDate"
            className="p-2 bg-gray-700 rounded border border-gray-600"
          />
          {errors.departureDate && (
            <p className="text-red-400 text-sm mt-1">
              {errors.departureDate.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 mt-auto"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
