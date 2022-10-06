import { 
  Box,
  Typography,
  Link,
  CircularProgress
 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Recipe } from './Recipe'
import { Link as RouterLink } from 'react-router-dom';
import Authentication from '../services/Authentication';
import axios from 'axios'

export const Feed = () => {

  const [recipes, setRecipes] = useState([])
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const getRecipes = () => {
    axios.get('http://localhost:8080/api/v1/recipes/getAll').then((response) => {
      setRecipes(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getRecipes()

    const interval = setInterval(() => {
      getRecipes()
    }, 10000)

    return () => clearInterval(interval)

  }, [])

  useEffect(() => {
    const currentUser = Authentication.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
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

  if (recipes.length > 0 ) {
    return (
      <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
        {recipes && recipes.map(r => (<Recipe key={r.id} recipe={r} loading={loading}/>))}    
      </Box>
    )
  }
  else { 
    return (
      <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
        <Typography variant='h5' align='center' sx={{ mb: 2, fontWeight: 'bold' }}>Welcome to Food Square!</Typography>
        <Typography component='p' variant='body1' align='center' sx={{ mb: 1 }}>
          Unfortunately, at this momement, we couldn't find any recipes.
        </Typography>
        {user ?
        <Typography component='p' variant='body2' align='center'>You can click the add button to create a new recipe.</Typography>
        :
        <Typography component='p' variant='body2' align='center'>You can create your very own recipe today by registering&nbsp;
          <Link component={RouterLink} to="/register">here.</Link>
        </Typography>}
      </Box>
    )
  }
}
