import { 
  Box, 
  IconButton, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Skeleton 
} 
from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import AvatarService from '../services/AvatarService'
import { getApiUrl } from '../services/VariablesService'
import { UserAvatar, UserText } from './Rightbar'

export const FriendsListItem = ({ user }) => {

  let navigate = useNavigate()

  const [userImage, setUserImage] = useState()
  const [loading, setLoading] = useState(true)

  const getUserImage = () => {
    if (user.pathToImage !== null && user.pathToImage !== '') {
      axios.get(`${getApiUrl()}/` + user.pathToImage, { responseType: 'arraybuffer' }).then((response) => {
        var imageUrl = URL.createObjectURL(new Blob([response.data]))
        setUserImage(imageUrl)
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    getUserImage()

    const interval = setInterval(() => {
      getUserImage()
    }, 10000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  return (
    <Box display='flex' alignItems='center'>
    <ListItem>
      <ListItemAvatar>
        {loading ? 
        ( <Skeleton animation="wave" variant="circular" width={40} height={40} /> )
        :
          <IconButton onClick={() => { navigate('/user/' + user.id) }}>
          {
          userImage ?
          <UserAvatar src={userImage}/>     
          :
          <UserAvatar {...AvatarService.stringAvatar(user.userName)}/>
          }
          </IconButton>
        }
        </ListItemAvatar>
        {
        loading ?
        <Skeleton
          animation="wave"
          height={34}
          width={150}
        />
          :    
        (user.firstName === null && user.lastName === null) ?
          <ListItemText
          sx={{ ml: 1 }}
          primary={
            <UserText component={'span'}
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: 15, sm: 16, md: 18 }
              }}
            >
              {user.userName}
            </UserText>         
          }
        />
        :
        <ListItemText 
        sx={{ ml: 1 }}
        primary={
          <UserText component={'span'}
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: 16, sm: 18, md: 20 },
            }}
          >
            {user.firstName} {user.lastName}
          </UserText>         
        }
        secondary={
          <UserText component={'span'}
            sx={{
              color: 'gray',
              }}
            >
              @{user.userName}
          </UserText>
        }
      />
      }
    </ListItem>
    </Box>
  )  
}
