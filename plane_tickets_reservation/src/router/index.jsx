import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import FlightsPage from "../pages/FlightsPage/FlightsPage";
import FlightDetailsPage from "../pages/FlightDetailsPage/FlightDetailsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import BookingConfirmationPage from "../pages/BookingConfirmationPage/BookingConfirmationPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/flights/:id" element={<FlightDetailsPage />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmationPage />}
          />
          <Route path="/" element={<Navigate to="/flights" replace />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
