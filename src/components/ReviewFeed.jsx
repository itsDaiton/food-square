import { ArrowDownward, ArrowUpward, Clear, Sort } from '@mui/icons-material';
import { Typography, Box, CircularProgress, Paper, useMediaQuery, Tooltip, IconButton, useTheme, styled, alpha, InputBase } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RecipeCard } from './RecipeCard';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const ReviewFeed = () => {

  const theme = useTheme()

  const [recipes, setRecipes] = useState([])
  const [searchResults, setSearchResults] = useState([])

  const [sort, setSort] = useState(null)

  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState('')

  const tiny = useMediaQuery(theme.breakpoints.down(500))

  const getRecipes = () => {
    axios.get('http://localhost:8080/api/v1/recipes/getAllExtended').then((response) => {
      setRecipes(response.data)
      setLoading(false)
    })
  }

  const getSearchResults = () => {
    setSearchResults(recipes)
  }

  useEffect(() => {
    getRecipes()

    const interval = setInterval(() => {
      getRecipes()
    }, 10000)

    return () => clearInterval(interval)

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (query === '') {
      getSearchResults()
    }
    // eslint-disable-next-line
  }, [recipes])

  const compareDesc = (a, b) => {
    if (a.avgRating < b.avgRating) {
      return 1
    }
    if (a.avgRating > b.avgRating) {
      return -1
    }
    return 0
  }

  const compareAsc = (a, b) => {
    if (a.avgRating < b.avgRating) {
      return -1
    }
    if (a.avgRating > b.avgRating) {
      return 1
    }
    return 0
  }
 
  const handleSearchChange = (e) => {
    if (!e.target.value) {
      setSearchResults(recipes)
    }
    const result = recipes.filter(recipe => recipe.name.includes(e.target.value))
    setQuery(e.target.value)
    setSearchResults(result)
  }

  const resetSearchBar = (e) => {
    setSearchResults(recipes)
    setQuery('')
  }

  const handleSort = () => {
    if (sort === null || sort === 'asc') {
      setSort('desc')
    } 
    else if (sort === 'desc') {
      setSort('asc')
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

  if (recipes.length > 0) {
    return (
      <Box sx={{ flex: 4, padding: 4, width: '100%', boxSizing: 'border-box'}}>
        <Box display='flex' justifyContent='space-between'>
          <Paper 
            elevation={4}        
            sx={{ width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', ml: tiny ? 0 : 6, mb: 2,}}
          >
            <Tooltip title={(sort === null || sort === 'asc') ? 'Sort by top rated' : 'Sort by worst rated'}>
              <IconButton onClick={handleSort}>
                {(sort === null || sort === 'asc') ? <ArrowDownward sx={{ color: 'text.primary' }}/> : <ArrowUpward sx={{ color: 'text.primary' }}/>}
              </IconButton>
            </Tooltip>
          </Paper>
          <Box display='flex' alignItems='center'>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                name='search'
                placeholder="Search recipes"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
                value={query}
              />
            </Search>
          </Box>
          <Paper 
            elevation={4} 
            sx={{ width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', mr: tiny ? 0 : 6, mb: 2, background: theme.palette.error.main }}
          >
            <Tooltip title='Reset searchbar'>
              <IconButton onClick={resetSearchBar}>
                <Clear sx={{ color: 'text.primary' }}/>
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>     
        {sort === null &&
        searchResults.map(recipe => (
          <Box key={recipe.id}>
            <RecipeCard key={recipe.id} recipe={recipe}/>
          </Box>
          ))
        }
        {sort === 'desc' &&
        searchResults.sort(compareDesc).map(recipe => (
        <Box key={recipe.id}>
          <RecipeCard key={recipe.id} recipe={recipe}/>
        </Box>
        ))
        }
        {sort === 'asc' &&
        searchResults.sort(compareAsc).map(recipe => (
        <Box key={recipe.id}>
          <RecipeCard key={recipe.id} recipe={recipe}/>
        </Box>
        ))
        }
        {(!searchResults.length > 0 && query !== '') && 
        <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
          <Typography>No results.</Typography>
        </Box>
        }
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
