import React from "react";
import { Link } from "react-router-dom";

function FlightCard({ flight }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:gap-4">
      <div className="flex-1 w-full">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
          <span className="text-lg font-bold text-blue-400">
            {flight.airline}
          </span>
          <span className="text-sm text-gray-400">{flight.flightNumber}</span>
          <span className="flex items-center gap-x-2 text-sm text-gray-300">
            🗓️
            <span>{flight.departureDate}</span>
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="text-xl font-semibold">{flight.origin}</p>
            <p className="text-2xl font-bold">{flight.departureTime}</p>
          </div>
          <div className="text-gray-400 text-xl">→</div>
          <div className="text-center">
            <p className="text-xl font-semibold">{flight.destination}</p>
            <p className="text-2xl font-bold">{flight.arrivalTime}</p>
          </div>
        </div>
      </div>
      <div className="text-center sm:text-right">
        <p className="text-xl font-bold text-green-400">{flight.price} UAH</p>
        <p className="text-sm text-gray-300">
          Available: {flight.availableSeats}
        </p>
        <Link
          to={`/flights/${flight.id}`}
          className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Book
        </Link>
      </div>
    </div>
  );
}

export default FlightCard;
