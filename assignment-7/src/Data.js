
// - Here we define a single object called book'
// - The book object has properties (title, author, etc.)
// - Each property has a name (title) and value (A Farewell to Arms)
// - We're "hard coding" the data here, but this could also come from a database or API
export const book = {
  title: 'Atomic Habbit',
  author: 'James Clear',
  published: "2018",
  image: 'https://aliabdaal.com/wp-content/uploads/2023/01/Atomic-Habits.jpg',
  width: '264',
  height: '378'
};

// - Here we have an array of objects
// - We might see this when we have multiple rows of results from our database or API
export const magazines = [
  { id: 1, title: 'Architectural Digest', theme: 'architecture', isAvailable: true },
  { id: 2, title: 'Dwell', theme: 'architecture', isAvailable: true },
  { id: 3, title: 'Communication Arts', theme: 'design', isAvailable: false },
];

export const countries = [
  { 
    id: 1,
    flag: 'red and white',
    country: 'China', 
    population: '1,415.9', 
  },
  { 
    id: 2,
    flag: 'saffron, white, green',
    country: 'India', 
    population: '1,342.3', 
  },
  { 
    id: 3,
    flag: 'white, blue, red',
    country: 'United States', 
    population: '330.9', 
  },
  { 
    id: 4,
    flag: 'red, white',
    country: 'Indonesia', 
    population: '272.2', 
  },
  { 
    id: 5,
    flag: 'white, green',
    country: 'Pakistan', 
    population: '225.1', 
  },
  { 
    id: 6,
    flag: 'white, blue, yellow, green',
    country: 'Brazil', 
    population: '213.3', 
  },
  { 
    id: 7,
    flag: 'white, green',
    country: 'Nigeria', 
    population: '211.4', 
  },
  { 
    id: 8,
    flag: 'red, green',
    country: 'Bangladesh', 
    population: '166.3', 
  },
];


