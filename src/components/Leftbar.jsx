import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Switch } from '@mui/material'
import { Home, Tag, Restaurant, Description, Forum, Person, Settings, DarkMode } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import Authentication from '../services/Authentication'

export const Leftbar = ({ mode, setMode }) => {

  const [user, setUser] = useState()

  useEffect(() => {
    const currentUser = Authentication.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])


  return (
    <Box
      flex={2}
      p={0}
      sx={{ display: { xs: "none", sm: "block"} }}         
    >
      <Box sx={{ position: 'fixed' }}>
        <List sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Tag />
                </ListItemIcon>
                <ListItemText primary="Discover" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Restaurant />
                </ListItemIcon>
                <ListItemText primary="Recipes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Forum />
                </ListItemIcon>
                <ListItemText primary="Threads" />
              </ListItemButton>
            </ListItem>
            {user &&
            <>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            </>
            }
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DarkMode />
                </ListItemIcon>
                <Switch onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')}/>
              </ListItemButton>
            </ListItem>
          </List>
      </Box>      
    </Box>
  )
}
