import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Post } from './Post'
import axios from 'axios'

export const Feed = () => {

  const [post, setPost] = useState([])

  const getPosts = () => {
    axios.get('https://daiton-food-square-api.herokuapp.com/api/v1/posts/getAll').then((response) => {
      setPost(response.data)
    })
  }

  useEffect(() => {
    getPosts()

    const interval = setInterval(() => {
      getPosts()
    }, 10000)

    return () => clearInterval(interval)

  }, [])

  return (
    <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>  
      <Post post={post} />
    </Box>
  )
}
