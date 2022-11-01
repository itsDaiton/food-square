import { 
  CameraAlt, 
  Delete, 
  Edit, 
  Person
} 
from '@mui/icons-material'
import { 
  Alert, 
  Box, 
  Button, 
  CircularProgress, 
  Dialog, 
  Divider, 
  FormControl, 
  Paper, 
  Snackbar, 
  Tab, 
  Tabs, 
  TextField, 
  Typography, 
  useMediaQuery, 
  useTheme
} 
from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

export const SettingsContent = ({ userId }) => {

  const [tab, setTab] = useState(1)
  const [loading, setLoading] = useState(true)

  const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')

  const [openDialog, setOpenDialog] = useState(false)

  const theme = useTheme()
  const tiny = useMediaQuery(theme.breakpoints.down(600))
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: ''
  })

  let fileRef = useRef(null)

  const handleTabChange = (e, newValue) => {
    setTab(newValue)
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  const handleOpenDialog = () => {
    setOpenAlert(false)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const getUserData = () => {
    axios.get('http://localhost:8080/api/v1/users/' + userId).then((response) => {
      setPersonalInfo({
        firstName: response.data.firstName,
        lastName: response.data.lastName
      })

      setLoading(false)
    })
  }

  useEffect(() => {
    getUserData()
    // eslint-disable-next-line
  }, [])

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    })
  }

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault()

    const data = {
      firstName: null,
      lastName: null
    }

    if (personalInfo.firstName === '') {
      setPersonalInfo({...personalInfo, firstName: null})
    }
    else {
      data.firstName = personalInfo.firstName
    }

    if (personalInfo.lastName === '') {
      setPersonalInfo({...personalInfo, lastName: null})
    }
    else {
      data.lastName = personalInfo.lastName
    }
    
    axios.put('http://localhost:8080/api/v1/users/' + userId, data, { withCredentials: true }).then((response) => {
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)
      getUserData()
    }).catch(error => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true) 
    })
    
  }

  const handleImageSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', fileRef.current.files[0])

    axios.put('http://localhost:8080/api/v1/users/' + userId + '/image', formData, { withCredentials: true }).then((response) => {
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)
    }).catch(error => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)
    })
  }

  const handleImageRemove = (e) => {
    e.preventDefault()
    handleCloseDialog()

    axios.delete('http://localhost:8080/api/v1/users/' + userId + '/image', { withCredentials: true }).then((response) => {
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)       
    }).catch(error => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true) 
    })
  }

  const loadTabsContent = (num) => {
    switch (num) {
      case 1:
        return (
          <Paper elevation={10} sx={{ borderRadius: 5 }}>
            <Typography textAlign='center' variant='h6' sx={{ fontWeight: 'bold', pt: 4 }}>Edit your personal information</Typography>
            <FormControl>
              <TextField
                value={personalInfo.firstName === null ? '' : personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                name='firstName'
                id="user-firstname" 
                label='First name'
                variant="outlined"
                sx={{ mt: 4, ml: 4, mr: 4 }}
              />
              <TextField
                value={personalInfo.lastName === null ? '' : personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                name='lastName'
                id="user-lastname" 
                label='Last name'
                variant="outlined"
                sx={{ mt: 4, ml: 4, mr: 4 }}
              />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              onClick={handlePersonalInfoSubmit}
              variant='contained' 
              sx={{ m: 5 }} >
                Confirm
            </Button>
          </Box>
          </Paper>
        )
      case 2:
        return (
          <Paper elevation={10} sx={{ borderRadius: 5 }}>
            <Typography textAlign='center' variant='h6' sx={{ fontWeight: 'bold', pt: 4, pb: 4 }}>Profile picture</Typography>
            <Divider/>
            <Box display='flex' flexDirection='row' alignItems='center' sx={{ mt: 2, ml: 4 }}>
              <Typography textAlign='left' variant='body1' sx={{ fontWeight: 'bold', mr: 1 }}>Add or Edit</Typography>
              <Edit/>
            </Box>
            <FormControl>
              <input 
                accept="image/*" 
                type="file" 
                name='image'
                ref={fileRef}
                style={{ marginLeft: 40, marginTop: 18 }}
              />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                onClick={handleImageSubmit}
                variant='contained' 
                sx={{ m: 5 }} >
                  Confirm
              </Button>
            </Box>
            <Divider/>
            <Box display='flex' flexDirection='row' alignItems='center' sx={{ mt: 2, ml: 4 }}>
              <Typography textAlign='left' variant='body1' sx={{ fontWeight: 'bold', mr: 1 }}>Remove</Typography>
              <Delete/>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                onClick={handleOpenDialog}
                variant='contained'
                color='error'
                sx={{ m: 5, mt: 2 }} >
                  Remove
              </Button>
            </Box>
            <Dialog
              disableRestoreFocus
              open={openDialog}
              onClose={handleCloseDialog}
              scroll='paper'
              fullWidth
              maxWidth="sm"
              >
                <Box bgcolor={'background.default'} color={'text.primary'} p={3}>
                  <Typography align='center'>Are you sure you want to remove your profile picture?</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
                    <Button
                      onClick={handleImageRemove}
                      variant='contained'
                      color='success'
                      sx={{ m: 1 }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={handleCloseDialog}
                      variant='contained'
                      color='error'
                      sx={{ m: 1 }}
                    >
                       No
                    </Button>
                  </Box>
                </Box>
              </Dialog>
          </Paper>
        )
      default:
        return (
        <Typography>Error - this tab does not exist.</Typography>
        )
    }
  }

  return (
    <Box sx={{ flex: 6, padding: 4, width: '100%', boxSizing: 'border-box'}}>
      <Box display='flex' justifyContent='center'>
        <Typography variant='h4' align='center' sx={{ m: 4, mb: 5, fontSize: { xs: 22, sm: 28, md: 26, lg: 26, xl: 32 }, fontWeight: 'bold' }}>
          Settings
        </Typography>
      </Box>
      {tiny ?
      <Box
        sx={{ bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant='fullWidth'
            orientation='horizontal'
            sx={{ mb: 5 }}
          >
            <Tab value={1} icon={<Person/>} label="Personal Info" iconPosition='start' sx={{ typography: 'body1' }}/>
            <Tab value={2} icon={<CameraAlt/>} label="Profile Picture" iconPosition='start' sx={{ typography: 'body1' }}/>
          </Tabs>
          <Box sx={{ width: '100%', height: '80%'}}>
            {loading ?
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
              <CircularProgress size={50} />
            </Box>
            :
            loadTabsContent(tab)
            }
          </Box>
        <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} variant='filled' severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}        
          </Alert>
        </Snackbar>
      </Box>    
      :
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 250 }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          variant='fullWidth'
          orientation='vertical'
          sx={{ width: 300 }}
        >
          <Tab value={1} icon={<Person/>} label="Personal Info" iconPosition='start' sx={{ typography: 'body1' }}/>
          <Tab value={2} icon={<CameraAlt/>} label="Profile Picture" iconPosition='start' sx={{ typography: 'body1' }}/>
        </Tabs>
        <Box sx={{ width: '80%', height: '80%', ml: 5, mr: 5}}>
          {loading ?
          <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
            <CircularProgress size={50} />
          </Box>
          :
          loadTabsContent(tab)
          }
        </Box>
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} variant='filled' severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}        
        </Alert>
      </Snackbar>
     </Box>
    }      
    </Box>
  )
}
