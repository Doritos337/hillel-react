import "./List.css";
import { nanoid } from "nanoid";
import randomAnimalIndex from "./utils";
import { useState, useEffect } from "react";

function List() {
  const animals = [
    { type: `turtle`, icon: `🐢` },
    { type: `octopus`, icon: `🐙` },
    { type: `fish`, icon: `🐠` },
    { type: `flamingo`, icon: `🦩` },
    { type: `penguin`, icon: `🐧` },
  ];

  const [list, setList] = useState(animals);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setList((prevList) => {
        const randomIndex = randomAnimalIndex(prevList);

        if (randomIndex === -1) {
          clearInterval(interval);
          return prevList;
        }

        return prevList.map((elem, index) => ({
          ...elem,
          active: randomIndex === index || elem.active,
        }));
      });
    }, 1000);

    setIntervalId(interval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  function animalGetter(list) {
    return list.map((animal) => (
      <tr
        key={nanoid()}
        className={animal.active ? "animal active-row" : "animal"}
      >
        <td>{animal.type}</td>
        <td>{animal.icon}</td>
      </tr>
    ));
  }

  return (
    <table className="animal-table">
      <tbody>{animalGetter(list)}</tbody>
    </table>
  );
}

export default List;
