import { Box, IconButton, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import AvatarService from '../services/AvatarService'
import { UserAvatar, UserText } from './Rightbar'

export const FriendsListItem = ({ user }) => {

  let navigate = useNavigate()

  const [userImage, setUserImage] = useState()
  const [loading, setLoading] = useState(true)

  const getUserImage = () => {
    if (user.pathToImage !== null && user.pathToImage !== '') {
      axios.get('http://localhost:8080/' + user.pathToImage, { responseType: 'arraybuffer' }).then((response) => {
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
          <ListItemText primary={
            <UserText component={'span'}
              sx={{
                fontWeight: 'bold',
                fontSize: 20,
                ml: 1
              }}
            >
              {user.userName}
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
            {user.firstName} {user.lastName}
          </UserText>         
        }
        secondary={
          <UserText component={'span'}
            sx={{
              color: 'gray',
              ml: 1
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
