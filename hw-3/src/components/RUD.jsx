import React, { useState, useEffect } from "react";
import { handleEvent } from "../utils";
import "./style.sass"
const API = "https://jsonplaceholder.typicode.com/users";

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
      setList((prevState) => prevState.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemUpdate = async (item) => {
    try {
      const request = await fetch(`${API}/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();

      setList((prevState) =>
        prevState.map((element) =>
          element.id === response.id ? response : element
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
          <span>{item.name}</span>
          <button className="list__item-delete-btn"
            onClick={(event) => handleEvent(event, handleItemDelete, [item.id])}
          >
            Delete
          </button>
          <input
            type="text"
            className="list__item-input"
            placeholder={item.name}
            onChange={(event) =>
              handleItemUpdate({ ...item, name: event.target.value })
            }
          ></input>
        </li>
      ))}
    </ul>
  ) : null;
}