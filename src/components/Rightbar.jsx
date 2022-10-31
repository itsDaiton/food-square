import { 
  Box,
  Typography,
  List,  
  Avatar, 
  styled, 
  Button,
  CircularProgress,
  Link,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getCurrentUser } from '../services/Authentication'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FriendsListItem } from './FriendsListItem'

export const UserAvatar = styled(Avatar)({
  width: 45, 
  height: 45,
  p: 0
})

export const UserText = styled(Typography)({
  fontFamily: 'Poppins',
  display: 'inline'
})

export const Rightbar = ({ page }) => {

  const [follows, setFollows] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [user, setUser] = useState(localStorage.getItem('user') ? getCurrentUser : null)
  const [loading, setLoading] = useState(true)

  let navgiate = useNavigate()

  const handleNavigate = () => {
    navgiate('/following/' + user.id)
  }
 
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    // eslint-disable-next-line
  }, [])
  
  const getFollows = () => {
    if (user) {
      axios.get('http://localhost:8080/api/v1/follows/following/' + user.id).then((response) => {
        setFollows(response.data)
        setLoading(false)
      })
    }
  }

  const getSuggestions = () => {
    axios.get('http://localhost:8080/api/v1/users/get5Random').then((response) => {
      let result = []
      let users = []

      if (response.data.length > 0) {
        if (user) {
          result = response.data.filter(appUser => {
            return appUser.id !== user.id
          })      
        }
        else {
          result = response.data
        }
  
        for (let i = 0; i < result.length; i++) {
          users.push(result.at(i))
        }
  
        setSuggestions(users)
      }
      else {
        setSuggestions(response.data)
      }
      
      if (page === 'discover' && !user) {
        setLoading(false)
      }
    })
  }
  
  useEffect(() => {
    getSuggestions()
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    getFollows()

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
      {user ?
      <Box position='fixed' sx={{ p: 3 }}>
        {follows.length > 0 ?
        <React.Fragment>
          <Typography component={'span'} variant='h5' sx={{
            fontWeight: 'bold',
          }}
          >
            Follows
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360,  }}>
            {follows.slice(0, 5).map(f => (
              <FriendsListItem key={f.id} user={f.followed}/>
            ))}
          </List>
          {follows.length >= 5 &&
            <Box display='flex' justifyContent='center'>
              <Button sx={{ width: '80%', m: 1 }} variant='contained' onClick={handleNavigate}>Show more</Button>
            </Box> 
          }
        </React.Fragment>
        :
        <React.Fragment>
          <Typography component={'span'} variant='h5' sx={{
            fontWeight: 'bold',
          }}
          >
            You might like
          </Typography>
          {suggestions.length > 0 ?
          <List sx={{ width: '100%', maxWidth: 360,  }}>
            {suggestions.slice(0, 3).map(s => (
              <FriendsListItem key={s.id} user={s}/>
            ))}
          </List>
          :
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography sx={{ mt: 1, mb: 1 }}>We could not find any suggestions for you.</Typography>    
          </Box>
          }          
        </React.Fragment>
        }
      </Box>
      :
      <Box position='fixed' sx={{ p: 3 }}>
        <Typography component={'span'} variant='h5' sx={{
          fontWeight: 'bold',
        }}
        >
          You might like
        </Typography>
        {suggestions.length > 0 ?
        <List sx={{ width: '100%', maxWidth: 360,  }}>
          {suggestions.slice(0, 3).map(s => (
            <FriendsListItem key={s.id} user={s} />
          ))}  
        </List>
        :
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography sx={{ mt: 1, mb: 1 }}>There are no registered users yet.</Typography>
          <Typography sx={{ mt: 1, mb: 1 }}>
            Be among the first ones that&nbsp;<Link component={RouterLink} to="/register">register</Link>.
          </Typography>       
        </Box>
        }
        {follows.length >= 5 &&
        <Box display='flex' justifyContent='center'>
          <Button sx={{ width: '80%', m: 1 }} variant='contained' onClick={handleNavigate}>Show more</Button>
        </Box> 
        }
      </Box>
      }
    </Box>
  )
}
