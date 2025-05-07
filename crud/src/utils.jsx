import React from "react";
const handleEvent = (event, cl, props) => {
    event.stopPropagation();
    cl(...props);
  }

const renderObject = (obj) => {
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

export { handleEvent, renderObject };