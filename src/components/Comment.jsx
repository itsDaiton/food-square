import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Alert, Avatar, Card, CardActionArea, CardActions, CardHeader, Checkbox, IconButton, Paper, Skeleton, Snackbar, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/Authentication'
import AvatarService from '../services/AvatarService'
import { CustomTextField } from './Create'
import { calculateDifference, CardText, convertToTimestamp } from './Recipe'
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const Comment = ({ comment, page }) => {

  const [user, setUser] = useState(localStorage.getItem('user') ? getCurrentUser : null)
  const [likeCount, setLikeCount] = useState()
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  const [userImage, setUserImage] = useState()
  const [commenterImage, setCommenterImage] = useState()

  const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')

  let navigate = useNavigate()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const getLikeBoolean = () => {
    if (user) {
      axios.get('http://localhost:8080/api/v1/comments/isLikedByUser/' + comment.id, { withCredentials: true }).then((response) => {
        setLiked(response.data)
      })
    }
  }

  const getLikeCount = () => {
    axios.get('http://localhost:8080/api/v1/comments/getLikes/' + comment.id).then((response) => {
      setLikeCount(response.data)
      setLoading(false)
    })
  }

  const getUserImage = () => {
    console.log(comment.recipe.appUser.pathToImage)
    if (comment.recipe.appUser.pathToImage !== null && comment.recipe.appUser.pathToImage !== '') {
      axios.get('http://localhost:8080/' + comment.recipe.appUser.pathToImage, { responseType: 'arraybuffer' }).then((response) => {
        var imageUrl = URL.createObjectURL(new Blob([response.data]))
        setUserImage(imageUrl)
      })
    }
  }

  const getCommenterImage = () => {
    console.log(comment.appUser.pathToImage)
    if (comment.appUser.pathToImage !== null && comment.appUser.pathToImage !== '') {
      axios.get('http://localhost:8080/' + comment.appUser.pathToImage, { responseType: 'arraybuffer' }).then((response) => {
        var imageUrl = URL.createObjectURL(new Blob([response.data]))
        setCommenterImage(imageUrl)
      })
    }
  }

  useEffect(() => {
    getLikeBoolean()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getLikeCount()
    getUserImage()
    getCommenterImage()
    console.log(loading)

    const interval = setInterval(() => {
      getLikeCount()
      getUserImage()
      getCommenterImage()
    }, 10000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  const handleCheck = (e) => {
    if (e.target.checked === true) {   
      axios.put('http://localhost:8080/api/v1/users/like', 
      {appUser: user.id, content: comment.id, type: 'comment' }, 
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
      axios.put('http://localhost:8080/api/v1/users/deleteLike', 
      {appUser: user.id, content: comment.id, type: 'comment' }, 
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
        <Paper elevation={4} sx={{ borderRadius: 15, ml: 10, mr: 10, mt: 2, mb: 2 }}>
          <Tooltip title='Author and name of commented recipe'>
          <CardActionArea 
            sx={{ borderRadius: 15 }}
            component={RouterLink}
            to={'/recipe/' + comment.recipe.id}
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
                  navigate('/user/' + comment.recipe.appUser.id)
                }}
                onMouseDown={e => e.stopPropagation()}
              >
              {
              userImage ?
              <Avatar src={userImage}/>     
              :
              <Avatar {...AvatarService.stringAvatar(comment.recipe.appUser.userName)}/>
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
                      <CardText
                      sx={{
                        fontWeight: 'bold',
                        fontSize: 20
                      }}
                    >
                      {(comment.recipe.appUser.firstName && comment.recipe.appUser.lastName) ? comment.recipe.appUser.firstName + ' ' + comment.recipe.appUser.lastName : comment.recipe.appUser.userName}
                    </CardText>
                    {(comment.recipe.appUser.firstName && comment.recipe.appUser.lastName) &&
                    <CardText
                      sx={{
                        color: 'text.secondary'
                        }}
                      >
                        @{comment.recipe.appUser.userName}
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
                        color: 'text.secondary'
                      }}
                    >{comment.recipe.name}</CardText>     
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
            navigate('/user/' + comment.appUser.id)
          }}
          onMouseDown={e => e.stopPropagation()}
        >
        {
        commenterImage ?
        <Avatar src={commenterImage}/>     
        :
        <Avatar {...AvatarService.stringAvatar(comment.appUser.userName)} />
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
              <CardText
              sx={{
                fontWeight: 'bold',
                fontSize: 20
              }}
            >
              {(comment.appUser.firstName && comment.appUser.lastName) ? comment.appUser.firstName + ' ' + comment.appUser.lastName : comment.appUser.userName}
            </CardText>
            {(comment.appUser.firstName && comment.appUser.lastName) &&
            <CardText
              sx={{
                color: 'text.secondary'
                }}
              >
                @{comment.appUser.userName}
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
                color: 'text.secondary'
              }}
            >{calculateDifference(convertToTimestamp(), convertToTimestamp(comment.commentedAt))}</CardText>     
          </React.Fragment>
        }
      />
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
            value={comment.text}
            id="comment-text" 
            variant="outlined"
            multiline
            rows={4}
          />
           }
        </Box>
        {user && 
        <CardActions sx={{ ml: 1, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          {loading ? 
              ( <Skeleton animation="wave" variant="circular" width={40} height={40} />
              ) 
              :
          <Box display='flex' flexDirection='row'>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
              <Tooltip title={liked === true ? 'Remove like from this review' : 'Like this review'}>
                  <IconButton>
                    <Checkbox
                      checked={liked}
                      onChange={handleCheck}
                      icon={<FavoriteBorder sx={{ width: 30, height: 30}} />}
                      checkedIcon={<Favorite sx={{ color: "red", width: 30, height: 30 }} />}
                    />
                  </IconButton>
                </Tooltip>
                    {likeCount > 0 ? 
                    <Typography>{likeCount}</Typography>
                    :
                    <Typography></Typography>       
                    } 
            </Box>
          </Box>
          }
        </CardActions>
        }
      </Card>
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} variant='filled' severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}        
        </Alert>
      </Snackbar>         
    </Box>
  )
}
