import { 
  Box, 
  CircularProgress, 
  Divider, 
  Typography
} 
from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getApiUrl } from '../services/VariablesService'
import { FriendsListItem } from './FriendsListItem'
import { UserPanel } from './UserPanel'

export const UserList = ({ type }) => {

  const { id } = useParams()
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])

  const [loading, setLoading] = useState(true)

  let navigate = useNavigate();

  const getUsers = () => {
    axios.get(`${getApiUrl()}/api/v1/users/` + id).then((response) => {
      setUser(response.data)    
      if (type === 'followers') {
        axios.get(`${getApiUrl()}/api/v1/users/` + id + '/followers').then((response) => {
          setUsers(response.data)
          setLoading(false)
        })
      }
      else {
        axios.get(`${getApiUrl()}/api/v1/users/` + id + '/following').then((response) => {
          setUsers(response.data)
          setLoading(false)
        })
      }   
    }).catch(error => {
      navigate('/error')
    })
  }

  useEffect(() => {
    getUsers()

    const interval = setInterval(() => {
      getUsers()
    }, 10000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

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
    <Box sx={{ flex: 4, padding: { xs: 2, md: 4 }, width: '100%', height: '100%', boxSizing: 'border-box'}}>
      <Box display='flex' justifyContent='center'>
        <Typography variant='h4' align='center' sx={{ fontSize: { xs: 22, sm: 28, md: 26, lg: 26, xl: 32 }, fontWeight: 'bold' }}>
            {type === 'followers' ? 'Followers' : 'Following'}
        </Typography>
      </Box>
      <FriendsListItem user={user}/>
      <Divider sx={{ m: 2}}/>
      {users.length > 0 ?
        users.map(u => (
          <UserPanel key={u.id} appUser={u}/>
        ))
      :
      <Box display='flex' justifyContent='center'>
        <Typography>{type === 'followers' ? 'This user has no followers.' : 'This user does not follow anyone.'}</Typography>
      </Box>
      }
    </Box>
  )
}
