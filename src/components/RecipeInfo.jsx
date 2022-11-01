import { 
  ArrowForwardIosSharp, 
  Functions 
} 
from '@mui/icons-material'
import { 
  Box, 
  CircularProgress, 
  styled, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} 
from '@mui/material'
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Recipe } from './Recipe'
import { Review } from './Review';
import { Comment } from './Comment';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  marginLeft: 32,
  marginRight: 32,
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export const RecipeInfo = () => {

  let navigate = useNavigate()

  const { id } = useParams()
  const [recipe, setRecipe] = useState({})
  const [reviews, setReviews] = useState([])
  const [comments, setComments] = useState([])
  const [nutritionAnalysis, setNutritionAnalysis] = useState({})

  const [expanded, setExpanded] = React.useState();
  const [loading, setLoading] = useState(true)

  const getRecipe = () => {
    axios.get('http://localhost:8080/api/v1/recipes/' + id).then((response) => {
      setRecipe(response.data)
      setLoading(false)
    }).catch(error => {
      navigate('/error')
    })
  }

  const getReviews = () => {
    axios.get('http://localhost:8080/api/v1/reviews/recipe/' + id).then((response) => {
      setReviews(response.data)
    })
  }

  const getComments = () => {
    axios.get('http://localhost:8080/api/v1/comments/recipe/' + id).then((response) => {
      setComments(response.data)
    })
  }

  const getNutritionAnalysis = () => {
    axios.get('http://localhost:8080/api/v1/recipe-ingredients/recipe/' + id + '/nutrition-analysis').then((response) => {
      setNutritionAnalysis(response.data)
    })
  }

  useEffect(() => {
    getNutritionAnalysis()
    getComments()
    getReviews()
    getRecipe()

    const interval = setInterval(() => {
      getComments()
      getReviews()
    }, 10000)

    return () => clearInterval(interval)

    // eslint-disable-next-line
  }, [])

  const handleChange = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  }

  if (loading) {
    return (
      <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
          <CircularProgress size={50} />
        </Box>
      </Box>   
    )
  }
  return (
    <Box sx={{ flex: 4, padding: { xs: 2, md: 4 }, width: '100%', boxSizing: 'border-box'}}>
      <Recipe recipe={recipe} type='page'/>
      <Box sx={{ mt: 8 }}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography sx={{ fontWeight: 'bold'}}>Nutrition analysis</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Component</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      <Box display='flex' alignItems='center' flexDirection='row' justifyContent='center'>
                        <Functions/>
                        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>Total amount</Typography>
                      </Box>
                      </TableCell>          
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Calories</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalCalories} [kcal]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fat</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalFat} [g]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fatty acids, saturated</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalSaturatedFattyAcids} [g]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fatty acids, monounsaturated</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalMonounsaturatedFattyAcids} [g]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fatty acids, polyunsaturated</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalPolyunsaturatedFattyAcids} [g]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fatty acids, trans</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalTransFattyAcids} [g]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Carbohydrate (total)</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalCarbohydrateTotal} [g]</TableCell>
                  </TableRow>    
                  <TableRow>
                    <TableCell>Carbohydrate (available)</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalCarbohydrateAvailable} [g]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fibre</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalFibre} [g]</TableCell>
                  </TableRow> 
                  <TableRow>
                    <TableCell>Sugar</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalSugar} [g]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Protein</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalProtein} [g]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sodium</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalSodium} [mg]</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Salt</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalSalt} [g]</TableCell>
                  </TableRow>  
                  <TableRow>
                    <TableCell>Water</TableCell>
                    <TableCell align="center">{nutritionAnalysis.totalWater} [g]</TableCell>
                  </TableRow>         
                </TableBody>
              </Table>
            </TableContainer> 
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography sx={{ fontWeight: 'bold'}}>Review section</Typography>
          </AccordionSummary>
          <AccordionDetails>
          {reviews.length > 0 ?
          reviews.map(r => (
            <Review key={r.id} review={r}/>   
          ))
          :
          <Box display='flex' justifyContent='center' sx={{ m: 1 }}>
            <Typography>This recipe has not been reviewed yet.</Typography>
          </Box>
          }
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography sx={{ fontWeight: 'bold'}}>Comment section</Typography>
          </AccordionSummary>
          <AccordionDetails>
          {comments.length > 0 ?
          comments.map(c => (
            <Comment key={c.id} comment={c}/>   
          ))
          :
          <Box display='flex' justifyContent='center' sx={{ m: 1 }}>
            <Typography>This recipe has not been commented yet.</Typography>
          </Box>
          }
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}
