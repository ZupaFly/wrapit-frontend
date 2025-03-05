import { useState } from 'react';
import './App.css';

export const App = () => {
  const [world, setWorld] = useState('world');
  const [counts, setCounts] = useState({
    sex: 0,
    drugs: 0,
    rock: 0,
  });

  const clickHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = event.currentTarget.textContent || '';
    
    if (buttonText === 'X') {
      setCounts({ sex: 0, drugs: 0, rock: 0 });
      setWorld('world');
      return;
    }
    
    setWorld(buttonText);
    
    setCounts((prevCounts) => {
      switch (buttonText) {
        case 'Sex':
          return { ...prevCounts, sex: prevCounts.sex + 1 };
        case 'Drugs':
          return { ...prevCounts, drugs: prevCounts.drugs + 1 };
        case 'Rock n Roll':
          return { ...prevCounts, rock: prevCounts.rock + 1 };
        default:
          return prevCounts;
      }
    });
  };

  return (
    <>
      <div className="hello">Hello {world}!</div>
      <div className="container">
        <div className="buttonContainer">
          <button className="block" onClick={clickHandle}>Sex</button>
          <button className="block" onClick={clickHandle}>Drugs</button>
          <button className="block" onClick={clickHandle}>Rock n Roll</button>
          <button className="block" onClick={clickHandle}>X</button>
          <button className='block' onClick={clickHandle}>Zoic</button>
        </div>

        <div className="counterContainer">
          <div className="count">{counts.sex}</div>
          <div className="count">{counts.drugs}</div>
          <div className="count">{counts.rock}</div>
        </div>
      </div>
    </>
  );
}
