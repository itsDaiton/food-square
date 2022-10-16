import { Typography, Box, CircularProgress, Link } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Review } from './Review'
import { Link as RouterLink } from 'react-router-dom';
import { getCurrentUser } from '../services/Authentication';
import { RecipeCard } from './RecipeCard';

export const ReviewFeed = () => {

  const [reviews, setReviews] = useState([])
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState(localStorage.getItem('user') ? getCurrentUser : null)

  let recipeReviews = []

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const getReviews = () => {
    axios.get('http://localhost:8080/api/v1/reviews/getAll').then((response) => {
      setReviews(response.data)
      setLoading(false)
    })
  }

  const getRecipes = () => {
    axios.get('http://localhost:8080/api/v1/recipes/getAll').then((response) => {
      setRecipes(response.data)
    })
  }

  useEffect(() => {
    getReviews()
    getRecipes()

    const interval = setInterval(() => {
      getReviews()
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

  if (reviews.length > 0 && recipes.length > 0) {
    return (
      <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
        {recipes.map(recipe => (
        <Box key={recipe.id}>
          <RecipeCard key={recipe.id} recipe={recipe}/>
          <Box>
            {recipeReviews = reviews.filter(element => {
              return element.recipe.id === recipe.id
            }).map(review => (
            <Review key={review.id} review={review}/>     
            ))
            }
          </Box>
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
          Unfortunately, at this momement, we couldn't find any reviews.
        </Typography>
        {user ?
        <Typography component='p' variant='body2' align='center'>You create your own review by clicking the button below any recipe.</Typography>
        :
        <Typography component='p' variant='body2' align='center'>You can review any recipe avilable by registering&nbsp;
          <Link component={RouterLink} to="/register">here.</Link>
        </Typography>}
        </Box>
    )
  }
}
