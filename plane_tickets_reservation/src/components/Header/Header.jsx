import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useFlightSearchStore } from "../../hooks/useFlightSearchStore";

function Header() {
  const logout = useAuthStore((state) => state.logout);
  const resetSearchParams = useFlightSearchStore(
    (state) => state.resetSearchParams
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container flex items-center justify-between p-4 mx-auto">
        <Link
          to="/flights"
          onClick={resetSearchParams}
          className="text-xl font-bold text-white hover:text-blue-400"
        >
          ✈️ Flight Booker
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/flights"
            onClick={resetSearchParams}
            className="px-3 py-2 text-white rounded hover:bg-gray-700"
          >
            Flights
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
