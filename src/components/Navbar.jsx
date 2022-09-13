import { Fastfood, Search, Settings, Logout, Person } from '@mui/icons-material'
import { AppBar, Box, InputBase, ListItemIcon, Menu, MenuItem, styled, Toolbar, Typography, alpha, Link, Divider } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import  Authentication from '../services/Authentication';
import axios from 'axios';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 64
})

const SearchBar = styled("div")(({theme})=>({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  borderRadius: 30,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  [theme.breakpoints.down(275)] : {
    display: 'none' 
  }
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  fontSize: 18,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    [theme.breakpoints.up('1150')] : {
      width: '60ch',
    },
    [theme.breakpoints.down('1150')] : {
      width: '35ch',    
    },
    [theme.breakpoints.down('950')] : {
      width: '20ch',
    },
    [theme.breakpoints.down('500')] : {
      width: '15ch',
    },
    [theme.breakpoints.down('350')] : {
      width: '8ch',
    },
  }
}))

const CustomBox = styled(Box)({
  width: 175,
  display: "flex"
})

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 26,
  fontFamily: 'Poppins',
  cursor: 'pointer',
  [theme.breakpoints.down('700')] : {
    display: 'none'  
  },
  [theme.breakpoints.up('700')] : {
    display: 'block'
  }
}))

const LogoIcon = styled(Fastfood)(({ theme }) => ({
  width: 40,
  height: 40,
  [theme.breakpoints.down('700')] : {
    display: 'block'  
  },
  [theme.breakpoints.up('700')] : {
    display: 'none'
  }
}))

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <AppBar position="sticky" sx={{height: 64}}>
      <StyledToolbar>
        <CustomBox>
          <Logo>Food Square</Logo>
          <LogoIcon/>
        </CustomBox>    
        <SearchBar>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
        </SearchBar>
        
        <CustomBox sx={{justifyContent: "flex-end"}}>
          {user ?      
          <Avatar 
            alt="picture" 
            src="/resources/OkayChamp.png" 
            sx={{width: 45, height: 45, cursor: "pointer"}}       
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          />
          :
          <Box 
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              typography: 'body1',
              '& > :not(style) + :not(style)': {
                mr: 2,
                ml: 2
              }
            }}
          >
            <Link underline='none' variant='body1' component={RouterLink} to="/register" sx={{ color: 'white' }}>Register</Link>
            <Link underline='none' variant='body1' component={RouterLink} to="/login" sx={{ color: 'white' }}>Login</Link>
          </Box>
          }
        </CustomBox>
            
      </StyledToolbar> 
      {user ?     
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}     
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
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
      : ''
      }
    </AppBar>
  )
}
