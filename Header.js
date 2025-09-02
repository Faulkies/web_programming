import React from 'react';
import 

  function Header(){
    return(
      <input type = "text" id = "searhInput" placeholder = "Search books, authors and genres">
      
      <nav style = {}>
        <Link to = "/" style = {}> Home </Link>
        <Link to = "/browse" style = {}> Browse </Link>
        <Link to = "/cart" style = {}> Cart </Link>
        <Link to = "/account" style = {}> Account </Link>
      </nav>
    );
  }

export default Header;
