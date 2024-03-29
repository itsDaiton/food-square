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
  Tooltip,
} 
from '@mui/material';
import { 
  DarkMode,
  Login,
  Logout,  
  Person, 
  PersonAdd, 
  Settings,
} 
from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AvatarService from '../services/AvatarService'
import { getCurrentUser } from '../services/Authentication';
import { Navigation } from './Navigation';
import axios from 'axios';
import { getApiUrl } from '../services/VariablesService';

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
  const tiny = useMediaQuery(theme.breakpoints.down(500))
  const small = useMediaQuery(theme.breakpoints.down(600))

  let navigate = useNavigate()
  const route = useLocation()

  const getUserImage = () => {
    if (user) {
      axios.get(`${getApiUrl()}/api/v1/users/` + user.id).then((response) => {
        if (response.data.pathToImage !== null && response.data.pathToImage !== '') {
          axios.get(`${getApiUrl()}/` + response.data.pathToImage, { responseType: 'arraybuffer' }).then((response) => {
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

  const toLogin = () => {
    navigate('/login')
  }

  const toRegister = () => {
    navigate('/register')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    axios.post(`${getApiUrl()}/api/v1/auth/logout`, {}, { withCredentials: true })
    navigate("/login")
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
        <Box p={2} width={285} textAlign='center' role='presentation'>
          <Navigation/>
        </Box>
      </Drawer>   
        <Toolbar>
          <Box sx={{ display: 'flex', flex: '33.33%'}}>
            <IconButton sx={{ p: 0, color: 'inherit' }} onClick={handleBackToDiscover}>
              <FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            </IconButton>
            <Typography
              component="a"
              noWrap
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
          </Box>
          <Box sx={{ flex: '33.33%', justifyContent: 'center', display: { xs: 'flex', md: 'none' }}}>
            <Box display='flex' alignItems='center' justifyContent='center'>
              <FastfoodIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              {!tiny &&
              <Typography
                component="a"
                noWrap
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
              }
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flex: '33.33%', justifyContent: 'right'}}>
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
              justifyContent: 'right'
            }}>
              {!small ? 
              <Box>
                <Link underline='none' variant='body1' component={RouterLink} to="/register" sx={{ color: 'white', mr: 1, ml: 1 }}>Register</Link>
                <Link underline='none' variant='body1' component={RouterLink} to="/login" sx={{ color: 'white', mr: 1, ml: 1 }}>Login</Link>
              </Box>
              :
              <Box>
                <Tooltip title='Register'>
                  <IconButton sx={{ p: 0, color: 'inherit', ml: 1, mr: 1 }} onClick={toRegister}>
                    <PersonAdd/>
                  </IconButton>
                </Tooltip>
                <Tooltip title='Login'>
                  <IconButton sx={{ p: 0, color: 'inherit', ml: 1, mr: 1 }} onClick={toLogin}>
                    <Login/>
                  </IconButton>
                </Tooltip>
              </Box>
              }
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
      </AppBar>
  )
}