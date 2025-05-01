import React, { useState, useEffect } from "react";
import { handleEvent } from "../utils";
import "./style.sass";

const API = "https://jsonplaceholder.typicode.com/users";

function renderObject(obj) {
  return (
    <ul>
      {Object.entries(obj).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong>{" "}
          {typeof value === "object" && value !== null
            ? renderObject(value)
            : value?.toString()}
        </li>
      ))}
    </ul>
  );
}

export default function RUD() {
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      const request = await fetch(API);
      const response = await request.json();
      setList(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemUpdate = async (updatedItem) => {
    try {
      const request = await fetch(`${API}/${updatedItem.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      setList((prev) =>
        prev.map((item) =>
          item.id === response.id ? response : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return list.length ? (
    <ul className="list">
      {list.map((item) => (
        <li key={item.id} className="list__item">
          <div className="list__item-object">{renderObject(item)}</div>

          <input
            type="text"
            className="list__item-input"
            value={item.name}
            onChange={(event) =>
              handleItemUpdate({ ...item, name: event.target.value })
            }
          />

          <button
            className="list__item-delete-btn"
            onClick={(event) =>
              handleEvent(event, handleItemDelete, [item.id])
            }
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p>Loading...</p>
  );
}