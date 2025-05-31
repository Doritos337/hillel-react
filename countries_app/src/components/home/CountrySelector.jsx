import React from 'react';

export default function CountrySelector({ 
  countries, 
  value, 
  onChange 
}) {
  return (
    <div className="country-selector">
      <label htmlFor="country-select">Select country:</label>
      <div className="select-wrapper">
        <select 
          id="country-select"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- Choose a country --</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>
                {country.flag} {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}