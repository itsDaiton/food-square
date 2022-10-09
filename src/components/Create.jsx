import { 
  Box,
  styled, 
  Typography,  
  Fab,
  Tooltip,
  Button,
  TextField,
  FormControl,
  Stepper,
  StepLabel,
  Step,
  Switch,
  FormControlLabel,
  FormGroup,
  Dialog,
  useTheme,
  Autocomplete,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  TableContainer,
  IconButton,
  Snackbar,
  Alert,
  InputAdornment,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Link
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/Authentication'
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { Error} from '@mui/icons-material';

export const CustomTextField = styled(TextField)({
  margin: 8 
})

export const Create = () => {

  const defaultInputs = {
    appUser: '',
    name: '',
    description: '',
    meal: '',
    instructions: '',
    timeToPrepare: '',
    timeToCook: '',
    inputs: {
      gluten: false,
      crustaceans: false,
      eggs: false,
      fish: false,
      peanut: false,
      soy: false,
      milk: false,
      nuts: false,
      celery: false,
      mustard: false,
      sesame: false,
      sulphur: false,
      lupin: false,
      molluscs: false,
      meat: false
    }
  }

  const steps = ['Information', 'Ingredients', 'Details', 'Composition']
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
  const gluten = ['Bread', 'Baked goods', 'Baking mixes', 'Pasta', 'Crackers', 'Cereals', 'Condiments', 'Biscuits', 'Sauces']
  const crustaceans = ['Paella', 'Chinese products', 'Thai curry', 'Sauces', 'Soups', 'Asian salads', 'Fried rice', 'Fish paste', 'Fish soup']
  const eggs = ['Meringue', 'Mayonnaise', 'Marzipan', 'Marshmallow', 'Artificial flavouring', 'Baked goods', 'Lecithin', 'Natural flavourings', 'Nougat', 'Pasta', 'Salad dressing', 'Tartare Sauce', 'Hollandaise', 'Cakes', 'Egg glazed pastry', 'Some ice cream', 'Some custard']
  const fish = ['Barbecue Sauce', 'Soups', 'Pizza', 'Caesar salad', 'Caesar dressing', 'Worcestershire sauce', 'Bouillabaisse', 'Imitation or artificial fish or shellfish',' Meatloaf', 'Caponata', 'a Sicilian eggplant relish', 'Num Pla', 'Dips', 'Gelatine', 'Relishes']
  const peanut = ['Artificial flavouring', 'Baked goods', 'Candy', 'Chili', 'Chocolate', 'Crumb toppings', 'Egg rolls', 'Enchilada sauce', 'Fried foods', 'Flavouring', 'Graham cracker crust', 'Hydrolyzed plant protein', 'Hydrolyzed vegetable protein', 'Marzipan', 'Mole sauce', 'Natural flavouring', 'Nougat']
  const peanutExtra = ['African', 'Asian', 'Chinese', 'Indian', 'Indonesian', 'Thai', 'Vietnamese',' Mexican']
  const soy = ['Soy milk', 'Soy oil', 'Bean sprouts', 'Canned tuna', 'Surimi', 'Artificial flavouring', 'Asian foods', 'Baked goods', 'Hydrolyzed plant protein', 'Hydrolyzed vegetable protein (HVP)', 'Soy sauce', 'Tamari sauce', 'Teryaki sauce', 'Miso', 'Natural flavouring', 'Vegetable broth', 'Vegetable gum', 'Vegetable starch']
  const milk = ['Milk', 'Milk powder', 'Buttermilk', 'Butter', 'Ghee', 'Yoghurt', 'Natural flavouring', 'Flavouring', 'Caramel flavouring', 'High protein flour', 'Lactic acid starter culture', 'Rice cheese', 'Soy cheese', 'Cream', 'Ice Cream', 'Cheese', 'Custard', 'Margarine', 'Chocolate', 'Instant Mash']
  const nuts = ['Chocolate spread', 'Nut butter', 'Chocolates', 'Artificial flavouring', 'Baked goods', 'Mortadella', 'Natural flavouring', 'Nougat', 'Salad dressings', 'BBQ sauce', 'Pesto', 'Crackers', 'Desserts', 'Marzipan', 'Some ice cream', 'Sauces', 'Nut oil']
  const celery = ['Vegetable juice', 'Spice mixes', 'Soups', 'Vegetable mix', 'Marmite', 'Curry', 'Bouillon', 'Processed meat products', 'Savoury snacks', 'Sausages', 'Prepared Salads']
  const mustard = ['Bread', 'Sausages and processed meat products', 'Chutneys', 'Soups', 'Sauces', 'Piccalilli', 'Salad dressing', 'Indian foods', 'Salad dressings', 'Spices', 'Flavouring or seasoning', 'Barbecue Sauce', 'Curry Sauce', 'Cumberland Sauce', 'Ketchup', 'Tomato sauce', 'Béarnaise Sauce', 'Mayonnaises', 'Pesto', 'Gravies', 'Marinades', 'Pickled products', 'Vegetables with vinegar', 'Dehydrated soups']
  const sesame = ['Bread', 'Soups', 'Crackers', 'Tahini butter', 'Dressings', 'Marinades', 'Toasts', 'Dips', 'Hummus', 'Sauces', 'Chutney']
  const sulphur = ['Pickled foods and vinegar', 'Dried fruit (apricots, prunes, raisins...)', 'Maraschino cherries', 'Tinned coconut milk', 'Beer', 'Wine', 'Cider', 'Vegetable juices', 'Some soft drinks', 'Grape juice', 'Bottled lemon juice and lime juice', 'Condiments', 'Guacamole', 'Dehydrated, pre-cut or peeled potatoes', 'Fresh or frozen prawns', 'Some processed meat products']
  const lupin = ['Pastry cases', 'Pies', 'Waffles', 'Pancakes', 'Crepes', 'Products containing crumb', 'Pizzas', 'Vegetarian meat substitute', 'Deep-coated vegetables such as onion rings']
  const molluscs = ['Snails', 'Oysters', 'Squid', 'Mussels', 'Clams', 'Octopus', 'Ethnic Food', 'Soups', 'Sauces', 'Mussel dishes', 'Scallops', 'Calamari']

  const theme = useTheme()
  const [ingredients, setIngredients] = useState(null)
  const [user, setUser] = useState()
  const [recipeInputs, setRecipeInputs] = useState(defaultInputs)
  const [addedIngredients, setAddedIngredients] = useState([])

  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [selectedIngredientInput, setSelectedIngredientInput] = useState('')
  const [selectedAmount, setSelectedAmount] = useState('')

  const [successResponse, setSuccessResponse] = useState('')
  const [errorResponse, setErrorResponse] = useState('')

  const [openDialog, setOpenDialog] = useState(false)
  const [openHelp, setOpenHelp] = useState(false)

  const [ingredientError, setIngredientError] = useState('')
  const [amountError, setAmountError] = useState('')
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [mealError, setMealError] = useState('')
  const [instructionsError, setInstructionsError] = useState('')
  const [timeToPrepError, setTimeToPrepError] = useState('')
  const [timeToCookError, setTimeToCookError] = useState('')
  const [ingredientsError, setIngredientsError] = useState(false)

  const [activeStep, setActiveStep] = useState(0)

  const mobile = useMediaQuery(theme.breakpoints.down(500))

  const [openAlertError, setOpenAlertError] = useState(false)
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false)

  const addIngredient = () => {
    clearErrors()
    if (selectedIngredient === null || selectedAmount === '') {   
      if (selectedIngredient === null ) {
        setIngredientError('You must choose a ingredient.')
      }
      if (selectedAmount === '') {
        setAmountError('You must enter an amount.')
      }
    }
    else if (addedIngredients.some(item => selectedIngredient.name === item.name)) {
      setIngredientError('You already added this ingredient to your recipe.')
    }
    else {    
      setAddedIngredients(addedIngredients => [...addedIngredients, 
        { id: selectedIngredient.id, name: selectedIngredient.name, amount: selectedAmount } ])
      clearErrors()
      clearInputs()
      setIngredientsError(false)
    }
  }

  const removeIngredient = (id) => {
    setAddedIngredients(addedIngredients.filter(item => item.id !== id))
  }

  const getIngredients = () => {
    axios.get('http://localhost:8080/api/v1/ingredients/getAll').then((response) => {
      setIngredients(response.data)
    })
  }

  useEffect(() => {
    getIngredients()
  }, [])

  const clearRecipeErrors = () => {
    setNameError('')
    setDescriptionError('')
    setMealError('')
    setInstructionsError('')
    setTimeToPrepError('')
    setTimeToCookError('')
  }

  const clearErrors = () => {
    setIngredientError('')
    setAmountError('')
  }

  const clearInputs = () => {
    setSelectedIngredient(null)
    setSelectedAmount('')
  }

  const handleNext= () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleChange = (e) => {
    if(e.target.type === 'number') {
      setRecipeInputs({
        ...recipeInputs,
        [e.target.name]: (e.target.value < 0 ? (e.target.value = 0) : e.target.value)
      })
    }
    else {  
      setRecipeInputs({
        ...recipeInputs,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSwitch = (e) => {
    setRecipeInputs({
      ...recipeInputs,
      inputs: {
        ...recipeInputs.inputs,
        [e.target.name]: e.target.checked
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIngredientsError(false)

    if(addedIngredients.length > 0) {
      axios.post('http://localhost:8080/api/v1/recipes/add', recipeInputs, { withCredentials: true }).then((response) => {
      if (response.data) {
        const JSONbody = addedIngredients.map(item =>(
          {
            recipe: response.data.id,
            ingredient: item.id,
            amount: item.amount      
          }     
        ))
        const recipeIngredients = {
          recipeIngredients: JSONbody
        }
        var msg = response.data.message
        clearRecipeErrors()
        axios.post('http://localhost:8080/api/v1/recipe-ingredients/addAll', recipeIngredients, { withCredentials: true}).then((response) => {
            handleCloseDialog()
            setSuccessResponse(msg)
            setOpenAlertSuccess(true)
          }
        )
      }
    }).catch((error) => {
      if(error.response.data.errorList) {
        clearRecipeErrors()
        error.response.data.errorList.forEach(err => {
          if (err.field === 'name') {
            setNameError(err.message)
          }
          if (err.field === 'description') {
            setDescriptionError(err.message)
          }
          if (err.field === 'meal') {
            setMealError(err.message)
          }
          if (err.field === 'instructions') {
            setInstructionsError(err.message)
          }
          if (err.field === 'timeToPrepare') {
            setTimeToPrepError(err.message)
          }
          if (err.field === 'timeToCook') {
            setTimeToCookError(err.message)
          }
        })
        setErrorResponse('Something went wrong. Please check individual fields for error description.')
        setOpenAlertError(true)
      }
      else {
        setErrorResponse(error.response.data.message)
        setOpenAlertError(true)
      }
    })
    } 
    else {
      setIngredientsError(true)
      setActiveStep(1)
    }
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
    setActiveStep(0) 
    setRecipeInputs({
      ...recipeInputs,
      appUser: user.id
    })
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setRecipeInputs(defaultInputs)
    setAddedIngredients([])
    clearErrors()
  }

  const handleOpenHelp = () => {
    setOpenHelp(true)
  }

  const handleCloseHelp = () => {
    setOpenHelp(false)
  }

  const handleCloseErrorAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlertError(false)
  }

  const handleCloseSuccessAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlertSuccess(false)
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return ( 
        <FormControl fullWidth>
          <Typography variant='body1' gutterBottom sx={{ fontWeight: 'bold' }}>
            Recipe information
          </Typography>
          <CustomTextField
            error={nameError ? true : false}
            helperText={nameError}
            name='name'
            value={recipeInputs.name}
            id="recipe-name" 
            label="Name" 
            variant="outlined" 
            onChange={handleChange}
          />
          <CustomTextField
            error={descriptionError ? true : false}
            helperText={descriptionError}
            name='description'
            value={recipeInputs.description}
            id="recipe-description"
            label="Description" 
            variant="outlined" 
            onChange={handleChange} 
            multiline
            rows={4}
          />
          <CustomTextField
            error={mealError ? true : false}
            helperText={mealError}
            select
            name='meal'
            value={recipeInputs.meal}
            id="recipe-meal"
            label="Type"
            onChange={handleChange}
          >
            {meals.map(m => (
              <MenuItem value={m} key={m}>{m}</MenuItem>
            ))}
          </CustomTextField>
      </FormControl>    
      )
      case 1:
        return (
          <FormControl sx={{ minHeight: 500 }} fullWidth>
            <FormGroup>
              <Typography variant='body1' gutterBottom sx={{ fontWeight: 'bold' }}>
                Available ingredients
              </Typography>
              <Typography variant='body2' sx={{ mt: 1, mb: 1 }}>
                Please use the tool below to add individual ingredients to your recipe.
              </Typography>
              <Autocomplete
                value={selectedIngredient}
                onChange={(e, newValue) => {
                  setSelectedIngredient(newValue)
                }}
                inputValue={selectedIngredientInput}
                onInputChange={(e, newInputValue) => {
                  setSelectedIngredientInput(newInputValue)
                }}
                sx={{ width: '70%' }}
                disablePortal
                id="combo-box-ingredients"
                options={ingredients}
                renderOption={(props, option) => {
                  return (
                    <Box {...props} key={option.id}>
                      {option.name}
                    </Box>
                  )
                }}
                renderInput={(params) => <CustomTextField {...params} label="Ingredients" error={ingredientError ? true : false} helperText={ingredientError}/>}
                getOptionLabel={(option) => option.name}
              />
              <CustomTextField
                sx={{ width: '50%' }}
                value={selectedAmount}
                onChange={(e) =>
                  setSelectedAmount(e.target.value < 1 ? (e.target.value = 1) : e.target.value)
                }
                name='amount'
                id="recipe-ingredient-amount"
                label="Amount"
                type="number"
                error={amountError ? true : false} 
                helperText={amountError}
              />
              <Button variant='contained' sx={{ width: 175, ml: 1, mt: 2 }} onClick={addIngredient}>Add ingredient</Button>
            </FormGroup>
            <FormGroup sx={{ mt: 5 }}>
              <Typography variant='body1' gutterBottom sx={{ fontWeight: 'bold' }}>
                Added ingredients
              </Typography>
              <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {addedIngredients.length > 0 ?
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='center'>Amount</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {addedIngredients.map((ai) => (
                        <TableRow
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          key={ai.id}
                        >
                          <TableCell component="th" scope="row" key={ai.name}>
                            {ai.name}
                          </TableCell>   
                          <TableCell align='center'>{ai.amount}</TableCell>
                          <TableCell align='center'>
                            <IconButton onClick={() => removeIngredient(ai.id)}>
                              <ClearIcon color='error' />
                            </IconButton>
                          </TableCell>                              
                          </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                :
                <Typography sx={{ mt: 1 }}>Your list of ingredients is empty.</Typography>
                }
                {ingredientsError &&                
                  <Alert icon={<Error fontSize='inherit'/>} variant="filled" severity="error" sx={{ m: 3 }}>
                  Error - You must add at least <b>1 ingredient</b> to your recipe.
                  </Alert>
                  }
              </Box>        
            </FormGroup>
          </FormControl>
        )
      case 2:
        return (
          <FormControl fullWidth>
            <Typography variant='body1' gutterBottom sx={{ fontWeight: 'bold' }}>
              Recipe details
            </Typography>
            <CustomTextField
              error={instructionsError ? true : false}
              helperText={instructionsError}
              name='instructions' 
              id="recipe-instructions" 
              label="Instructions" 
              variant="outlined"
              value={recipeInputs.instructions}
              onChange={handleChange}
              multiline
              rows={2}
            />
            <CustomTextField
                error={timeToPrepError ? true : false}
                helperText={timeToPrepError}
                name='timeToPrepare'
                id="recipe-time-to-prepare"
                label="Preparation time"
                type="number"
                value={recipeInputs.timeToPrepare}
                onChange={handleChange}
                InputProps={{ endAdornment: <InputAdornment position='end'>minutes</InputAdornment> }}
            />
            <CustomTextField
              error={timeToCookError ? true : false}
              helperText={timeToCookError}
              name='timeToCook'
              id="recipe-time-to-cook"
              label="Cooking time"
              type="number"
              value={recipeInputs.timeToCook}
              onChange={handleChange}
              InputProps={{ endAdornment: <InputAdornment position='end'>minutes</InputAdornment> }}
            />
          </FormControl>  
        )
      case 3:
        return (
          <FormControl fullWidth>
            <FormGroup>
              <Typography variant='body1' gutterBottom sx={{ fontWeight: 'bold' }}>
                Recipe composition
              </Typography>
              <Typography variant='body2' sx={{ mt: 1, mb: 1 }}>
                Please use the tool below to choose which of the components listed are included in your recipe. 
              </Typography>
              <Typography variant='body2' sx={{ mt: 1, mb: 1 }}>
                By default all allergens and meat are set to false, meaning they are not inclued in the recipe. 
              </Typography>
              <Typography variant='body2' sx={{ mt: 1, mb: 1 }}>
                It is your responsibility to set these values accordingly for your recipe.
              </Typography>
              <Typography variant='body2' sx={{ mt: 1, mb: 1 }}>
                If you have any trouble choosing your recipe composition, please refer yourself to our manual.
              </Typography>
              <Typography variant='body2' sx={{ mt: 1, mb: 1 }}>
                Our manual provides information about each allergen as well as examples of occurrences in food.
              </Typography>
              <Button color='info' variant='contained' sx={{ width: 175, mt: 1, mb: 2 }} onClick={handleOpenHelp}>Show manual</Button>
              <Typography variant='body1' sx={{ mt: 3, mb: 1 }}>Allergens</Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.gluten} onChange={handleSwitch} name='gluten'/>} label="Gluten"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.crustaceans} onChange={handleSwitch} name='crustaceans' />} label="Crustaceans"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.eggs} onChange={handleSwitch} name='eggs' />} label="Eggs"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.fish} onChange={handleSwitch} name='fish'/>} label="Fish"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.peanut} onChange={handleSwitch} name='peanut'/>} label="Peanut"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.soy} onChange={handleSwitch} name='soy'/>} label="Soy"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.milk} onChange={handleSwitch} name='milk'/>} label="Milk"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.nuts} onChange={handleSwitch} name='nuts'/>} label="Nuts"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.celery} onChange={handleSwitch} name='celery'/>} label="Celery"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.mustard} onChange={handleSwitch} name='mustard'/>} label="Mustard"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.sesame} onChange={handleSwitch} name='sesame'/>} label="Sesame"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.sulphur} onChange={handleSwitch} name='sulphur'/>} label="Sulphur Dioxide"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.lupin} onChange={handleSwitch} name='lupin'/>} label="Lupin"/>
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.molluscs} onChange={handleSwitch} name='molluscs'/>} label="Molluscs"/>
              <Typography variant='body1' sx={{ mt: 3, mb: 1 }}>Other</Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControlLabel control={<Switch checked={recipeInputs.inputs.meat} onChange={handleSwitch} name='meat'/>} label="Meat"/>
            </FormGroup>
          </FormControl>  
        )
      default:
        throw new Error('Unknow step')
    }
  }

  return (
    user &&
    <React.Fragment>
      <Tooltip title='Create a new recipe' placement='right'>
        <Fab 
          color="primary" 
          aria-label='Create a new recipe'
          size='large'
          onClick={handleOpenDialog}
          sx={{
            position: 'fixed',
            bottom: 25,
            left: 25
        }}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
      disableRestoreFocus
      open={openDialog}
      onClose={handleCloseDialog}
      scroll='paper'
      fullWidth
      maxWidth="md"
      >
        <Box bgcolor={'background.default'} color={'text.primary'} p={3}>
          <Typography textAlign='center' variant='h6' sx={{ fontWeight: 'bold' }}>Create a new recipe</Typography>
          <Stepper 
            activeStep={activeStep} 
            sx={{ pt: 3, pb: 5 }} 
            alternativeLabel={mobile ? false : true}
            orientation={mobile ? 'vertical' : 'horizontal'}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                sx={{ mt: 3, ml: 1, mr: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              <Snackbar open={openAlertError} autoHideDuration={5000} onClose={handleCloseErrorAlert}>
                <Alert onClose={handleCloseErrorAlert} variant='filled' severity="error" sx={{ width: '100%' }}>
                  {errorResponse}        
                </Alert>
              </Snackbar> 
            </Box>
        </React.Fragment>
        </Box>
    </Dialog>
    <Dialog
      disableRestoreFocus
      open={openHelp}
      onClose={handleCloseHelp}
      scroll='paper'
      fullWidth
      maxWidth="md"
      >
        <DialogTitle variant='h4' sx={{ mt: 1, mb: 1 }}>Food allergens</DialogTitle>
        <Divider/>
        <DialogContent>
          <Typography variant='h5' sx={{ mb: 2, mt: 2 }}>About</Typography>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
          Regulation (EU) No. 1169/2011 on the provision of food information to consumers is the main law relating to food information in the European Union.
          Caterers and food businesses are required by law to be able to provide customers with accurate information on the EU's 14 major food allergens if they are included in any of the food products they produce, sell or serve.
          </Typography>
          <Typography variant='body1' sx={{ textAlign: 'justify', mt: 2 }}>
            In the following chapter, you will find basic information about each allergen and some examples of its apperances in food.
          </Typography>
          <Typography variant='h5' sx={{ mb: 2, mt: 2 }}>List of allergens</Typography>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Gluten</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
          Wheat, rye, barley and oats are often found in foods containing flour, some baking powder, batter, breadcrumbs, cakes, couscous, meat products, pasta, pastry, sauces, soups and some fried foods which are dusted with flour.
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg gluten:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {gluten.map(g => (
              <ListItem
              key={g}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={g}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Crustaceans</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
          Crabs, lobster, prawns and scampi are crustaceans. Shrimp paste is an allergen in this category that is commonly used in Thai and South-east Asian cooking such as curries or salads.           
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg crustaceans:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {crustaceans.map(c => (
              <ListItem
              key={c}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={c}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Eggs</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
          Eggs are often found in cakes, some meat products, mayonnaise, mousses, pasta, quiche, sauces and pastries. Some food products are glazed with eggs during cooking.
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg eggs:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {eggs.map(e => (
              <ListItem
              key={e}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={e}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Fish</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            You will find this allergen in some fish sauces, pizzas, relishes, salad dressings, stock cubes or some sauces such as Worcestershire sauce or various Asian sauces.
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg fish:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {fish.map(f => (
              <ListItem
              key={f}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={f}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Peanut</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            Peanuts are legume and grow underground, which is why they are sometimes called groundnut.
            Peanuts are often used as an ingredient in biscuits, cakes, curries, desserts, sauces, groundnut oil and peanut flour.        
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg peanut:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {peanut.map(p => (
              <ListItem
              key={p}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={p}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common cuisines containg peanut:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {peanutExtra.map(p => (
              <ListItem
              key={p}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={p}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Soy</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            Soy or soya is often found in bean curd, edamame beans, miso pates, textured soya protein, soya flour or tofu. 
            Soya is a staple ingredient in oriental food.
            It can be found also in desserts, ice cream, meat products, sauces and vegetarian products.              
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg soy:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {soy.map(s => (
              <ListItem
              key={s}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={s}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Milk</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            Milk is a common ingredient found in dairy products such as butter, cheese, cream, milk powders and yoghurt.
            Some foods are also brushed or glazed with milk during cooking. 
            It is also commonly found in powdered soups and sauces.                 
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg milk:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {milk.map(m => (
              <ListItem
              key={m}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={m}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Nuts</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            Not to be mistaked with peanuts (which as stated before, are legume and grow underground).
            This allergen refers to nuts which grow on trees. Such as cashew nuts, almonds and hazel nuts.
            You can find nuts in breads, biscuits, crackers, desserts, nut powders, stir-fried dishes, ice cream, marzipan, nuts oil and sauces.           
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg nuts:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {nuts.map(n => (
              <ListItem
              key={n}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={n}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Celery</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            This includes the celery stalks, leaves, seeds and the root.
            Usually found in celery salt, salads, some meat products, soups and stock cubes.                    
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg celery:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {celery.map(c => (
              <ListItem
              key={c}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={c}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Mustard</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            This includes mustard in the form of powder, liquid and seeds. This ingredient is used in breads, curries, marinades, meat products, salad dressings, sauces and soups.                   
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg mustard:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {mustard.map(m => (
              <ListItem
              key={m}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={m}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Sesame</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            Sesame seeds are found commonly in bread, usually sprinkled on buns such as hamburger buns, bread sticks, houmous, sesame oil and tahini. 
            They are also sometimes toasted and used in various salads.               
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg sesame:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {sesame.map(s => (
              <ListItem
              key={s}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={s}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Sulphur Dioxide</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            This is an ingredient often used in dried fruits and in some meat products, soft drinks, vegetables, wine and beer.         
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg sulphur dioxide:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {sulphur.map(s => (
              <ListItem
              key={s}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={s}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Lupin</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
           Lupin is a flower, but it is also sometimes found in flour and is sometimes used in bread, pastries and pasta.       
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg lupin:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {lupin.map(l => (
              <ListItem
              key={l}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={l}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>Molluscs</Typography>
          <Divider sx={{ mb: 2 }}/>
          <Typography variant='body1' sx={{ textAlign: 'justify' }}>
            Includes mussels, land snails, squid and whelks, but can also be found in oyster sauce, which is commonly used in fish stews for example.     
          </Typography>
          <Typography variant='body1' sx={{ mb: 2, mt: 2 }}>Common foods containg molloscs:</Typography>
          <List sx={{ pl: 4, pt: 0, pb: 0 }}>
            {molluscs.map(m => (
              <ListItem
              key={m}
              sx={{
                p: 0,
                listStyleType: "disc",
                display: "list-item",
              }}>
                <ListItemText primary={m}/>
              </ListItem>
            ))}
          </List>
          <Typography variant='h5' sx={{ mb: 2, mt: 2 }}>References</Typography>
          <Box>
          <List>
              <ListItem
              sx={{
                p: 1
              }}>
                <Link href="https://erudus.com/food-allergens/" variant='body2' underline='none' target='_blank'>
                  ERUDUS, 2022. What are the 14 Major Food Allergens? Online. 2022.
                </Link>
              </ListItem>
              <ListItem
              sx={{
                p: 1
              }}>
                <Link href="https://freefromfooduk.weebly.com/the-eu-14-allergen-rules.html" variant='body2' underline='none' target='_blank'>
                  FREE FROM FOOD, [no date]. The EU 14 Allergen Rules. Free From Food. Online.
                </Link>
              </ListItem>
          </List>
          </Box>
        </DialogContent>
        <Divider/>
        <DialogActions sx={{ mt: 1, mb: 1, mr: 2 }}>
          <Button variant='contained' onClick={handleCloseHelp}>Close</Button>
        </DialogActions>
    </Dialog>

    <Snackbar open={openAlertSuccess} autoHideDuration={5000} onClose={handleCloseSuccessAlert}>
      <Alert onClose={handleCloseSuccessAlert} variant='filled' severity="success" sx={{ width: '100%' }}>
        {successResponse}
      </Alert>
    </Snackbar> 
    </React.Fragment>
  )
}
