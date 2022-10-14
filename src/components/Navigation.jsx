import { 
	Box,
	List, 
	ListItem, 
	ListItemButton, 
	ListItemText, 
	ListItemIcon, 
} 
from '@mui/material'
import { 
	Home, 
	Tag, 
	Restaurant, 
	Description, 
	Person, 
	Settings, 
	LunchDining, 
	Favorite 
}
from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/Authentication'
import { useLocation } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';

export const Navigation = () => {

	const [user, setUser] = useState()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const route = useLocation()


  return (
    <List sx={{ p: 1 }}>
    <Box>
      {user &&
      <ListItem
        disablePadding
        component={RouterLink}
        to='/home'
        style={{ color: 'inherit' }}     
      >
        <ListItemButton>
          <ListItemIcon>
            <Home sx={{ fontSize: 30, color: route.pathname === '/home' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText 
            primary='Home' 
            primaryTypographyProps={{
              fontSize: 20, 
              fontWeight: route.pathname === '/home' ? 'bold' : '' 
              }} 
          /> 
        </ListItemButton>
      </ListItem>
      }
      </Box>
      <ListItem 
        disablePadding
        component={RouterLink}
        to='/discover'
        style={{ color: 'inherit' }} 
      >
        <ListItemButton>
          <ListItemIcon>
            <Tag sx={{ fontSize: 30, color: route.pathname === '/discover' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText 
            primary='Discover' 
            primaryTypographyProps={{
              fontSize: 20, 
              fontWeight: route.pathname === '/discover' ? 'bold' : '' 
              }} 
          /> 
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component="a" href="#">
          <ListItemIcon>
            <LunchDining sx={{ fontSize: 30, color: route.pathname === '/ingredients' ? 'text.primary' : ''  }} />    
          </ListItemIcon>
          <ListItemText primary="Ingredients" primaryTypographyProps={{ fontSize: 20 }} />
        </ListItemButton>
      </ListItem>
      {user &&
      <ListItem disablePadding>
        <ListItemButton component="a" href="#">
          <ListItemIcon>
            <Favorite sx={{ fontSize: 30, color: route.pathname === '/favorites' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText primary="Favorites" primaryTypographyProps={{ fontSize: 20 }} />
        </ListItemButton>
      </ListItem>
       }
      <ListItem disablePadding>
        <ListItemButton component="a" href="#">
          <ListItemIcon>
            <Description sx={{ fontSize: 30, color: route.pathname === '/reviews' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText primary="Reviews" primaryTypographyProps={{ fontSize: 20 }} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component="a" href="#">
          <ListItemIcon>
            <Restaurant sx={{ fontSize: 30, color: route.pathname === '/mealplan' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText primary="Meal planning" primaryTypographyProps={{ fontSize: 20 }} />
        </ListItemButton>
      </ListItem>
      {user &&
      <>
      <ListItem disablePadding>
        <ListItemButton component="a" href="#">
          <ListItemIcon>
            <Person sx={{ fontSize: 30, color: route.pathname === '/profile' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: 20 }} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component="a" href="#">
          <ListItemIcon>
            <Settings sx={{ fontSize: 30, color: route.pathname === '/settings' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: 20 }} />
        </ListItemButton>
      </ListItem>
      </>
      }
    </List>
  )
}
