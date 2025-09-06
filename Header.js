import React, { useState } from 'react';
import { AppBar, Toolbar, InputBase, IconButton, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log("Search for:", query);
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Book Search</Typography>
 
          <InputBase
            placeholder="Search books, authors and genres"
            inputProps={{ 'aria-label': 'search' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton onClick={handleSearch} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
