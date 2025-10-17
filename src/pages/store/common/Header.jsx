//Kien and Max

import { useState } from 'react';
import {
  AppBar, Toolbar, Container, Typography, Button, IconButton,
  Menu, MenuItem, TextField, InputAdornment, Stack, Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

export default function Header({ query, onQuery }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ width: '100%' }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 700}}
            >
              Entertainment Guild
            </Typography>

            {/* Primary nav */}
            <Box component="nav" aria-label="Primary">
              <Stack direction="row" spacing={1}>
                <Button color="inherit" component={Link} to="/Browse" underline="none">
                  Browse
                </Button>
                <Button color="inherit" component={Link} to="/Search" underline="none">
                  Search
                </Button>
                <Button color="inherit" component={Link} to="/Help" underline="none">
                  Help
                </Button>
              </Stack>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            {/* Search bar */}
            <TextField
              size="small"
              aria-label="Search"
              placeholder="Search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              sx={{ width: { xs: 200, sm: 280, md: 360 } }}
              
            />

            {/* Profile/menu */}
            <IconButton
              edge="end"
              aria-label="Open profile"
              aria-haspopup="menu"
              aria-controls={menuOpen ? 'profile-menu' : undefined}
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleMenuClick}
              sx={{ ml: 1 }}
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              keepMounted
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem component={Link} to="/Login" onClick={handleMenuClose}>
                Login
              </MenuItem>
              <MenuItem component={Link} to="/Profile" onClick={handleMenuClose}>
                Profile
              </MenuItem>
              <MenuItem component={Link} to="/Profile/Orders" onClick={handleMenuClose}>
                Orders
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
