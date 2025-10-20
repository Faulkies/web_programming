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
