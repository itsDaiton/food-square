import { 
  Box,
  CircularProgress,
  Typography, 
  useTheme, 
  Link } 
from '@mui/material'
import React, { useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

export const IngredientsTable = () => {

  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(15)
  
  const theme = useTheme()

  const getIngredients = () => {
    axios.get('http://localhost:8080/api/v1/ingredients/getAll').then((response) => {
      setIngredients(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getIngredients()
  }, [])

  const columns = [
    {
      field: 'name',
      headerName: 'Name (100g edible portion)',
      width: 350,
      renderCell: (params) => {
        return <Link 
        component={RouterLink} 
        to={'/ingredient/' + params.row.id} 
        style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {params.row.name}
        </Link>
      }
    },
    {
      field: 'calories',
      headerName: 'Calories [kcal]',
      width: 200,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'fat',
      headerName: 'Fat [g]',
      width: 150,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'saturatedFattyAcids',
      headerName: 'Fatty acids, saturated [g]',
      width: 300,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'monounsaturatedFattyAcids',
      headerName: 'Fatty acids, monounsaturated [g]',
      width: 350,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'polyunsaturatedFattyAcids',
      headerName: 'Fatty acids, polyunsaturated [g]',
      width: 350,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'transFattyAcids',
      headerName: 'Fatty acids, trans [g]',
      width: 275,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'carbohydrateTotal',
      headerName: 'Carbohydrate (total) [g]',
      width: 300,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'carbohydrateAvailable',
      headerName: 'Carbohydrate (available) [g]',
      width: 325,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'fibre',
      headerName: 'Fibre [g]',
      width: 150,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'sugar',
      headerName: 'Sugar [g]',
      width: 175,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'protein',
      headerName: 'Protein [g]',
      width: 175,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'sodium',
      headerName: 'Sodium [mg]',
      width: 200,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'salt',
      headerName: 'Salt [g]',
      width: 150,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'water',
      headerName: 'Water [g]',
      width: 175,
      align: 'center',
      headerAlign: 'center'
    },
  ]

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
      <Box>
        <Typography variant='h4' align='center' sx={{ m: 4, mb: 5, fontSize: { xs: 22, sm: 28, md: 26, lg: 26, xl: 32 }, fontWeight: 'bold' }}>
          Available ingredients
        </Typography>
        <DataGrid
          sx={{
            p: 1, 
            height: 800,
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold'
            }
          }}
          rows={ingredients}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[15, 25, 50]}
          pagination
          disableSelectionOnClick
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }}
        />
        <Typography sx={{ pt: 3 }} variant='body2' color={theme.palette.warning.main}>
          Note: Increasing rows per page may affect performance.
        </Typography>
      </Box>
    </Box>
  )
}
