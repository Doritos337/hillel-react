import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-center text-white p-4">
      <h1 className="text-9xl font-extrabold text-blue-500">404</h1>
      <h2 className="mt-4 text-4xl font-bold tracking-tight">Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-300">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        to="/flights"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        Back to Flight Search
      </Link>
    </div>
  );
}

export default NotFoundPage;
