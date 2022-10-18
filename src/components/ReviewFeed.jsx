import { Typography, Box, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RecipeCard } from './RecipeCard';

export const ReviewFeed = () => {

  const [recipes, setRecipes] = useState([])
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

  if (recipes.length > 0) {
    return (
      <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
        {recipes.map(recipe => (
        <Box key={recipe.id}>
          <RecipeCard key={recipe.id} recipe={recipe}/>
        </Box>
        ))}
      </Box>
    )
  }
  else {
    return (
      <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
        <Typography variant='h5' align='center' sx={{ mb: 2, fontWeight: 'bold' }}>Reviews</Typography>
        <Typography component='p' variant='body1' align='center' sx={{ mb: 1 }}>
          Unfortunately, at this momement, we couldn't find any recipes.
        </Typography>
        </Box>
    )
  }
}
