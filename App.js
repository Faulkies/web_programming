import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import './App.css';
import Header from './?/Header';
import Footer from './?/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Cart from './pages/Cart';  
import Account from './pages/Account';



function App() {
  return (
    <Router>
      <Header />
    
    //content based on route (check with this one, not sure if right)
      <main style={}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}


//styling (can be made global)
const linkStyles = {
  
};

export default App;
  
