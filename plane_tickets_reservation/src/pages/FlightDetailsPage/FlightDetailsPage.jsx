import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchFlightById, updateFlight } from "../../api/flightService";
import { bookingSchema } from "../../utils/validationSchemas";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function FlightDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: flight,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["flight", id],
    queryFn: () => fetchFlightById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: updateFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
      queryClient.invalidateQueries({ queryKey: ["flight", id] });
      navigate("/booking-confirmation");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const onBookingSubmit = () => {
    if (flight && flight.availableSeats > 0) {
      const updatedFlight = {
        ...flight,
        availableSeats: flight.availableSeats - 1,
      };
      mutation.mutate({ id, flightData: updatedFlight });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-center text-red-400 text-xl">
        Error: {queryError.message}
      </div>
    );

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Flight Details</h2>
        <div className="space-y-3 text-lg">
          <p>
            <span className="font-semibold text-gray-400">Airline:</span>{" "}
            {flight.airline}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Flight Number:</span>{" "}
            {flight.flightNumber}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Route:</span>{" "}
            {flight.origin} → {flight.destination}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Date:</span>{" "}
            {flight.departureDate}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Time:</span>{" "}
            {flight.departureTime} - {flight.arrivalTime}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Price:</span>{" "}
            <span className="text-green-400 font-bold">{flight.price} UAH</span>
          </p>
          <p>
            <span className="font-semibold text-gray-400">
              Available Seats:
            </span>{" "}
            {flight.availableSeats}
          </p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Book a Ticket</h2>
        {flight.availableSeats > 0 ? (
          <form onSubmit={handleSubmit(onBookingSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block mb-1 text-sm font-medium"
              >
                Full Name
              </label>
              <input
                {...register("fullName")}
                id="fullName"
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-1 text-sm font-medium"
              >
                Phone Number (optional)
              </label>
              <input
                {...register("phoneNumber")}
                type="tel"
                id="phoneNumber"
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
              />
            </div>
            <div className="flex items-center">
              <input
                {...register("confirmAgreement")}
                type="checkbox"
                id="confirmAgreement"
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
              />
              <label htmlFor="confirmAgreement" className="ml-2 text-sm">
                I agree to the booking terms and conditions
              </label>
            </div>
            {errors.confirmAgreement && (
              <p className="text-red-400 text-sm">
                {errors.confirmAgreement.message}
              </p>
            )}

            {mutation.isError && (
              <p className="text-red-400 text-center">
                {mutation.error.message}
              </p>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Booking..." : "Book Now"}
            </button>
          </form>
        ) : (
          <div className="text-center text-yellow-400 text-xl p-8">
            Unfortunately, there are no available seats left on this flight.
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightDetailsPage;
