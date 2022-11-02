import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Badge, 
  Divider, 
  Drawer, 
  Link, 
  ListItemIcon, 
  styled, 
  Switch,
  Avatar,
  Container,
  Typography,
  IconButton,
  Toolbar,
  MenuItem,
  Menu,
  Box,
  AppBar,
  Skeleton,
  useMediaQuery,
  useTheme,
} 
from '@mui/material';
import { 
  DarkMode,
  Logout,  
  Person, 
  Settings,
} 
from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AvatarService from '../services/AvatarService'
import { getCurrentUser } from '../services/Authentication';
import { Navigation } from './Navigation';
import axios from 'axios';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  }
}));

export const Navbar = ({ mode, setMode }) => {
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [user, setUser] = useState(localStorage.getItem('user') ? getCurrentUser : null)
  const [userImage, setUserImage] = useState()
  const [loading, setLoading] = useState(true)

  const [openDrawer, setOpenDrawer] = useState(false)

  const theme = useTheme()
  const tiny = useMediaQuery(theme.breakpoints.down(350))

  let navigate = useNavigate()
  const route = useLocation()

  const getUserImage = () => {
    if (user) {
      axios.get('http://localhost:8080/api/v1/users/' + user.id).then((response) => {
        if (response.data.pathToImage !== null && response.data.pathToImage !== '') {
          axios.get('http://localhost:8080/' + response.data.pathToImage, { responseType: 'arraybuffer' }).then((response) => {
            var imageUrl = URL.createObjectURL(new Blob([response.data]))
            setUserImage(imageUrl)
          })
        }
        setLoading(false)
      }).catch(error => {
        navigate('/error')
      })
    }
  }

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  useEffect(() => {
    getUserImage()

    const interval = setInterval(() => {
      getUserImage()
    }, 10000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  const handleBackToDiscover = () => {
    if (route.pathname !== '/discover') {
      navigate('/discover')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    axios.post('http://localhost:8080/api/v1/auth/logout', {}, {withCredentials: true}).then((response) => {
      navigate("/login")
    })
  }

  const navigateProfile = () => {
    navigate('/user/' + user.id)
  }

  const navigateSettings = () => {
    navigate('/settings')
  }

  return (
    <AppBar position="sticky">
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor='left'
      >
        <Box p={2} width={250} textAlign='center' role='presentation'>
          <Navigation/>
        </Box>
      </Drawer>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Box display='flex' alignItems='center'>
            <IconButton sx={{ p: 0, color: 'inherit' }} onClick={handleBackToDiscover}>
            <FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            </IconButton>
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
              onClick={() => setOpenDrawer(true)}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon sx={{ width: 40, height: 40 }}/>
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
            {tiny ? '' : 'Food Square'}
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
              {loading ?
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
              :
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {
                  userImage ?
                  <Avatar src={userImage}/>     
                  :
                  <Avatar {...AvatarService.stringAvatar(user.username)}/>
                  }
                </IconButton>
              </StyledBadge>
              }
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
              <MenuItem sx={{ pointerEvents: 'none', fontWeight: 'bold'}}>
                {user.username}
              </MenuItem>
              <Divider/>
              <MenuItem onClick={navigateProfile}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={navigateSettings}>
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
              <Divider/>
              <MenuItem>
                <ListItemIcon>
                  <DarkMode fontSize="small" />
                </ListItemIcon>
                <Switch checked={mode === 'dark' ? true : false} onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')}/>
              </MenuItem>
            </Menu>
            : '' }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}