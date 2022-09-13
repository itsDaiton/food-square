import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material'
import { Avatar, Button, CssBaseline, Grid, Link, Paper, TextField, Typography, Box, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import  Authentication from '../services/Authentication';

export const Login = () => {

  let navigate = useNavigate()

  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('')

  const handleChange = (prop) => (e) => {
    setValues({ 
      ...values,
      [prop]: e.target.value 
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }

  const clearError = () => {
    setError('')
  }

  const [open, setOpen] = useState(false)

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (Authentication.getCurrentUser() !== null) {
      setOpen(true)
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
    else {    
    axios.post('http://localhost:8080/api/v1/auth/login', values, { withCredentials: true }).then((response) => {
      clearError()
      console.log(response)   
      if (response.data.username) {
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/')
        console.log(response.data)
      } 
    }).catch((error) => {
      if (error.response.data) {
        clearError()  
        console.log(error.response.data)  
        setError(error.response.data.message) 
      }  
    }) 
    }  
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline/>
      <Grid
        item
        xs={false}
        sm={5}
        md={7}
        sx={{
          backgroundImage: 'url(https://picsum.photos/800)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={7}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LoginIcon/>
          </Avatar>
          <Typography component='h1' variant='h5' sx={{ textAlign: { xs: 'center'}}}>
            Log into your account
          </Typography>    
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
              <TextField
              error={error ? true : false}
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={values.username}
              onChange={handleChange('username')}
              />
              <TextField
                error={error ? true : false}
                helperText={error}
                margin="normal"
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
               fullWidth
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant='filled' severity="error" sx={{ width: '100%' }}>
                  You are already logged in! Redirecting to home page.
                </Alert>
              </Snackbar> 
              <Grid container sx={{ flexDirection: 'column', alignItems: 'center'}}>
                <Grid item>
                  <Link href="#" variant="body2" component={RouterLink} to="/register">
                    {"Don't have an account yet? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
