import React, { useState } from 'react';
import './App.css';

function Wishlist() {
  // Example placeholder items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Movie',
      price: 19.99,
      image: 'https://image.com/text=Movie',
    },
    {
      id: 2,
      name: 'Book',
      price: 14.99,
      image: 'https://image.com/text=Book',
    },
  ]);

  // Remove an item from the wishlist
  const handleRemove = (id) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updated);
  };

  // Simulate adding to cart
  const handleAddToCart = (item) => {
    console.log(`Added ${item.name} to cart`);
  };

  return (
    <div className="App" style={styles.page}>
      <h1>My Wishlist</h1>
      <header />

      <div style={styles.layout}>
        <div style={styles.box}>
          {wishlistItems.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} style={styles.wishlistLine}>
                <img src={item.image} alt={item.name} style={styles.productImage} />
                <div style={styles.itemInfo}>
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <div style={styles.buttons}>
                  <button style={styles.addButton} onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                  <button style={styles.removeButton} onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    minHeight: '100vh',
  },
  layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 0 5px black',
    maxWidth: 500,
    width: '100%',
  },
  wishlistLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottom: '1px solid #eee',
    paddingBottom: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    boxShadow: '0 0 5px grey',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10,
  },
  buttons: {
    display: 'flex',
    gap: 10,
  },
  addButton: {
    padding: '5px 10px',
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 5,
    cursor: 'pointer',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
    cursor: 'pointer',
  },
};

export default Wishlist;
