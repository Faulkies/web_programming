import React from 'react';
import './App.css';
//import footer from './footer.js';
//import header from './header.js';

function App() {
  // TODO: Import database and test the display of items 
  const itemsInCart = [
    {
      id: 1,
      name: 'Game',
      price: 10.99,
      image: 'https://image.com/text=Game',
    },
    {
      id: 2,
      name: 'Movie',
      price: 30.99,
      image: 'https://image.com/text=Movie',
    },
    {
      id: 3,
      name: 'Book',
      price: 29.99,
      image: 'https://image.com/text=Book',
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
    // TODO: Possibly link to payment screen or confirmation screen
   
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
// Style definitions
const styles = {
  page: {
    fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#eef5ff', // matches --bg
    color: '#0f172a', // matches --text
    minHeight: '100vh',
    padding: '18px',
  },
  layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '40px',
    marginTop: '28px',
    flexWrap: 'wrap',
  },
  cartBox: {
    backgroundColor: '#fff', // matches --panel
    padding: '20px',
    borderRadius: '14px', // matches --radius
    maxWidth: 400,
    boxShadow: '0 10px 24px rgba(15,23,42,.08)', // matches --shadow
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cartLine: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    paddingBottom: '6px',
    borderBottom: '1px solid rgba(15,23,42,0.08)',
    fontSize: '15px',
    fontWeight: '500',
  },
  totalLine: {
    fontWeight: '700',
    fontSize: '16px',
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCountBox: {
    backgroundColor: '#2563eb', // matches --primary
    color: '#fff',
    borderRadius: '999px',
    padding: '2px 8px',
    fontSize: '13px',
    fontWeight: '600',
  },
  checkoutButton: {
    marginTop: '16px',
    padding: '10px 16px',
    backgroundColor: '#2563eb', // --primary
    color: '#fff',
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background 0.2s',
  },
  checkoutButtonHover: {
    backgroundColor: '#1d4ed8', // darker primary
  },
  imageList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    flex: 1,
    minWidth: '120px',
  },
  productImage: {
    width: '100%',
    maxWidth: '260px',
    height: '260px',
    borderRadius: '14px',
    objectFit: 'cover',
    boxShadow: '0 10px 24px rgba(15,23,42,.08)',
  },
};


export default App;
