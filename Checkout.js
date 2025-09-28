// src/App.js
import React from 'react';
import './App.css';
//import footer from './footer.js';
//import header from './header.js';

function App() {
  // List of items in the user's cart
  const itemsInCart = [
    {
      id: 1,
      name: 'Game',
      price: 10.99,
      image: 'https://via.image.com/text=Game',
    },
    {
      id: 2,
      name: 'Movie',
      price: 30.99,
      image: 'https://via.image.com/text=Movie',
    },
    {
      id: 3,
      name: 'Book',
      price: 29.99,
      image: 'https://via.image.com/text=Book',
    },
  ];

  // Calculate the total price of everything in the cart
  let totalCost = 0;
for (const item of itemsInCart) {
  totalCost += item.price;
}
  // Calculate quantity of items in cart
let numberOfItems = 0;
for (const item of itemsInCart){
  numberOfItems += 1;
}

  // Placeholder for what happens when user clicks "Proceed to payment"
  const handleCheckoutClick = () => {
    // Could link to a payment screen or confirmation screen later
   
  };

  return (
    <div className="App" style={styles.page}>
      <h1>Checkout</h1>
      <header />

      <div style={styles.layout}>
        {/* Cart details displayed on  left-hand side */}
        <div style={styles.cartBox}>
          {itemsInCart.map((product) => (
            <div key={product.id} style={styles.cartLine}>
              <span>{product.name}</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
          ))}
        {/* Total price and quantity details */}
          <div style={styles.totalLine}>
            <strong>Total:</strong> ${totalCost.toFixed(2)}
            <div style={styles.itemCountBox}>{numberOfItems}</div>
          </div>
        
        {/* Payment button */}
          <button style={styles.checkoutButton} onClick={handleCheckoutClick}>
            Proceed to payment
          </button>

        </div>  

        {/* Display of images of all cart items on right-hand side */}
        <div style={styles.imageList}>
          {itemsInCart.map((product) => (
            <img key={product.id} 
            src={product.image} 
            alt={product.name} 
            style={styles.productImage}
            />
          ))}
        </div>
      </div>
    </div>
    //<footer />
  );
}

// Style definitions
const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    minHeight: '100',
  },
  layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 40,
    marginTop: 20,
  },
  cartBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    maxWidth: 400,
    boxShadow: '0 0 5px black',
    flex: 1,
  },
  cartLine: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottom: '1px solid white',
  },
  totalLine: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 15,
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    cursor: 'pointer',
  },
  imageList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    boxShadow: '0 0 5px grey',
  },
  

};

export default App;
