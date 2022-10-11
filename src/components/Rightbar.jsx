import { 
  Box,
  Typography,
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  styled, 
  IconButton, 
  Button,
  CircularProgress,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getCurrentUser } from '../services/Authentication'
import AvatarService from '../services/AvatarService'

export const UserAvatar = styled(Avatar)({
  width: 45, 
  height: 45,
  p: 0
})

export const UserText = styled(Typography)({
  fontFamily: 'Poppins',
  display: 'inline'
})

const FriendsListItem = ({ firstname, lastname, username, picture }) => {
  return (
    <ListItem>
        <ListItemAvatar>
          <IconButton>
            <UserAvatar src={picture} {...AvatarService.stringAvatar(username)}/>
          </IconButton>
        </ListItemAvatar>
        {(firstname === null && lastname === null) ?
          <ListItemText primary={
            <UserText component={'span'}
              sx={{
                fontWeight: 'bold',
                fontSize: 20,
                ml: 1
              }}
            >
              {username}
            </UserText>         
          }
        />
        :
        <ListItemText primary={
          <UserText component={'span'}
            sx={{
              fontWeight: 'bold',
              fontSize: 20,
              ml: 1
            }}
          >
            {firstname} {lastname}
          </UserText>         
        }
        secondary={
          <UserText component={'span'}
            sx={{
              color: 'gray',
              ml: 1
              }}
            >
              @{username}
          </UserText>
        }
      />
      }
    </ListItem>
  )  
}

export const Rightbar = () => {

  const [follows, setFollows] = useState([])
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    // eslint-disable-next-line
  }, [])
  
  const getFollows = () => {
    axios.get('http://localhost:8080/api/v1/follows/followers/' + user.id).then((response) => {
      setFollows(response.data)
      setLoading(false)
    })
  }
  
  useEffect(() => {
    if (user) {
      getFollows()
    }

    const interval = setInterval(() => {
      getFollows()
    }, 10000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [user])

  if (loading) {
    return (
      <Box
      flex={2}
      sx={{ display: { xs: "none", md: "block" } }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '25%'
        }}>
          <CircularProgress size={50} />
        </Box>
      </Box>    
    )
  }

  return (
    <Box
      flex={2}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <Box position='fixed' sx={{ p: 3 }}>
        <Typography component={'span'} variant='h4' sx={{
          fontWeight: 'bold',
        }}
        >
          Follows
        </Typography>
        {follows.length > 0 ?
        <List sx={{ width: '100%', maxWidth: 360,  }}>
          {follows.slice(0, 5).map(f => (
            <FriendsListItem key={f.id} firstname={f.followed.firstName} lastname={f.followed.lastName} username={f.followed.userName} />
          ))}
        </List>
        :
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography>You are currently not following anyone.</Typography>
        </Box>
        }
        {follows.length >= 5 &&
        <Box display='flex' justifyContent='center'>
          <Button sx={{ width: '80%', m: 1 }} variant='contained'>Show more</Button>
        </Box> 
        }
      </Box>
    </Box>
  )
}
