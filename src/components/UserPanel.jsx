import { useTheme } from '@emotion/react'
import { 
  PersonAdd, 
  PersonRemove
} 
from '@mui/icons-material'
import { 
  Alert, 
  Box, 
  Fab, 
  Skeleton, 
  Snackbar, 
  useMediaQuery 
} 
from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/Authentication'
import { FriendsListItem } from './FriendsListItem'

export const UserPanel = ({ appUser }) => {

	const [user, setUser] = useState(localStorage.getItem('user') ? getCurrentUser : null)
	const [checkFollow, setCheckFollow] = useState(null)

	const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')

  const theme = useTheme()
  const tiny = useMediaQuery(theme.breakpoints.down(500))

	const [loading, setLoading] = useState(true)

	const getFollowCheck = () => {
    if (user) {
      axios.get('http://localhost:8080/api/v1/follows/' + appUser.id + '/follow-check', { withCredentials: true }).then((response) => {
        setCheckFollow(response.data)
        setLoading(false)
      })
    }
    else {
      setLoading(false)
    }

  }
	
	useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

	useEffect(() => {
    getFollowCheck()
    // eslint-disable-next-line
  }, [])

	const handleFollow = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8080/api/v1/follows/follow', 
    { follower: user.id, followed: appUser.id }, 
    { withCredentials: true }).then((response) => {
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)
      getFollowCheck()
    }).catch((error) => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)    
    })
  }

  const handleUnfollow = (e) => {
    e.preventDefault()
    
    axios.delete('http://localhost:8080/api/v1/follows/' + appUser.id, { withCredentials: true }).then((response) => {
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)
      getFollowCheck()
    }).catch((error) => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)  
    })
  }

	const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  return (
		<Box display='flex' justifyContent='space-between'>
			{loading ?
			<Box display='flex' justifyContent='center' flexDirection='row' sx={{ m: 3 }} alignItems='center'>
				<Skeleton variant="circular" width={40} height={40} sx={{ mr: 2}}/>
				<Skeleton variant="rectangular" width={100} height={20} />
			</Box>
			:
			<FriendsListItem user={appUser}/>
			}
			<Box display='flex' alignItems='center' sx={{ mr: 4 }}>
				{loading ?
				<Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 5}}/>
				:
        user &&
				<Fab variant="extended" color='primary' onClick={checkFollow === false ? handleFollow : handleUnfollow} size={tiny ? 'small' : 'large'}>
					{checkFollow === false ? <PersonAdd sx={{ mr: 1 }}/> : <PersonRemove sx={{ mr: 1 }}/>}
					{!tiny && (checkFollow === false ? 'Follow' : 'Unfollow')}
				</Fab>
				}
				<Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
					<Alert onClose={handleCloseAlert} variant='filled' severity={alertType} sx={{ width: '100%' }}>
						{alertMessage}        
					</Alert>
				</Snackbar>
			</Box>        
	</Box>
  )
}
