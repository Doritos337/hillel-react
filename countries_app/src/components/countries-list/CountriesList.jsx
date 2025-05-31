import React from 'react';
import { Link } from 'react-router-dom';

export default function CountriesList({ countries }) {
  return (
    <div className="country-list">
      {countries.map(country => (
        <div key={country.id} className="country-item">
          <Link to={`/country/${country.common}`}>
            {country.flag} {country.name}
          </Link>
        </div>
      ))}
    </div>
  );
}