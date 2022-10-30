import { 
  AccessAlarm,
  FormatListBulleted,
  ReceiptLongOutlined, 
  Restaurant 
} 
from '@mui/icons-material';
import { 
  Box,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme, 
} 
from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { editStringFormat } from './Feed';
import { CardText } from './Recipe';

export const MealPlanRecipe = ({ recipe }) => {

  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
	const tiny = useMediaQuery(theme.breakpoints.down(500))

  const getRecipeIngredients = () => {
    axios.get('http://localhost:8080/api/v1/recipe-ingredients/getByRecipe/' + recipe.id).then((response) => {
      setIngredients(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getRecipeIngredients()
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
        <CircularProgress size={50} />
      </Box>
    )
  }

  return (
    <Paper elevation={4} sx={{ borderRadius: 0, ml: { xs: 2, md: 5 }, mr: { xs: 2, md: 5 }, mt: 2, mb: 2 }}>
      <CardActionArea 
        sx={{ borderRadius: 0 }}
        component={RouterLink}
        to={'/recipe/' + recipe.id}
      >
      <CardHeader
          title={
              <React.Fragment>
                <Box display='flex' flexDirection={tiny ? 'column' : 'row'} alignItems='center'>
                  <CardText
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: 16, sm: 18, md: 20 },
                  }}
                >
                {recipe.name}
                </CardText>
                {!tiny &&
                <CardText
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: 15, sm: 16, md: 18 }
                  }}
                >·</CardText>
                }  
                <CardText
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: 16, sm: 18, md: 20 },
                  }}
                >{recipe.description}</CardText>    
                </Box> 
              </React.Fragment>
            }
          />
          </CardActionArea>
          <Divider/>
          <CardContent>
            <Box display='flex' flexDirection='row' justifyContent='space-around'>
                <Box display='flex'>
                  <AccessAlarm/>
                  <Typography paragraph mr={1}>
                    Prep:
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                  {recipe.timeToPrepare} minutes
                  </Typography>
                </Box>
                <Box display='flex'>
                  <AccessAlarm/>
                  <Typography paragraph mr={1}>
                    Cook:
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                  {recipe.timeToCook} minutes
                  </Typography>
                </Box>
              </Box>
              <Box display='flex' justifyContent='center'>
                <ReceiptLongOutlined/>
                <Typography paragraph mr={1}>
                  Instructions
                </Typography>
              </Box>
              <Box display='flex' justifyContent='center'>
                <Typography paragraph variant='body2' sx={{ fontWeight: 'bold' }}>
                  {recipe.instructions}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='center'>
                <FormatListBulleted/>
                <Typography paragraph mr={1}>
                  Categories
                </Typography>
              </Box>
              <Box sx={{ ml: 10, mr: 10, mt: 2, mb: 2 }}>
              {recipe.categories.map(c => (
                  <Chip sx={{ m: 1 }} key={c.name} label={editStringFormat(c.name)} />
              ))}
              </Box>
              <Box display='flex' justifyContent='center' sx={{ pageBreakBefore: 'avoid' }}>
                <Restaurant/>
                <Typography paragraph mr={1}>
                  Ingredients
                </Typography>
              </Box>
              <Box display='flex' justifyContent='center'>
                <Typography sx={{ m: 2 }} variant='body2'>Content per <b>100g</b> edible portion.</Typography>
              </Box>             
              {!ingredients.length > 0 ?
              <Typography sx={{ m: 2 }}>This recipe does not contain any ingredients.</Typography>
              :
              <Box>         
              <Box justifyContent='center' display='flex'>
                <TableContainer sx={{ mb: 4 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Ingredient</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount</TableCell>               
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ingredients.map((ri) => (
                        <TableRow
                          key={ri.ingredient.code}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>{ri.ingredient.name}</TableCell>
                          <TableCell align="center">{ri.amount}x</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>                       
              </Box>                
              </Box>
              }         
          </CardContent>
          <Divider/>
      </Paper>
  )
}
