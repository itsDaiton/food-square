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
  Favorite }
from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/Authentication'
import { useLocation } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';

export const Leftbar = () => {

  const [user, setUser] = useState()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const route = useLocation()

  return (
    <Box
      flex={2}
      p={0}
      sx={{ display: { xs: "none", md: "block"} }}  
    >
      <Box sx={{ position: 'fixed' }}>

        <List sx={{ p: 1 }}>
          <Box>
            <ListItem
              disablePadding
              component={RouterLink}
              to='/home'
              style={{ color: 'inherit' }}     
            >
              <ListItemButton>
                <ListItemIcon>
                  <Home sx={{ fontSize: 30 }} />
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
            </Box>
            <ListItem 
              disablePadding
              component={RouterLink}
              to='/discover'
              style={{ color: 'inherit' }} 
            >
              <ListItemButton>
                <ListItemIcon>
                  <Tag sx={{ fontSize: 30 }} />
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
                  <LunchDining sx={{ fontSize: 30 }} />    
                </ListItemIcon>
                <ListItemText primary="Ingredients" primaryTypographyProps={{ fontSize: 20 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Favorite sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Favorites" primaryTypographyProps={{ fontSize: 20 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Description sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Reviews" primaryTypographyProps={{ fontSize: 20 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Restaurant sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Meal planning" primaryTypographyProps={{ fontSize: 20 }} />
              </ListItemButton>
            </ListItem>
            {user &&
            <>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Person sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: 20 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Settings sx={{ fontSize: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: 20 }} />
              </ListItemButton>
            </ListItem>
            </>
            }
          </List>
      </Box>                
    </Box>
  )
}
