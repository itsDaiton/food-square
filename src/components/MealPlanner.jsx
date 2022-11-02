import { Refresh, SaveAlt } from '@mui/icons-material';
import { 
	Alert,
	Box, 
	Button, 
	Chip, 
	CircularProgress, 
	FormControl, 
	InputAdornment, 
	InputLabel, 
	MenuItem, 
	OutlinedInput, 
	Paper, 
	Select, 
	Snackbar, 
	styled, 
	Table, 
	TableBody, 
	TableCell, 
	TableContainer, 
	TableRow, 
	TextField,  
	Tooltip,  
	Typography,
	useTheme
} 
from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { categoriesTypes, editStringFormat } from './Feed';
import { MealPlanRecipe } from './MealPlanRecipe';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { getApiUrl } from '../services/VariablesService';

const CustomTableCell = styled(TableCell)({
	fontWeight: 'bold'
})

export const MealPlanner = () => {

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

	const defaultInputs = {
		amount: 3,
		categories: [],
		calories: 2000
	}

	const [inputs, setInputs] = useState(defaultInputs)
	const [loading, setLoading] = useState(false)
	const [dataLoaded, setDataLoaded] = useState(false)
	const [mealPlan, setMealPlan] = useState()

	const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')

	const printRef = useRef()

	const handlePrint = useReactToPrint({
			content: () => printRef.current,
			documentTitle: 'Your meal plan',
	})

	const theme = useTheme()

	const handleInputsChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

	const handleSubmit = (e) => {
		e.preventDefault()
		setDataLoaded(false)
		setLoading(true)
		axios.put(`${getApiUrl()}/api/v1/meal-planning/generate`, inputs).then((response) => {
			setMealPlan(response.data)
			setLoading(false)
			setDataLoaded(true)
		}).catch((error) => {
      setLoading(false)
			setAlertMessage(error.response.data.message)
			setAlertType('error')
			setOpenAlert(true)
		})
	}

	const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  return (
		<Box sx={{ flex: 4, padding: { xs: 2, md: 4 }, width: '100%', height: '100%', boxSizing: 'border-box'}}>
			<Typography variant='h4' align='center' sx={{ m: 4, mb: 5, fontSize: { xs: 22, sm: 28, md: 26, lg: 26, xl: 32 }, fontWeight: 'bold' }}>
				Meal planner
			</Typography>
			<Box display='flex' justifyContent='center'>
				<Paper elevation={10} sx={{ borderRadius: 5, width: '70%' }}>
					<FormControl sx={{ mt: 5, ml: 5, width: '50%' }}>
						<InputLabel>Categories</InputLabel>
						<Select
							name='categories'
							multiple
							value={inputs.categories}
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
					<FormControl sx={{ mt: 5, ml: 5, width: '50%' }}>
						<InputLabel>Amount</InputLabel>
							<Select
								name='amount'
								value={inputs.amount}
								label="Amount"
								onChange={handleInputsChange}
							>
								<MenuItem value={1}>1 meal</MenuItem>
								<MenuItem value={2}>2 meals</MenuItem>
								<MenuItem value={3}>3 meals</MenuItem>
								<MenuItem value={4}>4 meals</MenuItem>
								<MenuItem value={5}>5 meals</MenuItem>
							</Select>
					</FormControl>
					<FormControl sx={{ mt: 5, ml: 5, width: '50%' }}>
						<TextField
								name='calories'
								label="Calories"
								type="number"
								value={inputs.calories}
								onChange={handleInputsChange}
								InputProps={{ endAdornment: <InputAdornment position='end'>calories</InputAdornment> }}
								inputProps={{ step: 100, min: 100 }}
							/>
					</FormControl>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							variant='contained' 
							size='large' 
							sx={{ m: 4 }} 
							onClick={handleSubmit} 
							endIcon={<Refresh/>}
							disabled={loading ? true : false}
						>
							Generate
						</Button>
					</Box>
				</Paper>
			</Box>
			<Box>
					{loading && 		
						<Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{ m: 5 }}>
							<Paper elevation={10} sx={{ borderRadius: 5, p: 2 }}>
								<Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
									<CircularProgress size={50}/>
									<Typography sx={{ mt: 1, fontWeight: 'bold' }}>This may take a while.</Typography>
								</Box>
							</Paper>
						</Box>
					}
					{dataLoaded &&
					<Box ref={printRef}>
						<Typography variant='h4' align='center' sx={{ m: 4, mb: 5, mt: 10, fontSize: { xs: 20, sm: 26, md: 24, lg: 24, xl: 30 }, fontWeight: 'bold' }}>
							Your meal plan for today
						</Typography>
						<Box display='flex' justifyContent='center'>
							<Paper elevation={10} sx={{ borderRadius: 5, width: '100%' }}>
							{mealPlan.recipes.map(r => (
								<Box key={r.id} sx={{ pageBreakAfter: 'always' }}>
									<Typography sx={{ mt: 5, ml: 3, mb: 3, fontWeight: 'bold' }} variant='h6'>{editStringFormat(r.meal)}</Typography>
									<MealPlanRecipe recipe={r}/>
								</Box>
							))}
						<Typography variant='h4' align='center' sx={{ m: 4, mb: 5, mt: 10, fontSize: { xs: 18, sm: 24, md: 22, lg: 22, xl: 28 }, fontWeight: 'bold', pageBreakBefore: 'always' }}>
							Nutritional values - main
						</Typography>
						<Box display='flex' justifyContent='center'>
							<TableContainer component={Paper} elevation={10} sx={{ width: '90%', ml: 2, mr: 2, mb: 5 }}>
								<Table>
									<TableBody>
										<TableRow sx={{ background: theme.palette.info.main, "& td": { border: 0 } }}>
											<CustomTableCell>Calories</CustomTableCell>
											<CustomTableCell align="center">{mealPlan.analysis.totalCalories} [kcal]</CustomTableCell>
										</TableRow>
										<TableRow sx={{ background: theme.palette.error.main, "& td": { border: 0 } }}>
											<CustomTableCell>Fat</CustomTableCell>
											<CustomTableCell align="center">{mealPlan.analysis.totalFat} [g]</CustomTableCell>
										</TableRow>
										<TableRow sx={{ background: theme.palette.warning.main, "& td": { border: 0 } }}>
											<CustomTableCell>Carbohydrate (total)</CustomTableCell>
											<CustomTableCell align="center">{mealPlan.analysis.totalCarbohydrateTotal} [g]</CustomTableCell>
										</TableRow>    
										<TableRow sx={{ background: theme.palette.success.main, "& td": { border: 0 } }}>
											<CustomTableCell>Protein</CustomTableCell>
											<CustomTableCell align="center">{mealPlan.analysis.totalProtein} [g]</CustomTableCell>
										</TableRow>     
									</TableBody>   
								</Table>
							</TableContainer> 
						</Box>
						<Typography variant='h4' align='center' sx={{ m: 4, mb: 5, mt: 5, fontSize: { xs: 18, sm: 24, md: 22, lg: 22, xl: 28 }, fontWeight: 'bold', pageBreakBefore: 'always' }}>
							Nutritional values - secondary
						</Typography>
						<Box display='flex' justifyContent='center'>
							<TableContainer component={Paper} elevation={10} sx={{ width: '90%', ml: 2, mr: 2, mb: 5 }}>
								<Table>
									<TableBody>
										<TableRow>
											<TableCell>Fatty acids, saturated</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalSaturatedFattyAcids} [g]</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Fatty acids, monounsaturated</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalMonounsaturatedFattyAcids} [g]</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Fatty acids, polyunsaturated</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalPolyunsaturatedFattyAcids} [g]</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Fatty acids, trans</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalTransFattyAcids} [g]</TableCell>
										</TableRow>  
										<TableRow>
											<TableCell>Carbohydrate (available)</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalCarbohydrateAvailable} [g]</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Fibre</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalFibre} [g]</TableCell>
										</TableRow> 
										<TableRow>
											<TableCell>Sugar</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalSugar} [g]</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Sodium</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalSodium} [mg]</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Salt</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalSalt} [g]</TableCell>
										</TableRow>  
										<TableRow sx={{ "& td": { border: 0 } }}>
											<TableCell>Water</TableCell>
											<TableCell align="center">{mealPlan.analysis.totalWater} [g]</TableCell>
										</TableRow>    
									</TableBody>     
								</Table>
							</TableContainer> 
						</Box>
						<Box display='flex' justifyContent='center' sx={{ mb: 5, displayPrint: 'none' }}>
							<Tooltip title='Print your meal plan or save it as PDF file'>
								<Button color='info' variant='contained' size='large' endIcon={<SaveAlt/>} onClick={handlePrint}>
									Print
								</Button>		
							</Tooltip>
						</Box>
							</Paper>
						</Box>
					</Box>
					}
				<Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert} sx={{ displayPrint: 'none' }}>
					<Alert onClose={handleCloseAlert} variant='filled' severity={alertType} sx={{ width: '100%' }}>
						{alertMessage}        
					</Alert>
      	</Snackbar>
				</Box>
		</Box>
  )
}
