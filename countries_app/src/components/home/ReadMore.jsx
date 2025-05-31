import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReadMore({ country }) {
  const navigate = useNavigate();

  if (!country) return null;

  return (
    <div className="selected-country">
      <div className="country-preview">
        <img 
          src={country.flag} 
          alt={`Flag of ${country.name}`} 
          width={40}
          height={30}
        />
        <span>{country.name}</span>
      </div>
      
      <button 
        className="read-more-btn"
        onClick={() => navigate(`/country/${country.name}`)}
      >
        Read more about {country.name}
      </button>
    </div>
  );
}