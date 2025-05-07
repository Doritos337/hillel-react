import React from "react";
import { handleEvent, renderObject } from "../../utils";
import "./style.sass";

export default function UserItem({ item, onDelete, onUpdate }) {
  return (
    <li className="list__item">
      <div className="list__item-object">{renderObject(item)}</div>
      
      <input
        type="text"
        className="list__item-input"
        value={item.name}
        onChange={(e) => onUpdate({ ...item, name: e.target.value })}
      />

      <button
        className="list__item-delete-btn"
        onClick={(e) => handleEvent(e, onDelete, [item.id])}
      >
        Delete
      </button>
    </li>
  );
}