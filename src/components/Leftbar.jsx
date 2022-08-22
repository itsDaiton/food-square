import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Switch } from '@mui/material'
import { Home, Tag, Restaurant, Description, Forum, Person, Settings, DarkMode } from '@mui/icons-material'
import React from 'react'

export const Leftbar = ({ mode, setMode }) => {
  return (
    <Box
      flex={2}
      p={2}
      sx={{ display: { xs: "none", sm: "block"} }}         
    >
      <Box position='fixed' /*boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px;'*/>
        <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
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
