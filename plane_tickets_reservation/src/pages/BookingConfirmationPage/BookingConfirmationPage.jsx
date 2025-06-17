import React from "react";
import { Link } from "react-router-dom";
import { useFlightSearchStore } from "../../hooks/useFlightSearchStore";

function BookingConfirmationPage() {
  const resetSearchParams = useFlightSearchStore(
    (state) => state.resetSearchParams
  );

  return (
    <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-150px)]">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl max-w-md">
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          Booking Successful!
        </h1>
        <p className="text-lg mb-6">
          Your ticket has been confirmed. Thank you for choosing our service.
        </p>
        <Link
          to="/flights"
          onClick={resetSearchParams}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          Back to Search
        </Link>
      </div>
    </div>
  );
}

export default BookingConfirmationPage;
