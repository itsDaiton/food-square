import { Button, ButtonGroup, FormControl, FormLabel, styled, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Authentication from '../../services/Authentication'
import axios from 'axios'

const CustomTextField = styled(TextField) ({
  margin: 10
})

export const Thread = ( { handleCloseModal } ) => {

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
    }

    axios.post('http://localhost:8080/api/v1/threads/add', modifedInputs , { withCredentials: true }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      axios.post('http://localhost:8080/api/v1/posts/add', {appUser: user.id, thread: response.data.id }, { withCredentials: true }, {
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
      <FormLabel id="form-thread" sx={{ marginBottom: 2}}>New Thread</FormLabel>
      <CustomTextField name='header' id="thread-header" label="Header" variant="outlined" onChange={handleChange}/>
      <CustomTextField name='content' id="thread-content" label="Content" variant="outlined" onChange={handleChange}/>
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
