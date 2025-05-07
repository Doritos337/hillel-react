import React, { useState, useEffect } from "react";
import UserItem from "./UserItem";
import Form from "./Form";
import Filter from "../filter/filter";
import "./style.sass";

const API = "https://jsonplaceholder.typicode.com/users";

export default function CRUD() {
  const [originalList, setOriginalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filters, setFilters] = useState({ name: '', id: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setOriginalList(data);
        setFilteredList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = originalList.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(filters.name.toLowerCase());
      const idMatch = filters.id ? item.id === Number(filters.id) : true;
      return nameMatch && idMatch;
    });
    setFilteredList(filtered);
  }, [filters, originalList]);

  const handleCreate = (newUser) => {
    const newId = originalList.length > 0 
      ? Math.max(...originalList.map(item => item.id)) + 1 
      : 1;
    
    const updatedList = [...originalList, { ...newUser, id: newId }];
    setOriginalList(updatedList);
    setFilters({ name: '', id: '' });
  };

  const handleItemDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setOriginalList(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleItemUpdate = async (updatedItem) => {
    try {
      await fetch(`${API}/${updatedItem.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedItem),
        headers: { "Content-Type": "application/json" }
      });
      setOriginalList(prev => 
        prev.map(item => item.id === updatedItem.id ? updatedItem : item)
      );
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="container">
      <div className="controls">
        <button 
          className="create-btn"
          onClick={() => setIsFormOpen(true)}
        >
          Create New User
        </button>
        <Filter onFilter={setFilters} />
      </div>

      <Form
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onCreate={handleCreate}
      />

      {filteredList.length ? (
        <ul className="list">
          {filteredList.map((item) => (
            <UserItem
              key={item.id}
              item={item}
              onDelete={handleItemDelete}
              onUpdate={handleItemUpdate}
            />
          ))}
        </ul>
      ) : originalList.length ? (
        <p className="no-results">No matching users found</p>
      ) : (
        <p className="loading">Loading users...</p>
      )}
    </div>
  );
}