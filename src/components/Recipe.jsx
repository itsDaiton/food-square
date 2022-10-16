import { 
  Avatar, 
  Card, 
  CardHeader, 
  CardMedia, 
  CardActions, 
  CardContent, 
  Typography, 
  IconButton, 
  styled, 
  Divider, 
  useMediaQuery,
  useTheme,
  Tooltip,
  Dialog,
  FormControl,
  Rating,
  Button,
  Snackbar,
  Alert,
  MenuItem,
  Menu,
  ListItemIcon,
  CardActionArea,
  Link,
  Collapse,
  Tab,
  Tabs,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Skeleton,
  TableHead,
  Paper,
} from '@mui/material'
import { 
  MoreVert,
  ChatOutlined,
  RateReviewOutlined,
  StarBorderOutlined,
  PersonAdd,
  PersonRemove,
  BookmarkAdd,
  BookmarkRemove,
  Edit,
  Delete,
  AccessAlarm,
  ReceiptLongOutlined,
  Equalizer,
  Restaurant,
  ErrorOutline,
 } from '@mui/icons-material'
import React, { useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Box } from '@mui/system';
import axios from 'axios';
import { CustomTextField } from './Create';
import { getCurrentUser } from '../services/Authentication';
import AvatarService from '../services/AvatarService'
import { useNavigate } from 'react-router';

export const CardText = styled(Typography)({
  fontFamily: 'Poppins',
  display: 'inline',
  marginRight: 10
})

export const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const values = {
  minute: 60,
  hour: (60 * 60),
  day: (60 * 60 * 24),
  month: (60 * 60 * 24 * (365/12)),
  year: (60 * 60 * 24 * 365)
}

export const convertToTimestamp = (date) => {
  let ret

  if (date !== undefined) {
    ret = Math.floor(new Date(date).getTime() / 1000)
  }
  else {
    ret = Math.floor(new Date().getTime() / 1000)
  }
  return ret
}

export const calculateDifference = (date1, date2) => {
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

export const Recipe = ({ recipe }) => {

  const defaultReview = {
    text: '',
    rating: 0,
    appUser: '',
    recipe: ''
  }

  const defaultComment = {
    text: '',
    appUser: '',
    recipe: ''    
  }

  const theme = useTheme()
  const [reviewCount, setReviewCount] = useState()
  const [commentCount, setCommentCount] = useState()
  const [averageRating, setAverageRating] = useState()

  let navigate = useNavigate()

  const navigateLogin = () => {
    navigate('/login')
  }

  const navigateRegister = () => {
    navigate('/register')
  }

  const [recipeIngredients, setRecipeIngredients] = useState([])

  const [user, setUser] = useState(localStorage.getItem('user') ? getCurrentUser : null)

  const [openReviewDialog, setOpenReviewDialog] = useState(false)
  const [openCommentDialog, setOpenCommentDialog] = useState(false)
  const [openIngredientDialog, setOpenIngredientDialog] = useState(false)
  const [openErrorDialog, setOpenErrorDialog] = useState(false)

  const [reviewInputs, setReviewInputs] = useState(defaultReview)
  const [commentInputs, setCommentInputs] = useState(defaultComment)

  const [ratingError, setRatingError] = useState('')
  const [reviewTextError, setReviewTextError] = useState('')
  const [commentTextError, setCommentTextError] = useState('')

  const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')

  const [checkFollow, setCheckFollow] = useState(null)
  const [checkFavorite, setCheckFavorite] = useState()
  const [checkReview, setCheckReview] = useState()

  const [menuItem, setMenuItem] = useState(null)

  const [mode, setMode] = useState('add')

  const [reviewId, setReviewId] = useState(null)

  const [expanded, setExpanded] = useState(false)

  const [tab, setTab] = useState(1)

  const [loading, setLoading] = useState(true)

  const [selectedIngredient, setSelectedIngredient] = useState(null)

  const tiny = useMediaQuery(theme.breakpoints.down(500))

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const getReviewCount = () => {
    axios.get('http://localhost:8080/api/v1/reviews/getCountByRecipe/' + recipe.id).then((response) => {
      setReviewCount(response.data)
    })
  }

  const getCommentCount = () => {
    axios.get('http://localhost:8080/api/v1/comments/getCountByRecipe/' + recipe.id).then((response) => {
      setCommentCount(response.data)
    })
  }

  const getAverageRating = () => {
    axios.get('http://localhost:8080/api/v1/reviews/getAvgRating/' + recipe.id).then((response) => {
      setAverageRating(response.data)
    })
  }

  const getFollowCheck = () => {
    if (user) {
      axios.get('http://localhost:8080/api/v1/follows/follows/' + recipe.appUser.id , { withCredentials: true }).then((response) => {
        setCheckFollow(response.data)
      })
    }
  }

  const getFavoriteCheck = () => {
    if (user) {
      axios.get('http://localhost:8080/api/v1/users/checkFavorite/' + recipe.id, { withCredentials: true }).then((response) => {
        setCheckFavorite(response.data)
      })
    }
  }

  const getReviewCheck = () => {
    if (user) {
      axios.get('http://localhost:8080/api/v1/reviews/containsReview/' + recipe.id, { withCredentials: true }).then((response) => {
        setCheckReview(response.data)
      })
    }
  }

  const getRecipeIngredients = () => {
    axios.get('http://localhost:8080/api/v1/recipe-ingredients/getByRecipe/' + recipe.id).then((response) => {
      setRecipeIngredients(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getFollowCheck()
    getFavoriteCheck()
    getReviewCheck()
    getRecipeIngredients()
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    getReviewCount()
    getCommentCount()
    getAverageRating()
    getRecipeIngredients()

    const interval = setInterval(() => {
      getReviewCount()
      getCommentCount()
      getAverageRating()
    }, 10000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  const handleOpenMenuMore = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setMenuItem(e.currentTarget)
  }

  const handleCloseMenuMore = (e) => {
    setMenuItem(null)
  }

  const clearReviewErrors = () => {
    setRatingError('')
    setReviewTextError('')
  }
  const clearCommentErrors = () => {
    setCommentTextError('')
  }

  const handleOpenErrorDialog = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setOpenErrorDialog(true)
  }

  const handleCloseErrorDialog = (e) => {
    setOpenErrorDialog(false)
  }

  const handleOpenReviewDialog = (e) => {
    setOpenAlert(false)
    setOpenReviewDialog(true)
    setReviewInputs({
      ...reviewInputs,
      appUser: user.id,
      recipe: recipe.id
    })
    handleCloseMenuMore()
  }

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false)
    setReviewInputs(defaultReview)
    clearReviewErrors()
    handleCloseAlert()
  }

  const handleOpenCommentDialog = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setOpenAlert(false)
    setOpenCommentDialog(true)
    setCommentInputs({
      ...commentInputs,
      appUser: user.id,
      recipe: recipe.id
    })
  }

  const handleCloseCommentDialog = () => {
    setOpenCommentDialog(false)
    setCommentInputs(defaultComment)
    clearCommentErrors()
    handleCloseAlert()
  }

  const handleOpenIngredientDialog = (e) => {
    setOpenAlert(false)
    setOpenIngredientDialog(true)
  }

  const handleCloseIngredientDialog = (e) => {
    setOpenIngredientDialog(false)
    setSelectedIngredient(null)
    handleCloseAlert()
  }

  const handleReviewChange = (e) => {
    setReviewInputs({
      ...reviewInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleRatingChange = (value) => {
    setReviewInputs({
      ...reviewInputs,
      rating: value
    })
  }

  const handleCommentChange = (e) => {
    setCommentInputs({
      ...commentInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()

    if (mode === 'add') {
      axios.post('http://localhost:8080/api/v1/reviews/add', reviewInputs, { withCredentials: true }).then((response) => {
        handleCloseReviewDialog()
        setAlertMessage(response.data.message)
        setAlertType('success')
        setOpenAlert(true)
        getReviewCount()
        getReviewCheck()
        getAverageRating() 
      }).catch((error) => {
        clearReviewErrors()
        if (error.response.data.errorList) {
          error.response.data.errorList.forEach(err => {
            if (err.field === 'text') {
              setReviewTextError(err.message)
            }
            if (err.field === 'rating') {
              setRatingError(err.message)     
            }
          })
          setAlertMessage('Something went wrong. Please check individual fields for error description.')
          setAlertType('error')
          setOpenAlert(true) 
        }
        else {
          setAlertMessage(error.response.data.message)
          setAlertType('error')
          setOpenAlert(true)
        }
      })
    }
    else {
      axios.put('http://localhost:8080/api/v1/reviews/update/' + reviewId, 
      { text: reviewInputs.text, rating: reviewInputs.rating },
      { withCredentials: true }).then((response) => {
        handleCloseReviewDialog()
        setAlertMessage(response.data.message)
        setAlertType('success')
        setOpenAlert(true)
        getReviewCount()
        getReviewCheck()
        getAverageRating()     
      }).catch((error) => {
        clearReviewErrors()
        if (error.response.data.errorList) {
          error.response.data.errorList.forEach(err => {
            if (err.field === 'text') {
              setReviewTextError(err.message)
            }
            if (err.field === 'rating') {
              setRatingError(err.message)     
            }
          })
          setAlertMessage('Something went wrong. Please check individual fields for error description.')
          setAlertType('error')
          setOpenAlert(true) 
        }
        else {
          setAlertMessage(error.response.data.message)
          setAlertType('error')
          setOpenAlert(true)
        }
      })
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8080/api/v1/comments/add', commentInputs, { withCredentials: true }).then((response) => {
      handleCloseCommentDialog()
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)
      getCommentCount()
    }).catch((error) => {
      if (error.response.data.errorList) {
        clearCommentErrors()
        error.response.data.errorList.forEach(err => {
          if (err.field === 'text') {
            setCommentTextError(err.message)
          }
        })
        setAlertMessage('Something went wrong. Please check individual fields for error description.')
        setAlertType('error')
        setOpenAlert(true)
      }
    })
  }

  const handleFollow = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8080/api/v1/follows/follow', 
    { follower: user.id, followed: recipe.appUser.id }, 
    { withCredentials: true }).then((response) => {
      handleCloseMenuMore()
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)
      getFollowCheck()
    }).catch((error) => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)    
    })
  }

  const handleUnfollow = (e) => {
    e.preventDefault()
    
    axios.delete('http://localhost:8080/api/v1/follows/unfollow/' + recipe.appUser.id, { withCredentials: true }).then((response) => {
      setAlertMessage(response.data.message)
      handleCloseMenuMore() 
      setAlertType('success')
      setOpenAlert(true)
      getFollowCheck()
    }).catch((error) => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)  
    })
  }

  const handleFavorite = (e) => {
    e.preventDefault()

    axios.put('http://localhost:8080/api/v1/users/favoriteRecipe',
    { appUser: user.id, recipe: recipe.id },
    { withCredentials: true }).then((response) => {
      handleCloseMenuMore()
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)  
      getFavoriteCheck()
    }).catch((error) => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)    
    })
  }

  const handleUnfavorite = (e) => {
    e.preventDefault()

    axios.put('http://localhost:8080/api/v1/users/unfavoriteRecipe',
    { appUser: user.id, recipe: recipe.id },
    { withCredentials: true }).then((response) => {
      handleCloseMenuMore()
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)
      getFavoriteCheck() 
    }).catch((error) => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)    
    })
  }

  const handleReviewDelete = (e) => {
    e.preventDefault()

    axios.delete('http://localhost:8080/api/v1/reviews/deleteForUser/' + recipe.id, { withCredentials: true }).then((response) => {
      setAlertMessage(response.data.message)
      setAlertType('success')
      setOpenAlert(true)
      getReviewCheck()
      getReviewCount()
      getAverageRating()
      handleCloseMenuMore() 
    }).catch((error) => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)  
    })
  }

  const handleReviewAdd = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setMode('add')
    handleOpenReviewDialog()
  }

  const handleReviewEdit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setMode('edit')

    axios.get('http://localhost:8080/api/v1/reviews/getByRecipe/' + recipe.id, { withCredentials: true }).then((response) => {
      setReviewInputs({
        ...reviewInputs,
        text: response.data.text,
        rating: response.data.rating
      })
      setReviewId(response.data.id)
    }).catch((error) => {
      setAlertMessage(error.response.data.message)
      setAlertType('error')
      setOpenAlert(true)    
    })
    handleOpenReviewDialog()
  }

  const handleExpandClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setExpanded(!expanded)
  }

  const handleTabChange = (e, newValue) => {
    setTab(newValue)
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  const loadTabsContent = (num) => {
    switch (num) {
      case 1:
        return (
          <Box>
            <Box display='flex'>
              <Typography paragraph mr={1}>
                Instructions
              </Typography>
              <ReceiptLongOutlined/>
            </Box>
            <Typography paragraph sx={{ mb: 4, ml: 2, mt: 2 }} variant='body2'>
              {recipe.instructions}
            </Typography>
            <Box display='flex'>
              <Typography paragraph mr={1}>
                Type
              </Typography>
              <Restaurant/>
            </Box>
            <Typography paragraph sx={{ mb: 4, ml: 2, mt: 2 }} variant='body2'>
              {editStringFormat(recipe.meal)}
            </Typography>
            <Box display='flex'>
              <Typography paragraph mr={1}>
                Preparation time
              </Typography>
              <AccessAlarm/>
            </Box>
            <Typography paragraph sx={{ mb: 4, ml: 2, mt: 2 }} variant='body2'>
              {recipe.timeToPrepare} minutes
            </Typography>
            <Box display='flex'>
              <Typography paragraph mr={1}>
                Cooking time 
              </Typography>
              <AccessAlarm/>
            </Box>
            <Typography paragraph sx={{ ml: 2, mt: 2 }} variant='body2'>
              {recipe.timeToCook} minutes 
            </Typography>
          </Box>
        )
      case 2:
        return (
          <TableContainer>
            <Table>
              <TableBody>
                {recipe.categories.map(c => (
                  <TableRow key={c.name}>
                    <TableCell>{editStringFormat(c.name)}</TableCell>
                  </TableRow>
                ))}           
            </TableBody>            
          </Table>
        </TableContainer>
        )
      case 3:
        if (!recipeIngredients.length > 0 ) {
          return <Typography sx={{ m: 2 }}>This recipe does not contain any ingredients.</Typography>
        }
        return (
          <Box>
            <Typography sx={{ m: 2 }}>Content per <b>100g</b> edible portion.</Typography>
            <Box justifyContent='center' display='flex'>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Ingredient</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Composition</TableCell>                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipeIngredients.map((ri) => (
                    <TableRow
                      key={ri.ingredient.code}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{ri.ingredient.name}</TableCell>
                      <TableCell align="center">{ri.amount}x</TableCell>
                      <TableCell align="center">
                        <Tooltip title='Show full details'>
                          <IconButton onClick={() => {
                            setSelectedIngredient(ri.ingredient)
                            handleOpenIngredientDialog()
                            }}
                          >
                            <Equalizer sx={{ width: 38, height: 38, color: 'text.primary' }}/>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>                       
            </Box>                
          </Box>
        )
      default:
        return (
        <Typography>Error - this tab does not exist.</Typography>
        )
    }
  }

  const editStringFormat = (string) => {
    const words = string.replace('_', ' ').toLowerCase().split(' ')

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1)
    }

    return words.join(' ')
  }

  return (
    <React.Fragment>
      <Card sx={{margin: {md: 5, xs: 2}, borderRadius: 5}} elevation={10}>
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
          action={
            loading ? null :
            user &&
            <IconButton aria-label="settings" onClick={handleOpenMenuMore} onMouseDown={e => e.stopPropagation()}>
              <MoreVert />
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
                  color: 'text.secondary'
                }}
              >{calculateDifference(convertToTimestamp(), convertToTimestamp(recipe.updatedAt))}</CardText>     
            </React.Fragment>
          }
        />
        <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={menuItem}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(menuItem)}
              onClose={handleCloseMenuMore}
              onClick={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
            >
              {checkFollow === false ?
              <MenuItem onClick={handleFollow} disabled={checkFollow === null ? true : false}>
                <ListItemIcon>
                  <PersonAdd fontSize="small"/>
                </ListItemIcon>
                Follow user @{recipe.appUser.userName}
              </MenuItem>
              :
              <MenuItem onClick={handleUnfollow} disabled={checkFollow === null ? true : false}>
                <ListItemIcon>
                  <PersonRemove fontSize="small"/>
                </ListItemIcon>
                Unfollow user @{recipe.appUser.userName}
              </MenuItem>
              }
              {checkFavorite === false ?
              <MenuItem onClick={handleFavorite} disabled={checkFavorite === null ? true : false}>
                <ListItemIcon>
                  <BookmarkAdd fontSize="small" />
                </ListItemIcon>
                Favorite this recipe
              </MenuItem>
              :
              <MenuItem onClick={handleUnfavorite} disabled={checkFavorite === null ? true : false}>
                <ListItemIcon>
                  <BookmarkRemove fontSize="small" />
                </ListItemIcon>
                Unfavorite this recipe
              </MenuItem>
              }
              {checkReview === true &&
                <MenuItem onClick={handleReviewEdit}>
                  <ListItemIcon>
                    <Edit fontSize="small" />
                  </ListItemIcon>
                  Edit your review
                </MenuItem>
              }     
              {checkReview === true &&
                <MenuItem onClick={handleReviewDelete}>
                  <ListItemIcon>
                    <Delete fontSize="small" />
                  </ListItemIcon>
                  Delete your review
                </MenuItem>
              }
            </Menu>
        {/*{p.appUser.pathToImage &&*/}
        {loading ? 
        (
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>     
        ) 
        :
        <CardMedia
          component="img"
          height={'20%'}
          width='auto'
          image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Paella dish"
        />
        }
        {/*}*/}
        <CardContent>
          <Box display='flex' flexDirection='row' justifyContent='space-between'>
            {loading ?
            (
              <Skeleton
                animation="wave"
                height={34}
                width="50%"
              />
            )     
            :
            <Typography variant='h6'>
              {recipe.name}
            </Typography>
            }
            {loading ? 
            (
              <Skeleton
                animation="wave"
                height={34}
                width="20%"
              />
            )
            :
            averageRating >= 1.0 ?
            <Box display='flex' alignItems='center'>     
              <Typography variant='h6' sx={{ mr: 1, fontWeight: 'bold' }}>{averageRating}</Typography>
              <Rating readOnly value={averageRating} precision={0.5} size='large' />
            </Box>
            :
            <Box display='flex' alignItems='center'>
              <Typography variant='body1' sx={{ mr: 1 }}>No reviews yet.</Typography>
              <StarBorderOutlined sx={{ width: 35, height: 35 }} />
            </Box>     
            }       
          </Box>
          <Divider sx={{ mt: 2, mb: 2 }}/>
          {loading ? 
          (
            <Skeleton
                animation="wave"
                height={34}
                width="100%"
              />
          )
          :
          <Typography variant="body1">
            {recipe.description}
          </Typography> 
          }  
        </CardContent>
        <CardActions sx={{ ml: 1, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Box display='flex' flexDirection='row'>
            {loading ? 
            (<Skeleton animation="wave" variant="circular" width={45} height={45} sx={{ m: 2 }} />)
            :
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
              <Tooltip title='Add a review'>
                <IconButton 
                  aria-label="reviews" 
                  onClick={user ? handleReviewAdd : handleOpenErrorDialog} 
                  onMouseDown={e => e.stopPropagation()}
                >
                  <RateReviewOutlined sx={{ width: 38, height: 38, color: 'text.primary' }} />
                </IconButton>
              </Tooltip>
              {reviewCount > 0 ? 
              <Typography sx={{ mr: 3, ml: 1 }}>{reviewCount}</Typography>
              :
              <Typography sx={{ mr: 4, ml: 1 }}></Typography>       
            } 
            </Box>
            }
            {loading ? 
            (<Skeleton animation="wave" variant="circular" width={45} height={45} sx={{ m: 2 }} />)
            :
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
              <Tooltip title='Add a comment'>
                <IconButton
                  aria-label="comments" 
                  onClick={user ? handleOpenCommentDialog : handleOpenErrorDialog} 
                  onMouseDown={e => e.stopPropagation()}
                >
                  <ChatOutlined sx={{ width: 38, height: 38, color: 'text.primary' }}/>
                </IconButton>
              </Tooltip>
              {commentCount > 0 ?
              <Typography sx={{ mr: 3, ml: 1 }}>{commentCount}</Typography>
              :
              <Typography sx={{ mr: 4, ml: 1 }}></Typography>
              }
            </Box>
            }
          </Box>
          {loading ? (<Skeleton animation="wave" variant="circular" width={45} height={45} sx={{ m: 2 }} />)
          : 
          <ExpandMore
            aria-label="show more"
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            onMouseDown={e => e.stopPropagation()}
          >
            <Tooltip title={expanded ? 'Hide details' : 'Show details'}>
              <ExpandMoreIcon sx={{ width: 38, height: 38, color: 'text.primary' }}/>
            </Tooltip>
          </ExpandMore>
          }  
        </CardActions>
        </CardActionArea>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider/>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant='fullWidth'
            orientation={tiny ? 'vertical' : 'horizontal'}
          >
            <Tab value={1} label="Details" sx={{ typography: 'body1' }}/>
            <Tab value={2} label="Categories" sx={{ typography: 'body1' }}/>
            <Tab value={3} label="Ingredients" sx={{ typography: 'body1' }}/>
          </Tabs>
          <CardContent>
            {loadTabsContent(tab)}
          </CardContent>
      </Collapse>
      </Card>
      <Dialog
        disableRestoreFocus
        open={openReviewDialog}
        onClose={handleCloseReviewDialog}
        scroll='paper'
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: 25 }
        }}
      >
        <Box bgcolor={'background.default'} color={'text.primary'} p={3}>
          <Typography textAlign='center' variant='h6' sx={{ fontWeight: 'bold', mb: 5 }}>{mode === 'add' ? 'Add a review' : 'Edit a review'}</Typography>
          <Box display='flex' flexDirection={tiny ? 'column' : 'row'} justifyContent='start' alignItems='center' sx={{ }}>
            <CardHeader
              sx={{ p: 0 }}
              avatar={
                <Avatar {...AvatarService.stringAvatar(recipe.appUser.userName)}/>
              }
              title={
                <Box display='flex' flexDirection={tiny ? 'column' : 'row'} justifyContent='start' alignItems='center'>
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
                </Box>
              }
            />
            <Box mt={tiny ? 2 : 0}>
            {!tiny &&                   
                  <CardText
                    sx={{
                      color: 'text.secondary',
                      fontSize: 20
                    }}
                  >·</CardText>
                  }
                  <CardText
                    sx={{
                      color: 'text.primary'
                    }}
                  >{recipe.name}</CardText>               
            </Box>
          </Box>
          <FormControl fullWidth sx={{ mt: 4 }}>
            <CustomTextField
              error={reviewTextError ? true : false}
              helperText={reviewTextError}
              value={reviewInputs.text}
              onChange={handleReviewChange}
              name='text'
              id="review-text" 
              label='Review'
              variant="outlined"
              placeholder='Share your opinion about this recipe'
              multiline
              rows={4}
            />
            <Typography variant='body1' gutterBottom sx={{ m: 1, mt: 2 }} color={ratingError ? 'error' : ''}>
              Rating
            </Typography>
            <Rating
              size='large'
              sx={{
                m: 1
              }}
              name="rating"
              value={reviewInputs.rating}
              onChange={(e, newValue) => handleRatingChange(newValue)}
            />
            {ratingError ? <Typography color='error' variant='body2' sx={{ m: 1 }}>{ratingError}</Typography> : ''}
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant='contained' 
              sx={{ mt: 3, ml: 1, mr: 1 }} 
              onClick={handleReviewSubmit}>
                {mode === 'add' ? 'Submit' : 'Confirm'}
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        disableRestoreFocus
        open={openCommentDialog}
        onClose={handleCloseCommentDialog}
        scroll='paper'
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: 25 }
        }}
      >
        <Box bgcolor={'background.default'} color={'text.primary'} p={3}>
          <Typography textAlign='center' variant='h6' sx={{ fontWeight: 'bold', mb: 5 }}>Add a comment</Typography>
          <Box display='flex' flexDirection={tiny ? 'column' : 'row'} justifyContent='start' alignItems='center'>
            <CardHeader
                sx={{ p: 0 }}
                avatar={
                  <Avatar {...AvatarService.stringAvatar(recipe.appUser.userName)}/>
                }
                title={
                  <Box display='flex' flexDirection={tiny ? 'column' : 'row'} justifyContent='start' alignItems='center'>
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
                  </Box>
                }
              />
              <Box mt={tiny ? 2 : 0}>
              {!tiny &&                   
                    <CardText
                      sx={{
                        color: 'text.secondary',
                        fontSize: 20
                      }}
                    >·</CardText>
                    }
                    <CardText
                      sx={{
                        color: 'text.primary'
                      }}
                    >{recipe.name}</CardText>               
              </Box>
          </Box>
          <FormControl fullWidth sx={{ mt: 4 }}>
                <CustomTextField
                  error={commentTextError ? true : false}
                  helperText={commentTextError}
                  value={commentInputs.text}
                  onChange={handleCommentChange}
                  name='text'
                  id="comment-text" 
                  label='Comment'
                  variant="outlined"
                  placeholder='What do you have in mind?'
                  multiline
                  rows={6}
                />
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' sx={{ mt: 3, ml: 1, mr: 1 }} onClick={handleCommentSubmit}>Submit</Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        disableRestoreFocus
        open={openErrorDialog}
        onClose={handleCloseErrorDialog}
        scroll='paper'
        fullWidth
        maxWidth="xs"
        PaperProps={{ style: {borderRadius: 25 } }}
      >
        <Box bgcolor={'background.default'} color={'text.primary'} p={3}>
          <Typography textAlign='center' variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Acess Denied</Typography>
          <Box display='flex' justifyContent='center'>
            <ErrorOutline sx={{ fontSize: 60 }} color='error'/>
          </Box>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
          >
            <Typography sx={{ m: 2 }}>Please either login or register.</Typography>
            <Box display='flex' flexDirection='row'>     
              <Button variant="contained" onClick={navigateRegister} sx={{ m: 1 }}>Register</Button>
              <Button variant="contained" onClick={navigateLogin} sx={{ m: 1 }}>Login</Button>
            </Box>
          </Box>
        </Box>   
      </Dialog>
      {selectedIngredient &&
      <Dialog
        disableRestoreFocus
        open={openIngredientDialog}
        onClose={handleCloseIngredientDialog}
        scroll='paper'
        fullWidth
        maxWidth="md"  
      >
        <Box bgcolor={'background.default'} color={'text.primary'} p={3}>
          <Typography textAlign='center' variant='h6' sx={{ fontWeight: 'bold' }}>{selectedIngredient.name}</Typography>
          <Typography sx={{ m: 2 }}>Content per <b>100g</b> edible portion.</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Component</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Value</TableCell>                
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Calories</TableCell>
                  <TableCell align="center">{selectedIngredient.calories} [kcal]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fat</TableCell>
                  <TableCell align="center">{selectedIngredient.fat} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fatty acids, saturated</TableCell>
                  <TableCell align="center">{selectedIngredient.saturatedFattyAcids} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fatty acids, monounsaturated</TableCell>
                  <TableCell align="center">{selectedIngredient.monounsaturatedFattyAcids} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fatty acids, polyunsaturated</TableCell>
                  <TableCell align="center">{selectedIngredient.polyunsaturatedFattyAcids} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fatty acids, trans</TableCell>
                  <TableCell align="center">{selectedIngredient.transFattyAcids} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Carbohydrate (total)</TableCell>
                  <TableCell align="center">{selectedIngredient.carbohydrateTotal} [g]</TableCell>
                </TableRow>    
                <TableRow>
                  <TableCell>Carbohydrate (available)</TableCell>
                  <TableCell align="center">{selectedIngredient.carbohydrateAvailable} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fibre</TableCell>
                  <TableCell align="center">{selectedIngredient.fibre} [g]</TableCell>
                </TableRow> 
                <TableRow>
                  <TableCell>Sugar</TableCell>
                  <TableCell align="center">{selectedIngredient.sugar} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Protein</TableCell>
                  <TableCell align="center">{selectedIngredient.protein} [g]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sodium</TableCell>
                  <TableCell align="center">{selectedIngredient.sodium} [mg]</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Salt</TableCell>
                  <TableCell align="center">{selectedIngredient.salt} [g]</TableCell>
                </TableRow>  
                <TableRow>
                  <TableCell>Water</TableCell>
                  <TableCell align="center">{selectedIngredient.water} [g]</TableCell>
                </TableRow>         
              </TableBody>
            </Table>
          </TableContainer> 
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' sx={{ mt: 3, ml: 1, mr: 1 }} onClick={handleCloseIngredientDialog}>Close</Button>
          </Box>
        </Box>
      </Dialog>
      }
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} variant='filled' severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}        
        </Alert>
      </Snackbar>
    </React.Fragment>
    )
  }
