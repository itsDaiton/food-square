import { AccessAlarm, ReceiptLongOutlined } from '@mui/icons-material';
import { 
  Box,
  CardActionArea,
  CardHeader,
  CircularProgress,
  Collapse,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
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
import { CardText, ExpandMore } from './Recipe';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const MealPlanRecipe = ({ recipe }) => {

  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  
  const theme = useTheme()
	const tiny = useMediaQuery(theme.breakpoints.down(500))

  const getRecipeIngredients = () => {
    axios.get('http://localhost:8080/api/v1/recipe-ingredients/getByRecipe/' + recipe.id).then((response) => {
      setIngredients(response.data)
      console.log(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getRecipeIngredients()
    // eslint-disable-next-line
  }, [])

  const handleExpandClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setExpanded(!expanded)
  }

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
        <CircularProgress size={50} />
      </Box>
    )
  }

  return (
    <Paper elevation={4} sx={{ borderRadius: 5, ml: { xs: 2, md: 5 }, mr: { xs: 2, md: 5 }, mt: 2, mb: 2 }}>
      <CardActionArea 
        sx={{ borderRadius: 5 }}
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
            action={
              <ExpandMore
              aria-label="show more"
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              onMouseDown={e => e.stopPropagation()}
            >
              <Tooltip title={expanded ? 'Hide details' : 'Show details'}>
                <ExpandMoreIcon sx={{ width: 38, height: 38, color: 'text.primary' }}/>
              </Tooltip>
            </ExpandMore>
            }
          />
          </CardActionArea>
          <Divider/>
          <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ m: 2 }}>
          <Box display='flex' justifyContent='center' sx={{ m: 1 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Details</Typography>
            </Box>
            <Box display='flex'>
              <Typography paragraph mr={1}>
                Preparation time
              </Typography>
              <AccessAlarm/>
            </Box>
            <Typography paragraph sx={{ mb: 4, ml: 1, mt: 1 }} variant='body2'>
              {recipe.timeToPrepare} minutes
            </Typography>
            <Box display='flex'>
              <Typography paragraph mr={1}>
                Cooking time
              </Typography>
              <AccessAlarm/>
            </Box>
            <Typography paragraph sx={{ mb: 4, ml: 1, mt: 1 }} variant='body2'>
              {recipe.timeToCook} minutes
            </Typography>
            <Box display='flex'>
              <Typography paragraph mr={1}>
                Instructions
              </Typography>
              <ReceiptLongOutlined/>
            </Box>
            <Typography paragraph sx={{ mb: 4, ml: 1, mt: 1 }} variant='body2'>
              {recipe.instructions}
            </Typography>
            <Box display='flex' justifyContent='center' sx={{ m: 1 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Categories</Typography>
            </Box>
            <TableContainer sx={{ mb: 4 }}>
              <Table>
                <TableBody>
                  {recipe.categories.map(c => (
                    <TableRow key={c.name}>
                      <TableCell>{editStringFormat(c.name)}</TableCell>
                    </TableRow>
                    ))}           
                </TableBody>            
              </Table>
            </TableContainer>
            <Box display='flex' justifyContent='center' sx={{ m: 1 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Ingredients</Typography>
            </Box>
            {!ingredients.length > 0 ?
            <Typography sx={{ m: 2 }}>This recipe does not contain any ingredients.</Typography>
            :
            <Box>
            <Typography sx={{ m: 2 }}>Content per <b>100g</b> edible portion.</Typography>
            <Box justifyContent='center' display='flex'>
            <TableContainer sx={{ mb: 4 }} component={Paper}>
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
          </Collapse>
      </Paper>
  )
}
