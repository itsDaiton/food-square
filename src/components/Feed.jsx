import { 
  Box,
  Typography,
  Link,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  OutlinedInput,
  Select,
  InputLabel,
  MenuItem,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery
 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Recipe } from './Recipe'
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getCurrentUser } from '../services/Authentication';
import axios from 'axios'
import { 
  AccessAlarm, 
  Clear, 
  FilterList, 
  FormatListBulleted, 
  Restaurant 
}
from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';
import { getApiUrl } from '../services/VariablesService';

export const categoriesTypes = [
  'GLUTEN_FREE',
  'SHELLFISH_FREE',
  'EGG_FREE',
  'FISH_FREE',
  'SESAME_FREE',
  'NUT_FREE',
  'SOY_FREE',
  'LACTOSE_FREE',
  'PEANUT_FREE',
  'CELERY_FREE',
  'MUSTARD_FREE',
  'SULPHUR_FREE',
  'LUPIN_FREE',
  'VEGETARIAN',
  'VEGAN',
  'PESCATARIAN'
]

export const editStringFormat = (string) => {
  const words = string.replace('_', ' ').toLowerCase().split(' ')

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1)
  }

  return words.join(' ')
}

export const Feed = ({ page }) => {

  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState(null)

  const [user, setUser] = useState(localStorage.getItem('user') ? getCurrentUser : null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  const [openFilterDialog, setOpenFilterDialog] = useState(false)

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

  const noFilters = {
    meal: [],
    categories: [],
    prepTime: '',
    cookTime: '' 
  }

  const theme = useTheme()

  const tiny = useMediaQuery(theme.breakpoints.down(500))

  const [filterInputs, setFilterInputs] = useState(noFilters)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const getRecipes = () => {
    if (page === 'discover') {
      axios.get(`${getApiUrl()}/api/v1/recipes`).then((response) => {
        setRecipes(response.data)
        setLoading(false)
      })
    }
    else if (page === 'favorites') {
      axios.get(`${getApiUrl()}/api/v1/users/` + user.id + '/favorite-recipes',  {withCredentials: true }).then((response) => {
        setRecipes(response.data)
        setLoading(false)
      })
    }
    else if (page === 'profile') {
      axios.get(`${getApiUrl()}/api/v1/recipes/user/` + id).then((response) => {
        setRecipes(response.data)
        setLoading(false)
      })
    }
    else {
      axios.get(`${getApiUrl()}/api/v1/recipes/my-feed`, { withCredentials: true }).then((response) => {
        setRecipes(response.data)
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    getRecipes()

    const interval = setInterval(() => {
      getRecipes()
    }, 10000)

    return () => clearInterval(interval)

    // eslint-disable-next-line
  }, [id])

  const handleOpenDialog = (e) => {
    setOpenFilterDialog(true)
  }

  const handleCloseDialog = (e) => {
    setOpenFilterDialog(false)
  }

  const handleInputsChange = (e) => {
    setFilterInputs({
      ...filterInputs,
      [e.target.name]: e.target.value
    })
  }

  const includesAll = (arr, values) => values.every(v => arr.includes(v))

  useEffect(() => { 
    if (containsFilter() === true) {
      let categoriesFiltered = []
      let mealFiltered = []
      let prepTimeFiltered = ''
      let cookTimeFiltered = ''

      let categoriesFormatted = []

      let result = []

      result = recipes.filter(recipe => {

        if (filterInputs.categories.length > 0 ) {
          categoriesFormatted = []
          categoriesFormatted = recipe.categories.map(r => { return r.name })
          categoriesFiltered = filterInputs.categories
        }
        else {
          categoriesFiltered = categoriesTypes
          categoriesFormatted = categoriesTypes
        }

        if (filterInputs.meal.length > 0) {
          mealFiltered = filterInputs.meal
        }
        else {
          mealFiltered = mealTypes
        }

        if (filterInputs.prepTime !== '') {
          if (filterInputs.prepTime === 'quick') {
            prepTimeFiltered = (recipe.timeToPrepare < 10)
          }
          if (filterInputs.prepTime === 'normal') {
            prepTimeFiltered = (recipe.timeToPrepare >= 10 && recipe.timeToPrepare < 20)      
          }
          if (filterInputs.prepTime === 'long') {
            prepTimeFiltered = (recipe.timeToPrepare >= 20)        
          }
        }
        else {
          prepTimeFiltered = true
        }

        if (filterInputs.cookTime !== '') {
          if (filterInputs.cookTime === 'quick') {
            cookTimeFiltered = (recipe.timeToCook < 10)
          }
          if (filterInputs.cookTime === 'normal') {
            cookTimeFiltered = (recipe.timeToCook >= 10 && recipe.timeToCook < 30)      
          }
          if (filterInputs.cookTime === 'long') {
            cookTimeFiltered = (recipe.timeToCook >= 30)        
          }
        }
        else {
          cookTimeFiltered = true
        }

        return mealFiltered.includes(editStringFormat(recipe.meal)) &&
        includesAll(categoriesFormatted, categoriesFiltered) &&
        prepTimeFiltered &&
        cookTimeFiltered
      })
      setFilteredRecipes(result)
    }
    // eslint-disable-next-line
  }, [filterInputs])

  const clearFilters = () => {
    setFilterInputs(noFilters)
    setFilteredRecipes(null)
  }

  const containsFilter = () => {
    if (filterInputs.meal.length > 0 || filterInputs.categories.length > 0 || filterInputs.prepTime !== '' || filterInputs.cookTime !== '') {
      return true
    }
    else {
      return false
    }
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

  if (recipes.length > 0 ) {
    return (
      <Box sx={{ flex: 4, padding: { xs: 2, md: 4 }, width: '100%', boxSizing: 'border-box'}}>
        {(page === 'discover' || page === 'home' || page === 'profile') ?
        <Box display='flex' justifyContent='space-between'>
          <Paper 
            elevation={4}        
            sx={{ width: { xs: 40, sm: 60 }, height: { xs: 40, sm: 60 }, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', ml: tiny ? 0 : 6, mb: 2,}}
          >
            <Tooltip title='Filter your feed'>
              <IconButton onClick={handleOpenDialog}>
                <FilterList sx={{ color: 'text.primary' }}/>
              </IconButton>
            </Tooltip>
          </Paper>
          {filteredRecipes &&
          <Accordion 
            elevation={10}      
            sx={{
              maxWidth: 180,
              ml: 2,
              mr: 2,
              borderRadius: 5,
              '&:before': {
                  display: 'none',
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant='body1' align='center' sx={{ fontWeight: 'bold' }}>Active filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {filterInputs.meal.length > 0 &&
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <Restaurant/>
                  <Typography sx={{ m: 1 }}>Meal type</Typography>
                </Box>
                }
                {filterInputs.meal.length > 0 && filterInputs.meal.map(m => (
                  <Chip sx={{ m: 1 }} key={m} label={m} />
                ))}
                {filterInputs.categories.length > 0 &&
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <FormatListBulleted/>
                  <Typography sx={{ m: 1 }}>Categories</Typography>
                </Box>
                }
                {filterInputs.categories.length > 0 &&  filterInputs.categories.map(c => (
                  <Chip sx={{ m: 1 }} key={c} label={editStringFormat(c)} />
                ))}
                {filterInputs.prepTime !== '' && 
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <AccessAlarm/>
                  <Typography sx={{ m: 1 }}>Prep time</Typography>
                </Box>
                }
                {filterInputs.prepTime !== '' &&
                  <Box display='flex' justifyContent='center'>
                    <Chip sx={{ m: 1, fontWeight: 'bold' }} label={filterInputs.prepTime}/>
                  </Box>
                }
                {filterInputs.cookTime !== '' && 
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <AccessAlarm/>
                  <Typography sx={{ m: 1 }}>Cook time</Typography>
                </Box>
                }
                {filterInputs.cookTime !== '' && 
                <Box display='flex' justifyContent='center'>
                  <Chip sx={{ m: 1, fontWeight: 'bold' }} label={filterInputs.cookTime}/>
                </Box>
                }
              </Box>
            </AccordionDetails>
          </Accordion>
          }    
          {filteredRecipes &&
          <Paper 
            elevation={4} 
            sx={{ width: { xs: 40, sm: 60 }, height: { xs: 40, sm: 60 }, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', mr: tiny ? 0 : 6, mb: 2, background: theme.palette.error.main }}
          >
            <Tooltip title='Clear all filters'>
              <IconButton onClick={clearFilters}>
                <Clear sx={{ color: 'text.primary' }}/>
              </IconButton>
            </Tooltip>
          </Paper>
          }      
          <Dialog
          disableRestoreFocus
          open={openFilterDialog}
          onClose={handleCloseDialog}
          scroll='paper'
          fullWidth
          maxWidth="md"  
          >
          <Box bgcolor={'background.default'} color={'text.primary'} p={3}>
            <Typography textAlign='center' variant='h6' sx={{ fontWeight: 'bold', mb: 5 }}>Filter your feed</Typography>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Restaurant/>
              <Typography sx={{ m: 1, fontSize: { xs: 16, md: 18 } }}>Filter by meal type</Typography>
            </Box>
            <FormControl sx={{ m: 2, mt: 3, mb: 3, width: '50%' }}>
              <InputLabel>Meal</InputLabel>
              <Select
                name='meal'
                multiple
                value={filterInputs.meal}
                onChange={handleInputsChange}      
                input={<OutlinedInput label="Meal" />}     
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {mealTypes.map((m) => (
                  <MenuItem
                    key={m}
                    value={m}
                  >
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <FormatListBulleted/>
              <Typography sx={{ m: 1, fontSize: { xs: 16, md: 18 } }}>Filter by categories</Typography>
            </Box>
            <FormControl sx={{ m: 2, mt: 3, mb: 3, width: '50%' }}>
              <InputLabel>Categories</InputLabel>
              <Select
                name='categories'
                multiple
                value={filterInputs.categories}
                onChange={handleInputsChange}        
                input={<OutlinedInput label="Categories" />}     
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={editStringFormat(value)} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {categoriesTypes.map((m) => (
                  <MenuItem
                    key={m}
                    value={m}
                  >
                    {editStringFormat(m)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <AccessAlarm/>
              <Typography sx={{ m: 1, fontSize: { xs: 16, md: 18 } }}>Filter by prepartion time</Typography>
            </Box>
            <FormControl sx={{ m: 2 }}>
              <RadioGroup
                name='prepTime'
                value={filterInputs.prepTime}
                onChange={handleInputsChange}
              >
                <FormControlLabel value="quick" control={<Radio />} label={<Typography sx={{ fontSize: { xs: 16, md: 18 } }}>{'Quick (< 10 mins)'}</Typography>} />
                <FormControlLabel value="normal" control={<Radio />} label={<Typography sx={{ fontSize: { xs: 16, md: 18 } }}>{'Normal (10 to 20 mins)'}</Typography>} />
                <FormControlLabel value="long" control={<Radio />} label={<Typography sx={{ fontSize: { xs: 16, md: 18 } }}>{'Long (> 20 mins)'}</Typography>} />
              </RadioGroup>
            </FormControl>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <AccessAlarm/>
              <Typography sx={{ m: 1, fontSize: { xs: 16, md: 18 } }}>Filter by cooking time</Typography>
            </Box>
            <FormControl sx={{ m: 2 }}>
              <RadioGroup
                name='cookTime'
                value={filterInputs.cookTime}
                onChange={handleInputsChange}
              >
                <FormControlLabel value="quick" control={<Radio />} label={<Typography sx={{ fontSize: { xs: 16, md: 18 } }}>{'Quick (< 10 mins)'}</Typography>} />
                <FormControlLabel value="normal" control={<Radio />} label={<Typography sx={{ fontSize: { xs: 16, md: 18 } }}>{'Normal (10 to 30 mins)'}</Typography>} />
                <FormControlLabel value="long" control={<Radio />} label={<Typography sx={{ fontSize: { xs: 16, md: 18 } }}>{'Long (> 30 mins)'}</Typography>} />
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' color='error' sx={{ mt: 3, ml: 1, mr: 1 }} onClick={clearFilters}>Clear all filters</Button>
              <Button variant='contained' sx={{ mt: 3, ml: 1, mr: 1 }} onClick={handleCloseDialog}>Close</Button>
            </Box>
          </Box>
          </Dialog>
        </Box>
        :
        <Typography variant='h4' align='center' sx={{ m: 4, mb: 5, fontSize: { xs: 22, sm: 28, md: 26, lg: 26, xl: 32 }, fontWeight: 'bold' }}>
          Favorite recipes
        </Typography>
        }
        {
          filteredRecipes ? (filteredRecipes.length > 0 ? filteredRecipes.map(r => (<Recipe key={r.id} recipe={r} type='feed'/>)) 
          : 
          <Box sx={{ padding: 4 }}>
            <Typography variant='h5' align='center' sx={{ mb: 2, fontWeight: 'bold' }}>No recipes found.</Typography>
            <Typography component='p' variant='body1' align='center' sx={{ mb: 1 }}>
              No recipes fit the filters you have chosen. Try different setting.
            </Typography>
          </Box>
        ) 
          : recipes.map(r => (<Recipe key={r.id} recipe={r} type='feed'/>))
        }
      </Box>     
    )
  }
  else { 
    if (page === 'discover') {
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
    else if (page === 'home') {
      return (
        <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
          <Typography variant='h5' align='center' sx={{ mb: 2, fontWeight: 'bold' }}>Welcome to Food Square!</Typography>
          <Typography component='p' variant='body1' align='center' sx={{ mb: 1 }}>
            Unfortunately, at this momement, your feed is empty.
          </Typography>
          <Typography component='p' variant='body2' align='center'>
            Content in your home feed consits of your recipes and recipes of people you follow.
          </Typography>
          <Typography component='p' variant='body2' align='center'>You can click the add button to create a new recipe.</Typography>
        </Box>
      )
    }
    else if (page === 'profile') {
      return (
        <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
          <Typography component='p' variant='body1' align='center' sx={{ mb: 1 }}>          
            Unfortunately, at this momement, the feed is empty.
          </Typography>
          <Typography component='p' variant='body1' align='center'>
            This user has not created any recipes yet.         
          </Typography>
        </Box>
      )    
    }
    else {
      return (
        <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
        <Typography variant='h5' align='center' sx={{ mb: 2, fontWeight: 'bold' }}>Your favorite recipes</Typography>
        <Typography component='p' variant='body1' align='center' sx={{ mb: 1 }}>
          Your list of favorite recipes is empty at this moment.
        </Typography>
        <Typography component='p' variant='body2' align='center'>You can add any recipe you like to favorite to display it here.</Typography>
      </Box>      
      )
    }  
  }
}
