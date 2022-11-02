import { StarBorderOutlined } from '@mui/icons-material'
import { 
  Avatar, 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  IconButton, 
  Typography, 
  CardActionArea, 
  Rating, 
  Divider, 
  Skeleton, 
  Tooltip, 
  Collapse,
  useTheme,
  useMediaQuery
} 
from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AvatarService from '../services/AvatarService'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardText, ExpandMore } from './Recipe'
import { Review } from './Review'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../services/VariablesService'

export const RecipeCard = ({ recipe }) => {

  const [reviewCount, setReviewCount] = useState()
  const [loading, setLoading] = useState(true)

  const [reviews, setReviews] = useState([])

  const [expanded, setExpanded] = useState(false)

  const[userImage, setUserImage] = useState()

  const theme = useTheme()
  const tiny = useMediaQuery(theme.breakpoints.down(500))

  let navigate = useNavigate()

  const getReviewCount = () => {
    axios.get(`${getApiUrl()}/api/v1/reviews/recipe/` + recipe.id + '/count').then((response) => {
      setReviewCount(response.data)
    })
  }

  const getReviewsInRecipe = () => {
    axios.get(`${getApiUrl()}/api/v1/reviews/recipe/` + recipe.id).then((response) => {
      setReviews(response.data)
      setLoading(false)
    })
  }

  const getUserImage = () => {
    if (recipe.appUser.pathToImage !== null && recipe.appUser.pathToImage !== '') {
      axios.get(`${getApiUrl()}/` + recipe.appUser.pathToImage, { responseType: 'arraybuffer' }).then((response) => {
        var imageUrl = URL.createObjectURL(new Blob([response.data]))
        setUserImage(imageUrl)
      })
    }
  }

  useEffect(() => {
    getUserImage()
    getReviewCount()
    getReviewsInRecipe()

    const interval = setInterval(() => {
      getUserImage()
      getReviewCount()
      getReviewsInRecipe()
    }, 10000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  const handleExpandClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setExpanded(!expanded)
  }

  return (
    <Box key={recipe.id}>
    <Card elevation={5} sx={{ m: 2, mt: 5, mb: 5, borderRadius: 5 }}>
      <CardActionArea 
        component={RouterLink}
        to={'/recipe/' + recipe.id}
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
            navigate('/user/' + recipe.appUser.id)
          }}
          onMouseDown={e => e.stopPropagation()}
        >
        {
        userImage ?
        <Avatar src={userImage}/>     
        :
        <Avatar {...AvatarService.stringAvatar(recipe.appUser.userName)}/>
        }
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
            <Box display='flex' flexDirection={tiny ? 'column' : 'row'} alignItems='center'>
              <CardText
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: 16, sm: 18, md: 20 },
              }}
            >
              {(recipe.appUser.firstName && recipe.appUser.lastName) ? recipe.appUser.firstName + ' ' + recipe.appUser.lastName : recipe.appUser.userName}
            </CardText>
            {(recipe.appUser.firstName && recipe.appUser.lastName) &&
            <CardText
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 15, sm: 16, md: 18 }
                }}
              >
                @{recipe.appUser.userName}
            </CardText> 
            }
            {!tiny &&
            <CardText
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 16, sm: 18, md: 20 }
              }}
            >·</CardText>
            }  
            <CardText
              sx={{
                color: 'text.primary',
                fontSize: { xs: 16, sm: 18, md: 20 }
              }}
            >{recipe.name}</CardText>
            </Box>     
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
        <Box display='flex' flexDirection='row'>
        {recipe.avgRating >= 1.0 ?
          <Box display='flex' alignItems='center'>     
            <Typography variant='h6' sx={{ mr: 1, fontWeight: 'bold', fontSize: { xs: 16, md: 24 } }}>{recipe.avgRating}</Typography>
            <Rating readOnly value={recipe.avgRating} precision={0.5} size={tiny ? 'small' : 'large'} />
            <Typography display='flex' alignItems='center' variant='body1' sx={{ ml: 2, height: 34.8, fontSize: { xs: 16, md: 20 }}}>
              {reviewCount > 1 ? reviewCount + ' reviews' : reviewCount + ' review'}
              </Typography>
          </Box>
          :
          <Box display='flex' alignItems='center'>
            <Typography variant='body1' sx={{ mr: 1 }}>No reviews yet.</Typography>
            <StarBorderOutlined sx={{ width: 35, height: 35 }} />
          </Box>     
        }
        {reviews.length > 0 &&
        <ExpandMore
          aria-label="show more"
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          onMouseDown={e => e.stopPropagation()}
        >
          <Tooltip title={expanded ? 'Hide reviews' : 'Show reviews'}>
            <ExpandMoreIcon sx={{ width: 38, height: 38, color: 'text.primary' }}/>
          </Tooltip>
        </ExpandMore>
        }
        </Box>
      </CardContent>
      }
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider/>
          <CardContent>
            <Box>
              <Typography variant='h6' align='center' sx={{ mb: 4, mt: 4, fontWeight: 'bold' }}>Reviews</Typography>
              {reviews.map(r => (
                <Review key={r.id} review={r} page='recipe'/>   
              ))}
            </Box>
          </CardContent>
      </Collapse>
    </Card>
  </Box>
  )
}
