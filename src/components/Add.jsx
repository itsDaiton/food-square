import React, { useEffect, useState } from 'react'
import { Send } from '@mui/icons-material'
import { FormControl, FormLabel, TextField, styled, ButtonGroup, Button } from '@mui/material'
import axios from 'axios'
import Authentication from '../services/Authentication'

const CustomTextField = styled(TextField)({
  margin: 10 
})

export const Add = ( { handleCloseModal } ) => {

  const [user, setUser] = useState()

  useEffect(() => {
    const currentUser = Authentication.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    instructions: '',
    timeToPrepare: '',
    timeToCook: '',
  })

  const [mealId, setMealId] = useState(null);

  const handleChange = (e) => {
   setInputs({
    ...inputs,
    [e.target.name]: e.target.value
   })
  }

  const handleSubmit = (e) => {
    e.preventDefault() 
    handleCloseModal()

    const modifedInputs = {
      appUser: user.id,
      name: inputs.name,
      description: inputs.description,
      instructions: inputs.instructions,
      timeToPrepare: inputs.timeToPrepare,
      timeToCook: inputs.timeToCook
    }
    
    axios.post('http://localhost:8080/api/v1/meals/add', modifedInputs , { withCredentials: true }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      setMealId(response.data.id)
      console.log(mealId)
      axios.post('http://localhost:8080/api/v1/posts/add', {appUser: user.id, meal: response.data.id }, { withCredentials: true }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        console.log(response.data)
        console.log(mealId)
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <FormControl fullWidth>
      <FormLabel id="form-recipe" sx={{ marginBottom: 2}}>New recipe</FormLabel>
      <CustomTextField name='name' id="recipe-name" label="Name" variant="outlined" onChange={handleChange}/>
      <CustomTextField name='description' id="recipe-description" label="Description" variant="outlined" onChange={handleChange}/>
      <CustomTextField name='instructions' id="recipe-instructions" label="Instructions" variant="outlined" onChange={handleChange}/>
      <CustomTextField
          name='timeToPrepare'
          id="recipe-time-to-prepare"
          label="Preparation time"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
      <CustomTextField
        name='timeToCook'
        id="recipe-time-to-cook"
        label="Cooking time"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
      <ButtonGroup
          fullWidth
          sx={{marginTop: 2}}
        >
          <Button type="submit" onClick={handleSubmit} variant="contained" endIcon={<Send />}>
            Send
          </Button>             
        </ButtonGroup>  
    </FormControl>  
  )
}
