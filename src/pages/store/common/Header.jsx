// Kien and Max
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';
import {
  AppBar, Toolbar, Container, Typography, Button, IconButton,
  Menu, MenuItem, TextField, Stack, Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/SessionSlice";
import CartButton from '../cart/CartButton';

export default function Header({ query, onQuery }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.session);

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    dispatch(logout());
    handleMenuClose();
  };
  const location = useLocation();
  const showBackButton = location.pathname !== "/";
  console.log(showBackButton);
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
      <Toolbar disableGutters sx={{ minHeight: 72, position: 'relative' }}>
        {/* Back button pinned absolutely to the far left */}
        {showBackButton && (
          <Box
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <BackButton fallback="/" />
          </Box>
        )}



        {/* Everything else stays centered in the container */}
        <Container maxWidth="lg">
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
              sx={{ fontWeight: 700 }}
            >
              Entertainment Guild
            </Typography>

            {/* Primary navigation */}
            <Box component="nav" aria-label="Primary">
              <Stack direction="row" spacing={1}>
                <Button color="inherit" component={Link} to="/">
                  Browse
                </Button>
                <Button color="inherit" component={Link} to="/Search">
                  Search
                </Button>
                <Button color="inherit" component={Link} to="/Help">
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
              InputProps={{
                endAdornment: (
                  <SearchIcon color="action" />
                ),
              }}
            />

            {/* Cart */}
            <CartButton />

            {/* Profile / user menu */}
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
              {/* Only show Login if not logged in */}
              {!loggedIn && (
                <MenuItem component={Link} to="/Login" onClick={handleMenuClose}>
                  Login
                </MenuItem>
              )}

              {/* Only show Profile + Orders if logged in */}
              {loggedIn && (
                <>
                  <MenuItem component={Link} to="/Profile" onClick={handleMenuClose}>
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/Profile/Orders" onClick={handleMenuClose}>
                    Orders
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </>
              )}
            </Menu>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
