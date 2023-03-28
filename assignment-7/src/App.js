// import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
// import {book} from "./Data";
// import {magazines} from "./Data";
import {countries} from "./Data";

// - React applications are built out of components
// - Components are JavaScript functions that return markup (JSX)
// - Components are UI elements that have their own logic and appearance
// - React Components always start with a capital letter
// - In this example, we could use the JSX markup <Bookshelf /> to display our component
// function Bookshelf(){
//   return (
//     <div>
//       <h2>{book.title} ({book.published})</h2>
//       <p>{book.author}</p>
//       {book.image && 
//         <img 
//           className="bookCover" src={book.image} alt={book.title + ' cover'} 
//           style={{ width: book.width, height: book.height}}
//         />
//       }
//     </div>
//   );
// }

// - This component displays the list of magazines
// - Because we're reading and displaying multiple objects, we need to use the .map method
// - magazines.map _maps_ each array item to the zine object until there are no more objects to map (it loops)
// - We then display properties from zine object in each iteration
// function ZineRack() {
//   const listZines = magazines.map(zine =>
//     <li key={zine.id} style={{color: zine.isAvailable ? 'green' : 'red'}}>
//       {zine.title}
//     </li>
//   );
//   return (
//     <ul>{listZines}</ul>
//   )
// }

// function MagicButton(){
//   return (
//     <div>
//       <h3>This is a magic button</h3>
//       <button>Magic</button>
//     </div>
//   );
// }


// Component 1
function ChangeColor() {
  const [color, setColor] = useState('green')

  function handleClick() {
    const colors = ['red', 'blue', 'green','yellow'];
    const ranColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(ranColor)
  }

  return (
    <div style={{ backgroundColor: color, width: '300px', height:'100px', cursor: 'pointer' }} onClick={handleClick}>
      <h1 style={{ fontSize: '32px', textAlign:'center'}}>Click for Magic</h1>
    </div>
  )
}


// Component 2
function PopulatedCountries() {
  return(
    <div>
      <table style={{ border: '1px solid white', margin: '8px', textAlign: 'left'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Flag Colors</th>
            <th>Country</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.flag}</td>
              <td>{item.country}</td>
              <td>{item.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Component 3 with conditional 
function Add() {
  const worldPop = 7888;
  const totalPop = countries.reduce((i, cur) => {
    const num = Number(cur.population.replace(/,/g, ''));
    return i + num;
  }, 0);
  const ratio = ((totalPop/worldPop) * 100).toFixed(2);
  return(
    <div>
      <p>Total Population of the 8 most Populated Countries are: {totalPop.toLocaleString()}</p>
      {totalPop < worldPop && <p>The Population is less than {worldPop}</p>}
      <p>The ratio is {ratio} %</p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChangeColor/>
        <PopulatedCountries/>
        <Add/>
      </header>
    </div>
  );
}

export default App;
