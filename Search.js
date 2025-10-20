import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchResults from './SearchResults';

function App() {
  // Simulated data representing items that could be pulled from a database later
  const itemsInCart = [
    { id: 1, name: 'Game', price: 10.99, image: 'https://image.com/text=Game' },
    { id: 2, name: 'Movie', price: 30.99, image: 'https://image.com/text=Movie' },
    { id: 3, name: 'Book', price: 29.99, image: 'https://image.com/text=Book' },
  ];

  // Calculating total price manually - more readable than using reduce for beginners
  let totalCost = 0;
  itemsInCart.forEach(item => {
    totalCost += item.price;
  });

  // Count number of items
  const numberOfItems = itemsInCart.length;

  const handleCheckoutClick = () => {
    // Placeholder for payment link or confirmation page
    alert('Redirecting to payment page soon...');
  };

  return (
    <Router>
      <div className="App" style={styles.page}>
        <header style={styles.header}>
          <h1>Buy Books, Games & Movies</h1>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/search" style={styles.navLink}>Search</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <div style={styles.layout}>
              <div style={styles.cartBox}>
                <h2>Your Cart</h2>
                {itemsInCart.map(product => (
                  <div key={product.id} style={styles.cartLine}>
                    <span>{product.name}</span>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                ))}

                <div style={styles.totalLine}>
                  <strong>Total:</strong> ${totalCost.toFixed(2)}
                  <div style={styles.itemCountBox}>{numberOfItems}</div>
                </div>

                <button style={styles.checkoutButton} onClick={handleCheckoutClick}>
                  Proceed to checkout
                </button>
              </div>

              <div style={styles.imageList}>
                {itemsInCart.map(product => (
                  <img
                    key={product.id}
                    src={product.image}
                    alt={product.name}
                    style={styles.productImage}
                  />
                ))}
              </div>
            </div>
          } />

          {/* Search results page route */}
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

// Basic search results page component
function SearchResults() {
  // Example of user input; you would connect this to a real search bar and database
  const fakeResults = [
    { id: 1, name: 'Book', price: 19.99 },
    { id: 2, name: 'Game', price: 59.99 },
    { id: 3, name: 'Movie', price: 14.99 }
  ];

  return (
    <div style={styles.searchPage}>
      <h2>Search Results</h2>
      <p>Showing results for your query:</p>
      {fakeResults.length > 0 ? (
        fakeResults.map(item => (
          <div key={item.id} style={styles.searchItem}>
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

// Styles for readability and simplicity
const styles = {
  page:{fontFamily:'Arial,
         sans-serif', 
         padding: 20, 
         minHeight: '100vh'},
  
  header:{display:'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', marginBottom: 20 },
  nav: { display: 'flex', gap: 15 },
  
  navLink: { textDecoration: 'none', 
            color: 'blue', 
            fontWeight: 'bold' },
  layout: { display: 'flex', 
           justifyContent: 'center', 
           gap: 40 },
  
  cartBox: { padding: 20, 
            borderRadius: 8, 
            maxWidth: 400, 
            boxShadow: '0 0 5px', 
            flex: 1 },
  
  cartLine: { display: 'flex', 
             justifyContent: 'space-between', 
             marginBottom: 10 },
  
  totalLine: { marginTop: 20 },
  
  checkoutButton: { padding: '10px 20px', 
                   backgroundColor: 'blue', 
                   color: 'white', 
                   border: 'none', 
                   borderRadius: 5, 
                   cursor: 'pointer' },
  
  imageList: { display: 'flex', 
              flexDirection: 'column', 
              gap: 10 },
  
  productImage: { width: 100, 
                 height: 100, borderRadius: 8, 
                 boxShadow: '0 0 5px grey' },
  
  itemCountBox: { padding: '2px 6px', 
                 borderRadius: '50%', 
                 marginLeft: 10, 
                 display: 'inline-block' },
  
  searchPage: { padding: 20, borderRadius: 8, 
               boxShadow: '0 0 5px #bbb' },
  
  searchItem: { display: 'flex', 
               justifyContent: 'space-between', 
               padding: '10px 0', 
               borderBottom: '1px solid' }
};

export default App;

// SearchResults.js, used as a search bar for the header on all pages
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SearchResults({ allProducts }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';

  // Filter products based on search term (case-insensitive)
  const filteredResults = allProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Local state for sorting or future features
  const [sortOption, setSortOption] = useState('default');

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // TODO: Sorting
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortOption === 'price-low-high') return a.price - b.price;
    if (sortOption === 'price-high-low') return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Results for: "{searchTerm}"</h2>

      {/* If no results found */}
      {sortedResults.length === 0 ? (
        <p>No matches found. Try using a different keyword.</p>
      ) : (
        <>
          

          {/* List of search results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sortedResults.map((product) => (
              <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', boxShadow: '0 0 5px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{product.name}</h3>
                  <p style={{ margin: '5px 0' }}>${product.price.toFixed(2)}</p>
                </div>
                <img src={product.image}, alt={product.name}, style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}/>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop: '20px' }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default SearchResults;
