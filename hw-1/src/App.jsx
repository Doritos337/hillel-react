import './App.css';

function App(props) {
  const {title, data} = props;

  function animalGetter(group) {
    return group.animals.map((animal) => (
      <td key={animal.name} className="animal-cell" style={{ color: animal.color }}>
        {animal.name}
      </td>
    ));
  }

  function tableMaker(data) {
    return (
      <table className='animal-table'>
        <caption className='table-title'>{title}</caption>
        <tbody className=''>
          {data.map((group) => (
            <tr key={group.id} className='animal-row'>
              <th className='category-cell'>{group.category}</th>
              {animalGetter(group)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      {tableMaker(data)}
    </>
  );
}

export default App;