import { 
  Box, 
  CircularProgress
} 
from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getApiUrl } from '../services/VariablesService'
import { UserProfile } from './UserProfile'

export const UserFeed = () => {

  let navigate = useNavigate()

  const { id } = useParams()
  const [user, setUser] = useState({})
  
  const [followersCount, setFollowersCount] = useState([])
  const [followingCount, setFollowingCount] = useState([])

  const [loading, setLoading] = useState(true)

  const getUserInfo = () => {
    axios.get(`${getApiUrl()}/api/v1/users/` + id).then((response) => {
      setUser(response.data)

      axios.get(`${getApiUrl()}/api/v1/users/` + id + '/followers-count').then((response) => {
        setFollowersCount(response.data)
      })

      axios.get(`${getApiUrl()}/api/v1/users/` + id + '/following-count').then((response) => {
        setFollowingCount(response.data)
      })

      setLoading(false)

    }).catch(error => {
      navigate('/error')
    })
  }

  useEffect(() => {
    setLoading(true)
    getUserInfo()

    const interval = setInterval(() => {
      getUserInfo()
    }, 10000)

    return () => clearInterval(interval)

    // eslint-disable-next-line
  }, [id])

  if (loading) {
    return (
      <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
          <CircularProgress size={50} />
        </Box>
      </Box>   
    )
  }

  return (
    <Box sx={{ flex: 4, padding: { xs: 2, md: 4 }, width: '100%', boxSizing: 'border-box'}}>
      <UserProfile user={user} followingCount={followingCount} followersCount={followersCount}/>
    </Box>
  )
}
