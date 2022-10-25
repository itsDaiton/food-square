import { Box } from '@mui/material'
import React from 'react'
import { Navigation } from './Navigation'

export const Leftbar = () => {
  return (
    <Box
      flex={2}
      p={0}
      sx={{ display: { xs: "none", md: "block"} }}  
    >
      <Box sx={{ position: 'fixed' }}>
        <Navigation/>
      </Box>                
    </Box>
  )
}
