import { 
	Box,
	List, 
	ListItem, 
	ListItemButton, 
	ListItemText, 
	ListItemIcon,
  useTheme, 
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
	Favorite,
}
from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/Authentication'
import { useLocation } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';

const CustomListItemButton = styled(ListItemButton)({
  borderRadius: 50
})

const CustomListItem = styled(ListItem)({
  borderRadius: 50
})

export const Navigation = () => {

  const theme = useTheme()

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
      <CustomListItem
        sx={{ background: route.pathname === '/home' ? alpha(theme.palette.primary.main, 0.2)  : '' }}
        disablePadding
        component={RouterLink}
        to='/home'
        style={{ color: 'inherit' }}     
      >
        <CustomListItemButton>
          <ListItemIcon>
            <Home sx={{ fontSize: 30, color: route.pathname === '/home' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText 
            primary='Home' 
            primaryTypographyProps={{
              fontSize: 20, 
              fontWeight: route.pathname === '/home' ? 'bold' : '' }} 
          /> 
        </CustomListItemButton>
      </CustomListItem>
      }
      </Box>
      <CustomListItem
        sx={{ background: route.pathname === '/discover' ? alpha(theme.palette.primary.main, 0.2)  : ''}}
        disablePadding
        component={RouterLink}
        to='/discover'
        style={{ color: 'inherit' }} 
      >
        <CustomListItemButton>
          <ListItemIcon>
            <Tag sx={{ fontSize: 30, color: route.pathname === '/discover' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText 
            primary='Discover' 
            primaryTypographyProps={{
              fontSize: 20, 
              fontWeight: route.pathname === '/discover' ? 'bold' : '' }} 
          /> 
        </CustomListItemButton>
      </CustomListItem>
      {user &&
      <CustomListItem
        sx={{ background: route.pathname === '/favorites' ? alpha(theme.palette.primary.main, 0.2)  : ''}}
        disablePadding
        component={RouterLink}
        to='/favorites'
        style={{ color: 'inherit' }}
      >
        <CustomListItemButton>
          <ListItemIcon>
            <Favorite sx={{ fontSize: 30, color: route.pathname === '/favorites' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText 
            primary="Favorites" 
            primaryTypographyProps={{ 
              fontSize: 20,
              fontWeight: route.pathname === '/favorites' ? 'bold' : '' }} 
          />
        </CustomListItemButton>
      </CustomListItem>
       }
      <CustomListItem
        sx={{ background: route.pathname === '/ingredients' ? alpha(theme.palette.primary.main, 0.2)  : ''}}
        disablePadding
        component={RouterLink}
        to='/ingredients'
        style={{ color: 'inherit' }}
      >
        <CustomListItemButton>
          <ListItemIcon>
            <LunchDining sx={{ fontSize: 30, color: route.pathname === '/ingredients' ? 'text.primary' : ''  }} />    
          </ListItemIcon>
          <ListItemText
            primary="Ingredients" 
            primaryTypographyProps={{
              fontSize: 20, 
              fontWeight: route.pathname === '/ingredients' ? 'bold' : '' }} 
          />
        </CustomListItemButton>
      </CustomListItem>
      <CustomListItem 
        sx={{ background: route.pathname === '/reviews' ? alpha(theme.palette.primary.main, 0.2)  : ''}}
        disablePadding
        component={RouterLink}
        to='/reviews'
        style={{ color: 'inherit' }}
      >
        <CustomListItemButton>
          <ListItemIcon>
            <Description sx={{ fontSize: 30, color: route.pathname === '/reviews' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText 
            primary="Reviews" 
            primaryTypographyProps={{
              fontSize: 20, 
              fontWeight: route.pathname === '/reviews' ? 'bold' : '' }} 
          />
        </CustomListItemButton>
      </CustomListItem>
      <ListItem disablePadding>
        <CustomListItemButton>
          <ListItemIcon>
            <Restaurant sx={{ fontSize: 30, color: route.pathname === '/mealplan' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText primary="Meal planning" primaryTypographyProps={{ fontSize: 20 }} />
        </CustomListItemButton>
      </ListItem>
      {user &&
      <>
      <CustomListItem 
        sx={{ background: route.pathname === '/user/' + user.id ? alpha(theme.palette.primary.main, 0.2)  : ''}}
        disablePadding
        component={RouterLink}
        to={'/user/' + user.id}
        style={{ color: 'inherit' }}
      >
        <CustomListItemButton>
          <ListItemIcon>
            <Person sx={{ fontSize: 30, color: route.pathname === '/user/' + user.id ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText 
            primary="Profile" 
            primaryTypographyProps={{
              fontSize: 20, 
              fontWeight: route.pathname === '/user/' + user.id ? 'bold' : '' }} 
          />
        </CustomListItemButton>
      </CustomListItem>
      <CustomListItem
        sx={{ background: route.pathname === '/settings' ? alpha(theme.palette.primary.main, 0.2)  : '' }}
        disablePadding
        component={RouterLink}
        to='/settings'
        style={{ color: 'inherit' }}       
      >
        <CustomListItemButton>
          <ListItemIcon>
            <Settings sx={{ fontSize: 30, color: route.pathname === '/settings' ? 'text.primary' : ''  }} />
          </ListItemIcon>
          <ListItemText 
            primary="Settings" 
            primaryTypographyProps={{
              fontSize: 20, 
              fontWeight: route.pathname === '/settings' ? 'bold' : '' }}  
          />
        </CustomListItemButton>
      </CustomListItem>
      </>
      }
    </List>
  )
}
