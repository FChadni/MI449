import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js@2.10.0"

const supabaseUrl = 'https://sknebtnrxbgwezvkalir.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrbmVidG5yeGJnd2V6dmthbGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNDg0ODcsImV4cCI6MTk5MzcyNDQ4N30.o0jiDDmltlc6A9qNamG-Zlci4ilikqGIFdKBXK2XwgM'
const supabase = createClient(supabaseUrl, supabaseKey)


async function getBooks() {
  let { data: books, error } = await supabase
  .from('books')
  .select('*')

  if (error){
    console.log(error)
    return
  }
  for (let book of books){
    let bookList = document.getElementById('books');
    bookList.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.ISBN}</td>
        <td>${book.description}</td>
      </tr>
    `;
  }
}

getBooks();