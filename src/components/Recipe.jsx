import { Avatar, Card, CardHeader, CardMedia, CardActions, CardContent, Typography, IconButton, Checkbox, styled, Divider, Link} from '@mui/material'
import { Favorite, FavoriteBorder, Share, MoreVert } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Authentication from '../services/Authentication';

const CardText = styled(Typography)({
  fontFamily: 'Poppins',
  display: 'inline',
  marginRight: 10
})

export const Recipe = ({ recipe }) => {

  const [user, setUser] = useState()

  useEffect(() => {
    const currentUser = Authentication.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const values = {
    minute: 60,
    hour: (60 * 60),
    day: (60 * 60 * 24),
    month: (60 * 60 * 24 * (365/12)),
    year: (60 * 60 * 24 * 365)
  }

  const convertToTimestamp = (date) => {
    let ret

    if (date !== undefined) {
      ret = Math.floor(new Date(date).getTime() / 1000)
    }
    else {
      ret = Math.floor(new Date().getTime() / 1000)
    }
    return ret
  }

  const calculateDifference = (date1, date2) => {
    let recipeDate = new Date(date2 * 1000)
    let diff = date1 - date2
    let ret = ''

    if (diff < values.minute) {
      ret = diff + ' s'
    }
    else if (diff < values.hour) {
      ret = (Math.floor(diff / values.minute)) + ' m'
    }
    else if (diff < values.day) {
      ret = (Math.floor(diff / values.hour)) + ' h'
    }
    else if (diff < values.month) {
      ret = (Math.floor(diff/ values.day)) + ' d'
    }
    else if (diff < values.year) {
      ret = recipeDate.getUTCDate() + '. ' + (recipeDate.getMonth() + 1) + '. '
    }
    else if (diff > values.year){
      ret = recipeDate.getUTCDate() + '. ' + (recipeDate.getMonth() + 1) + '. ' + recipeDate.getFullYear()
    }
    return ret
  }

  if  (recipe === null) {
    return null
  }

  return (
    recipe.length > 0 ?
    recipe.map(p => (
      <Card key={p.id} sx={{margin: {md: 5, xs: 2}}}>
        <CardHeader
          avatar={
            <Avatar 
            alt="picture" 
            src="/resources/OkayChamp.png" 
            sx={{width: 45, height: 45, cursor: "pointer"}}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={
            <React.Fragment>
              <CardText
                sx={{
                  fontWeight: 'bold',
                  fontSize: 20
                }}
              >
                David Poslušný
              </CardText>
              <CardText
                sx={{
                  color: 'gray'
                  }}
                >
                  @{p.appUser.userName}
              </CardText>    
              <CardText
                sx={{
                  color: 'gray'
                }}
              >{calculateDifference(convertToTimestamp(), convertToTimestamp(p.createdAt))}</CardText>     
            </React.Fragment>
          }
        />
        <CardMedia
          component="img"
          height={'20%'}
          width='auto'
          image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant='h6'>
            {p.meal && 'Recipe name: ' + p.meal.name}
            {p.review && 'Review name: ' + p.review.header}
            {p.thread && 'Thread name: ' + p.thread.header}
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }}/>
          <Typography variant="body2">
            {p.meal && 'Description: ' + p.meal.description}
            {p.review && 'Content: ' + p.review.content}
            {p.thread && 'Content: ' + p.thread.content}
          </Typography>
          <Typography variant="body2">
            {p.meal && 'Instructions: ' + p.meal.instructions}
            {p.review && 'Rating: ' + p.review.rating}
          </Typography>
          <Typography variant="body2">
            {p.meal && 'Time to prepare: ' + p.meal.timeToPrepare}
          </Typography>
          <Typography variant="body2">
            {p.meal && 'Time to cook: ' + p.meal.timeToCook}
          </Typography>
          
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color: "red"}} />} />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    ))
    : 
    <React.Fragment>
      <Typography variant='h5' align='center' sx={{ mb: 2, fontWeight: 'bold' }}>Welcome to Food Square!</Typography>
      <Typography component='p' variant='body1' align='center' sx={{ mb: 1 }}>
        Unfortunately, at this momement, we couldn't find any recipes.
      </Typography>
      {user ?
      <Typography component='p' variant='body2' align='center'>You can click the add button to create a new recipe.</Typography>
      :
      <Typography component='p' variant='body2' align='center'>You can create your very own recipe today by registering&nbsp;
        <Link component={RouterLink} to="/register">here.</Link>
      </Typography>
      }
    </React.Fragment>
  )
}
