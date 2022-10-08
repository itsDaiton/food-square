import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useState, useEffect } from 'react';
import Authentication from '../services/Authentication';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Badge, Divider, Link, ListItemIcon, styled } from '@mui/material';
import axios from 'axios';
import { Logout, Person, Settings } from '@mui/icons-material';
import AvatarService from '../services/AvatarService'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  }
}));

export const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [user, setUser] = useState()

  let navigate = useNavigate()

  useEffect(() => {
    const currentUser = Authentication.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    axios.post('http://localhost:8080/api/v1/auth/logout', {}, {withCredentials: true}).then((response) => {
      console.log(response.data)
      navigate("/login")
    })

  }

  return (
    <AppBar position="sticky">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Box display='flex' alignItems='center'>
            <FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
            <Typography
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                fontSize: 24,
                textDecoration: 'none',
              }}
            >
              Food Square
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <FastfoodIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              fontSize: 24,
              textDecoration: 'none',
            }}
          >
            Food Square
          </Typography>
          <Box 
          sx={{ 
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
          }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ?
            <Box display='flex' alignItems='center'>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...AvatarService.stringAvatar(user.username)}/>
                </IconButton>
              </StyledBadge>
            </Box>
            :
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              typography: 'body1',
              '& > :not(style) + :not(style)': {
                mr: 2,
                ml: 2
              }
            }}>
              <Link underline='none' variant='body1' component={RouterLink} to="/register" sx={{ color: 'white' }}>Register</Link>
              <Link underline='none' variant='body1' component={RouterLink} to="/login" sx={{ color: 'white' }}>Login</Link>   
            </Box>       
            }
            {user ?
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem sx={{ pointerEvents: 'none', justifyContent: 'center' }}>
                {user.username}
              </MenuItem>
              <Divider/>
              <MenuItem>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            : '' }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}