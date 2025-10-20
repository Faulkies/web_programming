// SearchResults.js
// ok so this page shows whatever comes up when someone searches from the header lol
// it’s not perfect yet but it works :)

import React, { useState }   from   'react'
import { Link, useLocation } from 'react-router-dom'

function SearchResults( { allProducts } ) {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searchWord = query.get('q') || ''   // what they typed in search bar

    // just filtering stuff, nothing too fancy rn
    const searchMatches = allProducts.filter(item => {
        if(!item?.name) return false
        return item.name.toLowerCase().includes(searchWord.toLowerCase())
    })

    // might use later for sorting stuff
    const [ sortByChoice , setSortByChoice ] = useState('default')

    const handleSortChange = (e) => {
        setSortByChoice(e.target.value)
        // console.log("sorting by -> ", e.target.value) // keeping this in case I break it later lol
    }

    // kinda sloppy sorting but it works
    const sortedStuff = [...searchMatches].sort((a,b)=>{
        if(sortByChoice === 'price-low-high') return a.price - b.price
        if(sortByChoice === 'price-high-low') return b.price - a.price
        return 0
    })

    return (
        <div style={{ padding:'20px' }}>
            <h2>Results for: "{ searchWord }"</h2>

            {sortedStuff.length === 0 ? (
                <p>hmm… nothing came up. maybe try another word?</p>
            ) : (
                <>
                    {/* show each product */}
                    <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                        {sortedStuff.map(product => (
                            <div 
                              key={product.id}
                              style={{
                                  display:'flex',
                                  justifyContent:'space-between',
                                  padding:'10px',
                                  boxShadow:'0 0 4px rgba(0,0,0,0.1)',
                                  borderRadius:'6px'
                              }}
                            >
                                <div>
                                    <h3 style={{ margin:0 }}>{ product.name }</h3>
                                    <p style={{ margin:'5px 0' }}>${product.price?.toFixed(2)}</p>
                                </div>

                                <img 
                                  src={product.image}
                                  alt={product.name}
                                  style={{
                                      width:'60px',
                                      height:'60px',
                                      objectFit:'cover',
                                      borderRadius:'5px'
                                  }}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div style={{ marginTop:'20px' }}>
                <Link to="/">← go back home</Link>
            </div>
        </div>
    )
}

export default SearchResults
