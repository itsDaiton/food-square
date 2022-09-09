import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material'
import { Avatar, Button, CssBaseline, Grid, Link, Paper, TextField, Typography, Box, InputAdornment, IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Login = () => {

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const handleChange = (prop) => (e) => {
    setValues({ 
      ...values,
      [prop]: e.target.value 
    })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
          backgroundImage: 'url(https://source.unsplash.com/random)',
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
          <Typography component='h1' variant='h5'>
            Log into your account
          </Typography>    
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
              <TextField
                margin="normal"
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                fullWidth
              />
              <TextField
                margin="normal"
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                type={values.showPassword ? 'text' : 'password'}
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
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
