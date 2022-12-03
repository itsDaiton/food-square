import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

export const AccessDenied = () => {
  
  let navigate = useNavigate()

  const navigateLogin = () => {
    navigate('/login')
  }

  const navigateRegister = () => {
    navigate('/register')
  }

  return (
      <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
      >
        <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        >
          <Typography variant="h1" sx={{ m: 1 }} align='center'>
              403
          </Typography>
          <Typography variant='h4' sx={{ m: 1 }} align='center'>
              Access Denied
          </Typography>
          <Typography variant="h6" sx={{ m: 1 }} align='center'>
              This page is only available to authenticated users.
          </Typography>
          <Box 
            sx={{ m: 3 }}
          >
            <Button variant="contained" onClick={navigateRegister} sx={{ m: 1 }}>Register</Button>
            <Button variant="contained" onClick={navigateLogin} sx={{ m: 1 }}>Login</Button>
          </Box>
        </Box>
      </Box>
    )
}
