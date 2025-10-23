import React from 'react';
import './App.css';

function OrderConfirmation() {
  // Example order summary (could be passed in via props or fetched from backend)
  const orderDetails = {
    orderId: 'ORD-10293',
    items: [
      { id: 1, name: 'Game', price: 10.99 },
      { id: 2, name: 'Book', price: 29.99 },
    ],
    total: 40.98,
    date: '2025-10-23',
  };

  const handleContinueShopping = () => {
    // TODO: Navigate to browse page or home
    console.log('Returning to browse page...');
  };

  return (
    <div className="App" style={styles.page}>
      <h1>Order Confirmation</h1>
      <header />

      <div style={styles.layout}>
        <div style={styles.box}>
          <h2>Thank you for your purchase!</h2>
          <p>Your order has been successfully placed.</p>

          <div style={styles.orderDetails}>
            <div><strong>Order ID:</strong> {orderDetails.orderId}</div>
            <div><strong>Date:</strong> {orderDetails.date}</div>
          </div>

          <h3>Items Ordered:</h3>
          {orderDetails.items.map((item) => (
            <div key={item.id} style={styles.cartLine}>
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}

          <div style={styles.totalLine}>
            <strong>Total:</strong> ${orderDetails.total.toFixed(2)}
          </div>

          <button style={styles.checkoutButton} onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles reused from your format
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
    maxWidth: 400,
  },
  orderDetails: {
    marginBottom: 15,
  },
  cartLine: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eee',
    marginBottom: 5,
  },
  totalLine: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  checkoutButton: {
    marginTop: 15,
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    cursor: 'pointer',
  },
};

export default OrderConfirmation;
