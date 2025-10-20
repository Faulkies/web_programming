// Footer.js
// little footer at the bottom of every page
// nothing fancy, just some links and copyright stuff

import React from 'react'

const Footer = () => {

    const yearNow  =  new Date().getFullYear()  // current year for copyright

    // styling for individual links
    const linkStyle  =  {
        marginRight:'12px',
        color:'#555',
        textDecoration:'none',
        fontSize:'0.9rem'
    }

    // container styling
    const footerWrap  =  {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'18px 10px',
        backgroundColor:'#f7f7f7',
        borderTop:'1px solid #ddd',
        flexWrap:'wrap'
    }

    const copyStyle  =  {
        width:'100%',
        textAlign:'center',
        marginTop:'10px',
        color:'#888',
        fontSize:'0.85rem'
    }

    return (
        <footer style={footerWrap}>
            
            {/* some quick links, I might add more later */}
            <div>
                <a href="https://bookstore.com" style={linkStyle}>Bookstore</a>
                <a href="https://facebook.com/bookstore" style={linkStyle}>Facebook</a>
                <a href="https://instagram.com/bookstore" style={linkStyle}>Instagram</a>
                <a href="https://twitter.com/bookstore" style={linkStyle}>Twitter</a>
            </div>

            {/* copyright notice */}
            <p style={copyStyle}>
                &copy; {yearNow} Bookstore. All rights reserved.  
                {/* yeah I know it’s standard, but it’s needed */}
            </p>

        </footer>
    )
}

export default Footer
