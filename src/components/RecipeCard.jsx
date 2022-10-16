import { StarBorderOutlined } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography, Link, CardActionArea, Rating, Divider, Skeleton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AvatarService from '../services/AvatarService'
import { CardText } from './Recipe'

export const RecipeCard = ({ recipe }) => {

  const [reviewCount, setReviewCount] = useState()
  const [averageRating, setAverageRating] = useState()
  const [loading, setLoading] = useState(true)

  const getReviewCount = () => {
    axios.get('http://localhost:8080/api/v1/reviews/getCountByRecipe/' + recipe.id).then((response) => {
      setReviewCount(response.data)
    })
  }

  const getAverageRating = () => {
    axios.get('http://localhost:8080/api/v1/reviews/getAvgRating/' + recipe.id).then((response) => {
      setAverageRating(response.data)
      setLoading(false)
    })
  }
  useEffect(() => {
    getReviewCount()
    getAverageRating()

    const interval = setInterval(() => {
      getReviewCount()
      getAverageRating()
    }, 10000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  return (
    <Box key={recipe.id}>
    <Card elevation={5} sx={{ m: 2, mt: 5, mb: 5, borderRadius: 5 }}>
      <CardActionArea 
            component={Link}
            href='https://mui.com/'
            target='_blank'
        >
      <CardHeader
        avatar={
        loading ? 
        ( <Skeleton animation="wave" variant="circular" width={40} height={40} /> )
        :
        <IconButton
          sx={{ p: 0 }} 
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
          }}
          onMouseDown={e => e.stopPropagation()}
        >
          <Avatar {...AvatarService.stringAvatar(recipe.appUser.userName)} />
        </IconButton>
        }
        title={
          loading ? 
            ( <Skeleton
                animation="wave"
                height={34}
                width="20%"
              />
            ) 
            :
          <React.Fragment>
              <CardText
              sx={{
                fontWeight: 'bold',
                fontSize: 20
              }}
            >
              {(recipe.appUser.firstName && recipe.appUser.lastName) ? recipe.appUser.firstName + ' ' + recipe.appUser.lastName : recipe.appUser.userName}
            </CardText>
            {(recipe.appUser.firstName && recipe.appUser.lastName) &&
            <CardText
              sx={{
                color: 'text.secondary'
                }}
              >
                @{recipe.appUser.userName}
            </CardText> 
            }
            <CardText
              sx={{
                color: 'text.secondary',
                fontSize: 20
              }}
            >·</CardText>  
            <CardText
              sx={{
                color: 'text.primary'
              }}
            >{recipe.name}</CardText>     
          </React.Fragment>
        }
      />
      <Divider/>
      {loading ? 
      <Skeleton
        sx={{ mt: 1, ml: 2, mb: 1 }}
        animation="wave"
        height={34}
        width="35%"
      />
      :
      <CardContent>
        {averageRating >= 1.0 ?
          <Box display='flex' alignItems='center'>     
            <Typography variant='h6' sx={{ mr: 1, fontWeight: 'bold' }}>{averageRating}</Typography>
            <Rating readOnly value={averageRating} precision={0.5} size='large' />
            <Typography display='flex' alignItems='center' variant='body1' sx={{ ml: 2, height: 34.8 }}>
              {reviewCount > 1 ? reviewCount + ' reviews' : reviewCount + ' review'}
              </Typography>
          </Box>
          :
          <Box display='flex' alignItems='center'>
            <Typography variant='body1' sx={{ mr: 1 }}>No reviews yet.</Typography>
            <StarBorderOutlined sx={{ width: 35, height: 35 }} />
          </Box>
        }
      </CardContent>
      }
      </CardActionArea>
    </Card>
  </Box>
  )
}
