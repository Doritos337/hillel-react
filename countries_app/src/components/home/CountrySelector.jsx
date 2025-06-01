import React from 'react';

export default function CountrySelector({ 
  countries, 
  value, 
  onChange 
}) {
  return (
    <div className="mb-6">
      <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select country:
      </label>
      <select 
        id="country-select"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">-- Choose a country --</option>
        {countries.map(country => (
          <option key={country.id} value={country.id}>
              {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}