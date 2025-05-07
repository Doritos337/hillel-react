import React, { useState, useEffect } from 'react';
import "./filter.sass";

export default function Filter({ onFilter }) {
    const [isOpen, setIsOpen] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
        id: ''
    });

    useEffect(() => {
        onFilter(filters);
    }, [filters, onFilter]);

    const handleToggle = (e) => {
        e.preventDefault();
        setIsOpen(prev => !prev);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="filter-container">
            <button 
                onClick={handleToggle}
                className="filter-toggle"
            >
                {isOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {isOpen && (
                <div className="filter-form">
                    <div className="filter-group">
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={filters.name}
                                onChange={handleInputChange}
                                placeholder="Filter by name"
                            />
                        </label>
                    </div>
                    
                    <div className="filter-group">
                        <label>
                            ID:
                            <input
                                type="number"
                                name="id"
                                value={filters.id}
                                onChange={handleInputChange}
                                placeholder="Filter by ID"
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}