import { 
  Visibility, 
  VisibilityOff, 
  Login as LoginIcon,
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
  Snackbar, 
  Alert, 
  Fab, 
  Tooltip 
} 
from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../services/VariablesService';

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

  const handleNavigate = () => {
    navigate('/discover')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    axios.post(`${getApiUrl()}/api/v1/auth/login`, values, { withCredentials: true }).then((response) => {
      clearError()
      if (response.data.username) {
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/home')
      } 
    }).catch((error) => {
      if (error.response.data) {
        clearError()  
        setError(error.response.data.message) 
      }  
    })  
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)',
          backgroundRepeat: 'no-repeat',
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
