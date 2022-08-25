import React, { useState } from 'react'
import { Send } from '@mui/icons-material'
import { FormControl, FormLabel, TextField, styled, ButtonGroup, Button } from '@mui/material'
import axios from 'axios'

const CustomTextField = styled(TextField)({
  margin: 10 
})

export const Recipe = ( { handleCloseModal } ) => {

  //placeholder for post
  const postData = {
      createdAt: null,
      appUser: 3,
      meal: 31,
      review: null,
      thread: null
  }

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    instructions: '',
    timeToPrepare: '',
    timeToCook: '',
  })

  const handleChange = (e) => {
   setInputs({
    ...inputs,
    [e.target.name]: e.target.value
   })
  }

  const handleSubmit = (e) => {
    e.preventDefault() 
    handleCloseModal()  
    
    axios.post('https://daiton-food-square-api.herokuapp.com/api/v1/meals/add', inputs , {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      axios.post('https://daiton-food-square-api.herokuapp.com/api/v1/posts/add', postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })        
  }

  return (
    <FormControl>
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
