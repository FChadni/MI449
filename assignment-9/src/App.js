import React, {useState} from 'react';
import { supabase } from './supabaseClient';
import './App.css';
// import {book} from "./Data";
// import {magazines} from "./Data";
// import {countries} from "./Data";



// Component 1
// function ChangeColor() {
//   const [color, setColor] = useState('green')

//   function handleClick() {
//     const colors = ['red', 'blue', 'green','yellow'];
//     const ranColor = colors[Math.floor(Math.random() * colors.length)];
//     setColor(ranColor)
//   }

//   return (
//     <div style={{ backgroundColor: color, width: '300px', height:'100px', cursor: 'pointer' }} onClick={handleClick}>
//       <h1 style={{ fontSize: '32px', textAlign:'center', color:'black'}}>Magic {color}</h1>
//     </div>
//   )
// }

// function MagicButton() {
//   const [count, setCount] = useState(0);

//   function doMagic() {
//     setCount(count + 1);
//   }

//   return (
//     <>
//       <h3>This is magic button</h3>
//       <button onClick={doMagic}>Magic {count}</button>
//     </>
//   );
// }

// Compoenent Library
function Library() {
  const [myBook, setMyBook] = useState([]);

  async function getBooks() {
    let { data: books, error } = await supabase
      .from('books')
      .select('*')
    setMyBook(books);
  }
  // getBooks();

  return (
    <div>
      <button onClick={getBooks} className='loadButton'>Click to Load books</button>
      <table className='bookTable'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {myBook.map( book => (
            <tr>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.ISBN}</td>
              <td>{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Library/>
      </header>
    </div>
  );
}

export default App;
