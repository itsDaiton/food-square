import { Fastfood, Search, Settings, Logout, Person } from '@mui/icons-material'
import { AppBar, Box, InputBase, ListItemIcon, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
})

const SearchBar = styled("div")(({theme})=>({
  position: 'relative',
  borderRadius: 30,
  backgroundColor: "white",
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
  color: 'black',
  fontSize: 18,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    [theme.breakpoints.up('1150')] : {
      width: '70ch',
    },
    [theme.breakpoints.down('1150')] : {
      width: '50ch',    
    },
    [theme.breakpoints.down('950')] : {
      width: '25ch',
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

  return (
    <AppBar position="sticky" bgcolor={'background.default'}>
      <StyledToolbar>
        <CustomBox>
          <Logo variant='p'>Food Square</Logo>
          <LogoIcon/>
        </CustomBox>       
        <SearchBar>
            <SearchIconWrapper>
              <Search sx={{color: "black"}} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
        </SearchBar>
        <CustomBox sx={{justifyContent: "flex-end"}}>
          <Avatar 
            alt="picture" 
            src="/resources/OkayChamp.png" 
            sx={{width: 45, height: 45, cursor: "pointer"}}       
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          />
        </CustomBox>              
      </StyledToolbar>      
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
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  )
}
