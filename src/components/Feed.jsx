import { Box } from '@mui/material'
import React from 'react'
import { Post } from './Post'

export const Feed = () => {
  return (
    <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
      <Post/>
      <Post/> 
      <Post/> 
      <Post/> 
    </Box>
  )
}
