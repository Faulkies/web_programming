// Header.js 
import React,    {    useState }   from 'react'
import {   Box ,   InputBase , Typography ,  IconButton  } from '@mui/material'
import SearchIcon  from '@mui/icons-material/Search'
import {   useNavigate  }   from 'react-router-dom'

const Header = () => {
    // keeping track of what the user is typing in the search bar
    const [ userInput , setUserInput ] =   useState('')
    const goTo =   useNavigate( )

    // when user hits Enter or clicks search icon -> go to results page
    const handleSearch   = ( event )   => {
        const pressedEnterKey   = event.key   ===   'Enter'
        const clickedSearchBtn =   event.type=== 'click'

        if( pressedEnterKey   || clickedSearchBtn ){
            if( !userInput.trim( ) ) return    // don’t search for empty strings
            goTo( `/search?q=${ encodeURIComponent(userInput) }` )
        }
    }

    return(
        <Box
            sx={{
                display : 'flex' ,
                alignItems:'center' ,
                padding:'12px   20px',
                borderBottom:'1px solid #ddd' ,
                backgroundColor:'#fafafa',
            }}
        >
            {/* site title / logo area */}
            <Typography variant='h6'  sx={{ marginRight:'20px' , fontWeight:600 }}>
                MyLibrary
            </Typography>

            {/* input where user types their search query */}
            <InputBase
                value ={ userInput }
                onChange={(e)=> setUserInput(e.target.value)}
                onKeyDown={  handleSearch }
                placeholder ="Search for books, games, or movies..." 
                sx={{
                    flex:1,
                    backgroundColor:'#fff',
                    border:'1px solid #ccc',
                    padding:'6px  10px',
                    borderRadius:'4px'
                }}
            />

            {/* search button */}
            <IconButton onClick={handleSearch}   sx={{marginLeft:'8px'}}>
                <SearchIcon   />
            </IconButton>
        </Box>
    )
}

export default Header;
