import React, {useState} from 'react';
import {InputBase, IconButton, Typography} from '@mui/material';

const Header = () => {
  //used for user input
  const [query, setQuery] = useState('');
  };

  return (
        <Typography variant="h6">Book Search</Typography>
 //take input from user and sets the value of query to the user input
          <InputBase
            placeholder="Search books, authors and genres" //placeholder text
            inputProps={{'aria-label':'search'}}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ml:1,flex: 1}} //spacing
          />
  );
};

export default Header;
