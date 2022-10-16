import { 
  CircularProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export const IngredientList = () => {

  const { id } = useParams()
  const [ingredient, setIngredient] = useState({})
  const [loading, setLoading] = useState(true)

  const getIngredient = () => {
    axios.get('http://localhost:8080/api/v1/ingredients/get/' + id).then((response) => {
      setIngredient(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getIngredient()
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

  return (
    <Box sx={{ flex: 4, padding: { xs: 2, md: 4 }, width: '100%', height: '100%', boxSizing: 'border-box'}}>
      <Box bgcolor={'background.default'} color={'text.primary'} p={3}>
          <Typography variant='h4' align='center' sx={{ m: 4, mb: 5, fontSize: { xs: 22, sm: 28, md: 26, lg: 26, xl: 32 }, fontWeight: 'bold' }}>
            {ingredient.name}
          </Typography>
          <Typography sx={{ m: 2 }}>Content per <b>100g</b> edible portion.</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Component</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Value</TableCell>                
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Calories</TableCell>
                  <TableCell align="center">{ingredient.calories} [kcal]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fat</TableCell>
                  <TableCell align="center">{ingredient.fat} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fatty acids, saturated</TableCell>
                  <TableCell align="center">{ingredient.saturatedFattyAcids} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fatty acids, monounsaturated</TableCell>
                  <TableCell align="center">{ingredient.monounsaturatedFattyAcids} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fatty acids, polyunsaturated</TableCell>
                  <TableCell align="center">{ingredient.polyunsaturatedFattyAcids} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fatty acids, trans</TableCell>
                  <TableCell align="center">{ingredient.transFattyAcids} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Carbohydrate (total)</TableCell>
                  <TableCell align="center">{ingredient.carbohydrateTotal} [g]</TableCell>
                </TableRow>    
                <TableRow>
                  <TableCell>Carbohydrate (available)</TableCell>
                  <TableCell align="center">{ingredient.carbohydrateAvailable} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fibre</TableCell>
                  <TableCell align="center">{ingredient.fibre} [g]</TableCell>
                </TableRow> 
                <TableRow>
                  <TableCell>Sugar</TableCell>
                  <TableCell align="center">{ingredient.sugar} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Protein</TableCell>
                  <TableCell align="center">{ingredient.protein} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sodium</TableCell>
                  <TableCell align="center">{ingredient.sodium} [mg]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Salt</TableCell>
                  <TableCell align="center">{ingredient.salt} [g]</TableCell>
                </TableRow>  
                <TableRow>
                  <TableCell>Water</TableCell>
                  <TableCell align="center">{ingredient.water} [g]</TableCell>
                </TableRow>         
              </TableBody>
            </Table>
          </TableContainer> 
        </Box>
    </Box>
  )
}
