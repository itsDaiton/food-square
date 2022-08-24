import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Post } from './Post'
import axios from 'axios'

export const Feed = () => {

  const [post, setPost] = useState([])

  axios.get('https://daiton-food-square-api.herokuapp.com/api/v1/posts/getAll').then((response) => {
    setPost(response.data)
  })

  return (
    <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
      <Post post={post} />
    </Box>
  )
}
