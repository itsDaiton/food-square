import React, { useEffect } from 'react'
import { Send } from '@mui/icons-material'
import { Button, ButtonGroup, FormControl, FormLabel, Rating, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Authentication from '../../services/Authentication'
import axios from 'axios'

const CustomTextField = styled(TextField) ({
  margin: 10
})


export const Review = ( { handleCloseModal } ) => {

  const [user, setUser] = useState()

  useEffect(() => {
    const currentUser = Authentication.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const [inputs, setInputs] = useState({
    header: '',
    content: '',
    rating: ''
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

    const modifedInputs = {
      appUser: user.id,
      header: inputs.header,
      content: inputs.content,
      rating: inputs.rating
    }

    axios.post('http://localhost:8080/api/v1/reviews/add', modifedInputs , { withCredentials: true }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      axios.post('http://localhost:8080/api/v1/posts/add', {appUser: user.id, review: response.data.id }, { withCredentials: true }, {
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
    <FormControl fullWidth>
      <FormLabel id="form-review" sx={{ marginBottom: 2}}>New Review</FormLabel>
      <CustomTextField name='header' id="review-header" label="Header" variant="outlined" onChange={handleChange}/>
      <CustomTextField name='content' id="review-content" label="Content" variant="outlined" onChange={handleChange}/>
      <Typography component='legend'>Rating</Typography>
      <Rating name="rating" defaultValue={0} precision={0.5} id="review-rating" onChange={handleChange}/>   
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
