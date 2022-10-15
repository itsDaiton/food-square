import { 
  Visibility, 
  VisibilityOff, 
  PersonAdd,
  Navigation as NavigationIcon
} 
from '@mui/icons-material'
import { 
  Avatar, 
  Button, 
  CssBaseline, 
  Grid, 
  Link, 
  Paper, 
  TextField, 
  Typography, 
  Box, 
  InputAdornment, 
  IconButton, 
  Alert, 
  Snackbar, 
  Tooltip,
  Fab
} 
from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/Authentication';

export const Register = () => {
  
  let navigate = useNavigate()

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const [emailError, setEmailError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [open, setOpen] = useState(false)

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

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

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
    setUsernameError('')
  }

  const handleNavigate = () => {
    navigate('/discover')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (getCurrentUser() !== null) {
      setOpen(true)
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
    else {    
      axios.post('http://localhost:8080/api/v1/auth/register', values).then((response) => {
        clearErrors()
        axios.post('http://localhost:8080/api/v1/auth/login', {username: values.username, password: values.password}, { withCredentials: true }).then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data))
          navigate('/')
        })
    }).catch((error) => {
      if(error.response.data.errorList) {
      clearErrors()
       error.response.data.errorList.forEach(err => {       
        if(err.field === 'email') {
          setEmailError(err.message)
        }
        
        if(err.field === 'password') {
          setPasswordError(err.message)
        }

        if(err.field === 'username') {
          setUsernameError(err.message)
        }
       })
      }
    })
    }
  }

  return (
    <Grid container component="main" sx={{ height: '100vh'}}>
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
        mx: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <PersonAdd/>
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ textAlign: { xs: 'center'} }}> 
          Create a new account
        </Typography>    
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={usernameError ? true : false}
              helperText={usernameError}
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
              error={emailError ? true : false}
              helperText={emailError}
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange('email')}
            />
            <TextField
              error={passwordError ? true : false}
              helperText={passwordError}
              margin="normal"
              fullWidth
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} variant='filled' severity="error" sx={{ width: '100%' }}>
                You are already logged in! Redirecting to home page.
              </Alert>
            </Snackbar>  
            <Grid container sx={{ flexDirection: 'column', alignItems: 'center' }}>
              <Grid item>
                <Link href="#" variant="body2" component={RouterLink} to="/login">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
              <Grid item mt={2}>
                <Tooltip title='Back to discover'>
                  <Fab color="primary" variant='extended' size='medium' onClick={handleNavigate}>
                    <NavigationIcon sx={{ mr: 1 }} />
                    <Box sx={{ mr: 1, ml: 1 }}>
                      Discover
                    </Box>
                  </Fab>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
      </Box>  
    </Grid>
  </Grid>
  )
}
