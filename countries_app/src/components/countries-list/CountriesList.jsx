import React from 'react';
import { Link } from 'react-router-dom';

export default function CountriesList({ countries }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map(country => (
        <Link 
          key={country.id} 
          to={`/country/${country.common}`}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div className="p-4 flex items-center space-x-4">
            <img 
              src={country.flag} 
              alt={`Flag of ${country.name}`} 
              className="w-16 h-12 object-cover border"
            />
            <span className="text-lg font-medium">{country.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}