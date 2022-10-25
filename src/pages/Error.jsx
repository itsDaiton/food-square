import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Error = () => {

  let navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
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
        <Typography variant="h1" sx={{ m: 1 }}>
            404
        </Typography>
        <Typography variant='h4' sx={{ m: 1 }}>
              Not Found
        </Typography>
        <Typography variant="h6" sx={{ m: 1 }}>
          The page you're looking for was not found.
        </Typography>
        <Box sx={{ m: 3 }}>
          <Button variant="contained" sx={{ m: 2 }} onClick={handleClick}>Go back</Button>
        </Box>
      </Box>
    </Box>
  )
}
