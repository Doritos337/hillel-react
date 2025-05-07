import React, { useState, useEffect } from 'react';
import "./form.sass";

export default function Form({ isOpen, onClose, onCreate }) {
  const initialFormState = {
    id: '',
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: { lat: '', lng: '' }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) setFormData(initialFormState);
  }, [isOpen]);

  const handleNestedChange = (path, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current = newData;
      
      keys.forEach((key, index) => {
        if(index === keys.length - 1) {
          current[key] = value;
        } else {
          current[key] = { ...current[key] };
          current = current[key];
        }
      });
      
      return newData;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.username.trim()) newErrors.username = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onCreate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Create User</h2>
        
        <form onSubmit={handleSubmit}>
          {['name', 'username', 'email'].map(field => (
            <div key={field} className="form-group">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)} *</label>
              <input
                type="text"
                value={formData[field]}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  [field]: e.target.value
                }))}
              />
              {errors[field] && <span className="error">{errors[field]}</span>}
            </div>
          ))}

          <div className="nested-section">
            <h3>Address</h3>
            {Object.entries(formData.address).map(([key, value]) => (
              <div key={key} className="form-group">
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                {typeof value === 'object' ? (
                  Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey} className="form-group">
                      <label>{subKey}</label>
                      <input
                        type="text"
                        value={subValue}
                        onChange={e => handleNestedChange(
                          `address.${key}.${subKey}`, 
                          e.target.value
                        )}
                      />
                    </div>
                  ))
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={e => handleNestedChange(
                      `address.${key}`, 
                      e.target.value
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="nested-section">
            <h3>Company</h3>
            {Object.entries(formData.company).map(([key, value]) => (
              <div key={key} className="form-group">
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type="text"
                  value={value}
                  onChange={e => handleNestedChange(
                    `company.${key}`, 
                    e.target.value
                  )}
                />
              </div>
            ))}
          </div>

          <div className="form-buttons">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}