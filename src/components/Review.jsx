import { 
  Box,
  CardHeader, 
  Rating, 
  Avatar, 
  Card, 
  IconButton, 
  styled, 
  TextField, 
  CardActions, 
  Checkbox, 
  Tooltip, 
  Typography, 
  Snackbar, 
  Alert, 
  Skeleton, 
  Paper, 
  CardActionArea, 
  MenuItem,
  ListItemIcon,
  Menu,
  useTheme,
  useMediaQuery
}
from '@mui/material'
import React, { useEffect, useState } from 'react'
import AvatarService from '../services/AvatarService'
import { calculateDifference, CardText, convertToTimestamp } from './Recipe'
import { getCurrentUser } from '../services/Authentication';
import { Delete, Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../services/VariablesService';

export const CustomTextField = styled(TextField)({
  margin: 8,
})

export const Review = ({ review, page }) => {

  const [user, setUser] = useState(localStorage.getItem('user') ? getCurrentUser : null)
  const [likeCount, setLikeCount] = useState()
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  const [userImage, setUserImage] = useState()
  const [reviewerImage, setReviewerImage] = useState()

  const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const theme = useTheme()
  const tiny = useMediaQuery(theme.breakpoints.down(500))

  let navigate = useNavigate()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const getLikeBoolean = () => {
    if (user && review) {
      axios.get(`${getApiUrl()}/api/v1/reviews/` + review.id + '/like-check', { withCredentials: true }).then((response) => {
        setLiked(response.data)
      })
    }
  }

  const getLikeCount = () => {
    if (review) {
      axios.get(`${getApiUrl()}/api/v1/reviews/` + review.id + '/likes').then((response) => {
        setLikeCount(response.data)
        setLoading(false)
      })
    }
  }

  const getUserImage = () => {
    if (review.recipe.appUser.pathToImage !== null && review.recipe.appUser.pathToImage !== '') {
      axios.get(`${getApiUrl()}/` + review.recipe.appUser.pathToImage, { responseType: 'arraybuffer' }).then((response) => {
        var imageUrl = URL.createObjectURL(new Blob([response.data]))
        setUserImage(imageUrl)
      })
    }
  }

  const getReviewerImage = () => {
    if (review.appUser.pathToImage !== null && review.appUser.pathToImage !== '') {
      axios.get(`${getApiUrl()}/` + review.appUser.pathToImage, { responseType: 'arraybuffer' }).then((response) => {
        var imageUrl = URL.createObjectURL(new Blob([response.data]))
        setReviewerImage(imageUrl)
      })
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    getLikeBoolean()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getReviewerImage()
    getUserImage()
    getLikeCount()

    const interval = setInterval(() => {
      getReviewerImage()
      getUserImage()
    }, 10000)

    const interval2 = setInterval(() => {
      getLikeCount()
    }, 15000)

    return () => {
      clearInterval(interval)
      clearInterval(interval2)
    }
    // eslint-disable-next-line
  }, [])

  const handleCheck = (e) => {
    if (e.target.checked === true) {   
      axios.put(`${getApiUrl()}/api/v1/users/like`, 
      {appUser: user.id, content: review.id, type: 'review' }, 
      { withCredentials: true }).then((response) => {
        getLikeCount()
        getLikeBoolean()
        setAlertMessage(response.data.message)
        setAlertType('success')
        setOpenAlert(true)
      }).catch(error => {
        setAlertMessage(error.response.data.message)
        setAlertType('error')
        setOpenAlert(true)
      })
    }
    else {
      axios.put(`${getApiUrl()}/api/v1/users/unlike`, 
      {appUser: user.id, content: review.id, type: 'review' }, 
      { withCredentials: true }).then((response) => {
        getLikeCount()
        getLikeBoolean()
        setAlertMessage(response.data.message)
        setAlertType('success')
        setOpenAlert(true)
      }).catch(error => {
        setAlertMessage(error.response.data.message)
        setAlertType('error')
        setOpenAlert(true)
      })     
    }
  }

  const handleDeleteReview = (e) => {
    e.preventDefault()
    
    axios.delete(`${getApiUrl()}/api/v1/reviews/` + review.id, { withCredentials: true}).then((response) => {
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)
    }).catch((error) => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)
    })
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  return (
    <Box>
    <Card sx={{margin: {md: 5, xs: 2}, borderRadius: 5}} elevation={10}>
    {page === 'profile' &&
      <Box>
        <Paper elevation={4} sx={{ borderRadius: 15, ml: { xs: 2, md: 5 }, mr: { xs: 2, md: 5 }, mt: 2, mb: 2 }}>
          <Tooltip title='Author and name of reviewed recipe'>
          <CardActionArea 
            sx={{ borderRadius: 15 }}
            component={RouterLink}
            to={'/recipe/' + review.recipe.id}
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
                  navigate('/user/' + review.recipe.appUser.id)
                }}
                onMouseDown={e => e.stopPropagation()}
              >
              {
              userImage ?
              <Avatar src={userImage}/>     
              :
              <Avatar {...AvatarService.stringAvatar(review.recipe.appUser.userName)}/>
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
                        fontSize: 16
                      }}
                    >
                      {(review.recipe.appUser.firstName && review.recipe.appUser.lastName) ? review.recipe.appUser.firstName + ' ' + review.recipe.appUser.lastName : review.recipe.appUser.userName}
                    </CardText>
                    {(review.recipe.appUser.firstName && review.recipe.appUser.lastName) &&
                    <CardText
                      sx={{
                        color: 'text.secondary',
                        fontSize: 16
                        }}
                      >
                        @{review.recipe.appUser.userName}
                    </CardText> 
                    }
                    {!tiny &&
                    <CardText
                      sx={{
                        color: 'text.secondary',
                        fontSize: 16
                      }}
                    >·</CardText>
                    }  
                    <CardText
                      sx={{
                        color: 'text.secondary',
                        fontSize: 16
                      }}
                    >{review.recipe.name}</CardText>    
                    </Box> 
                  </React.Fragment>
                }
              />
              </CardActionArea>
              </Tooltip>
        </Paper>
      </Box>
      }
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
            navigate('/user/' + review.appUser.id)
          }}
          onMouseDown={e => e.stopPropagation()}
        >
          {
          reviewerImage ?
          <Avatar src={reviewerImage}/>     
          :
          <Avatar {...AvatarService.stringAvatar(review.appUser.userName)}/>
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
              {(review.appUser.firstName && review.appUser.lastName) ? review.appUser.firstName + ' ' + review.appUser.lastName : review.appUser.userName}
            </CardText>
            {(review.appUser.firstName && review.appUser.lastName) &&
            <CardText
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 15, sm: 16, md: 18 }
                }}
              >
                @{review.appUser.userName}
            </CardText> 
            }
            {!tiny &&
            <CardText
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 16, sm: 18, md: 20 },
              }}
            >·</CardText>
            } 
            <CardText
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 16, sm: 18, md: 20 },
              }}
            >{calculateDifference(convertToTimestamp(), convertToTimestamp(review.updatedAt))}</CardText>
            </Box>     
          </React.Fragment>
        }
        action={
          (user && review.appUser.id === user.id)  &&
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVert/>
          </IconButton>
        }
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDeleteReview}>
          <ListItemIcon>
            <Delete fontSize="small"/>
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu> 
      <Box display='flex' flexDirection='column'>
        {loading ? 
              ( <Skeleton
                  animation="wave"
                  height={250}
                  width="100%"
                />
              ) 
              :
          <CustomTextField
            disabled
            sx={{ m: 2, mt: 0 }}
            value={review.text}
            id="review-text" 
            variant="outlined"
            multiline
            rows={4}
          />
           }
           {loading ? 
              ( <Skeleton
                  animation="wave"
                  height={50}
                  width="25%"
                />
              ) 
              :
          <Rating
            value={review.rating}
            sx={{m: 2, mt: 0}}
            readOnly
            size={tiny ? 'small' : 'large'}
          />
          }
        </Box>
        <CardActions sx={{ ml: 1, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          {loading ? 
              ( <Skeleton animation="wave" variant="circular" width={40} height={40} />
              ) 
              :
          <Box display='flex' flexDirection='row'>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
              {user ?
              <Tooltip title={liked === true ? 'Remove like from this review' : 'Like this review'}>
                  <IconButton>
                    <Checkbox
                      checked={liked}
                      onChange={handleCheck}
                      icon={<FavoriteBorder sx={{ width: 30, height: 30}} />}
                      checkedIcon={<Favorite sx={{ color: "red", width: 30, height: 30 }} />}
                      disabled={user ? false : true}
                    />
                  </IconButton>
                </Tooltip>
                :
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 64, width: 64 }}>         
                  {likeCount > 0 ? 
                  <Favorite sx={{ color: "red", width: 30, height: 30 }} />
                  :
                  <FavoriteBorder sx={{ width: 30, height: 30}} />     
                  } 
                </Box>
                }
                    {likeCount > 0 ? 
                    <Typography>{likeCount}</Typography>
                    :
                    <Typography></Typography>       
                    } 
            </Box>
          </Box>
          }
        </CardActions>
      </Card>
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} variant='filled' severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}        
        </Alert>
      </Snackbar>         
    </Box>
  )
}
