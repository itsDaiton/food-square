import { useTheme } from '@emotion/react'
import { 
  Box, 
  Divider, 
  Paper, 
  Tab, 
  Tabs, 
  Typography, 
  useMediaQuery 
} 
from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Feed } from './Feed'
import { Review } from './Review'
import { Comment } from './Comment';
import { UserPanel } from './UserPanel'
import { useNavigate, useParams } from 'react-router'

export const UserProfile = ({ user, followingCount, followersCount }) => {

  const { id } = useParams()
  const theme = useTheme()
  const [tab, setTab] = useState(1)
  const tiny = useMediaQuery(theme.breakpoints.down(500))

  const [reviews, setReviews] = useState([])
  const [comments, setComments] = useState([])

  let navigate = useNavigate()

  const getReviews = () => {
    axios.get('http://localhost:8080/api/v1/reviews/getAllByUser/' + id).then((response) => {
      setReviews(response.data)
    })
  }

  const getComments = () => {
    axios.get('http://localhost:8080/api/v1/comments/getAllByUser/' + id).then((response) => {
      setComments(response.data)
    })
  }

  useEffect(() => {
    getComments()
    getReviews()

    const interval = setInterval(() => {
      getComments()
      getReviews()
    }, 10000)

    return () => clearInterval(interval)

    // eslint-disable-next-line
  }, [id])


  const handleTabChange = (e, newValue) => {
    setTab(newValue)
  }

  const loadTabsContent = (num) => {
    switch (num) {
      case 1:
        return (
          <Feed page='profile'/>
        )
      case 2:
        return (
          <Box sx={{ pb: 1 }}>
          {
          reviews.length > 0 ?
          reviews.map(r => (
          <Review key={r.id} review={r} page='profile' />
          ))
          :
          <Box display='flex' justifyContent='center' sx={{ m: 1 }}>
            <Typography>This user has not reviewed any recipe yet.</Typography>
          </Box>
          }
          </Box>
        )
      case 3:
        return (
          <Box sx={{ pb: 1 }}>
          {
          comments.length > 0 ?
          comments.map(c => (
            <Comment key={c.id} comment={c} page='profile' />
          ))
          :
          <Box display='flex' justifyContent='center' sx={{ m: 1 }}>
            <Typography>This user has not commented on any recipe yet.</Typography>
          </Box>
          }
          </Box>
        )
      default:
        return (
        <Typography>Error - this tab does not exist.</Typography>
        )
    }
  }


  return (
    <Paper elevation={10} sx={{ borderRadius: 5 }}>
      <UserPanel appUser={user}/>
      <Box 
        display='flex' 
        flexDirection='row' 
        justifyContent='flex-start'
        sx={{ borderRadius: 5, p: 2, mb: 2, ml: 2 }}
      >
        <Box display='flex' flexDirection='row' sx={{ cursor: 'pointer'}} onClick={() => { navigate('/following/' + user.id) }}>
          <Typography sx={{ fontWeight: 'bold', mr: 1 }}>{followingCount}</Typography>
          <Typography color='text.secondary' sx={{ mr: 3 }}>following</Typography>
        </Box>
        <Box display='flex' flexDirection='row' sx={{ cursor: 'pointer'}} onClick={() => { navigate('/followers/' + user.id) }}>
          <Typography sx={{ fontWeight: 'bold', mr: 1 }}>{followersCount}</Typography>
          <Typography color='text.secondary'>{followersCount > 1 ? 'followers' : 'follower'}</Typography>
        </Box>
      </Box>
      <Divider/>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        variant='fullWidth'
        orientation={tiny ? 'vertical' : 'horizontal'}
      >
        <Tab value={1} label="Feed" sx={{ typography: 'body1' }}/>
        <Tab value={2} label="Reviews" sx={{ typography: 'body1' }}/>
        <Tab value={3} label="Comments" sx={{ typography: 'body1' }}/>
      </Tabs>
      <Box>
        {loadTabsContent(tab)}
      </Box>
    </Paper>
  )
}
