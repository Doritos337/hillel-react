import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CountryDetails() {
  const { name } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const fetchCountryData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (data.length > 0) {
          setCountryDetails(data[0]);
          if (data[0].latlng) {
            const [lat, lng] = data[0].latlng;
            setMapUrl(
              `https://maps.google.com/maps?q=${lat},${lng}&z=3&output=embed`
            );
          }
        } else {
          throw new Error("Country not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryData();
  }, [name]);

  if (isLoading)
    return <div className="text-center py-20">Loading country details...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!countryDetails)
    return <div className="text-center py-20">Country not found</div>;

  const {
    name: countryName,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    currencies,
    flags,
    maps,
    latlng,
    borders,
    timezones,
  } = countryDetails;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex items-center"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <img
          src={flags.png}
          alt={flags.alt || `Flag of ${countryName.official}`}
          className="w-full md:w-1/2 lg:w-1/3 rounded-xl shadow-md"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">{countryName.official}</h1>
          <h2 className="text-xl text-gray-600 mt-2">{countryName.common}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">
            Population
          </h3>
          <p className="text-2xl font-bold mt-1">
            {population.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">
            Area
          </h3>
          <p className="text-2xl font-bold mt-1">{area.toLocaleString()} km²</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">
            Capital
          </h3>
          <p className="text-2xl font-bold mt-1">{capital?.[0] || "N/A"}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">
            Region
          </h3>
          <p className="text-2xl font-bold mt-1">
            {region} {subregion && `(${subregion})`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm uppercase font-semibold mb-4">
            Languages
          </h3>
          <p className="text-lg">
            {languages ? Object.values(languages).join(", ") : "N/A"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm uppercase font-semibold mb-4">
            Currency
          </h3>
          <p className="text-lg">
            {currencies
              ? Object.values(currencies)
                  .map((c) => `${c.name} (${c.symbol})`)
                  .join(", ")
              : "N/A"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm uppercase font-semibold mb-4">
            Timezones
          </h3>
          <p className="text-lg">{timezones.join(", ")}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm uppercase font-semibold mb-4">
            Borders
          </h3>
          <p className="text-lg">{borders?.join(", ") || "None"}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Location Map</h2>
        <p className="text-gray-600 mb-4">Coordinates: {latlng.join(", ")}</p>

        {mapUrl ? (
          <>
            <iframe
              title={`${countryName.common} Map`}
              width="100%"
              height="400"
              frameBorder="0"
              className="rounded-lg"
              src={mapUrl}
              allowFullScreen
            ></iframe>

            <div className="flex flex-wrap gap-4 mt-4">
              {maps?.googleMaps && (
                <a
                  href={maps.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Open in Google Maps
                </a>
              )}
              {maps?.openStreetMaps && (
                <a
                  href={maps.openStreetMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Open in OpenStreetMap
                </a>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Map data not available
          </div>
        )}
      </div>
    </div>
  );
}
