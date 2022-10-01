import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Recipe } from './Recipe'
import axios from 'axios'

export const Feed = () => {

  const [recipe, setRecipe] = useState(null)

  const getRecipes = () => {
    axios.get('http://localhost:8080/api/v1/recipes/getAll').then((response) => {
      setRecipe(response.data)
    })
  }

  useEffect(() => {
    getRecipes()

    const interval = setInterval(() => {
      getRecipes()
    }, 10000)

    return () => clearInterval(interval)

  }, [])

  return (
    <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
      <Recipe recipe={recipe} />
    </Box>
  )
}
