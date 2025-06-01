import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReadMore({ country }) {
  const navigate = useNavigate();

  if (!country) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={country.flag} 
          alt={`Flag of ${country.name}`} 
          className="w-16 h-12 object-cover border"
        />
        <span className="text-xl font-medium">{country.name}</span>
      </div>
      
      <button 
        onClick={() => navigate(`/country/${country.name}`)}
        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
      >
        Read more about {country.name}
      </button>
    </div>
  );
}