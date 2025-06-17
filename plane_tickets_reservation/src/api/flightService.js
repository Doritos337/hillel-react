import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const FLIGHTS_API_URL = `${API_BASE_URL}/flights`;

export const fetchAllFlights = async () => {
  try {
    const { data } = await axios.get(FLIGHTS_API_URL);
    return data;
  } catch (error) {
    console.error("Could not fetch flights:", error);
    throw new Error("Failed to load flight data.");
  }
};

export const fetchFlightById = async (id) => {
  try {
    const { data } = await axios.get(`${FLIGHTS_API_URL}/${id}`);
    return data;
  } catch (error) {
    console.error(`Could not fetch flight ${id}:`, error);
    throw new Error("Failed to load flight details.");
  }
};

export const updateFlight = async ({ id, flightData }) => {
  try {
    const { data } = await axios.put(`${FLIGHTS_API_URL}/${id}`, flightData);
    return data;
  } catch (error) {
    console.error(`Could not update flight ${id}:`, error);
    throw new Error("Booking error. Please try again.");
  }
};
