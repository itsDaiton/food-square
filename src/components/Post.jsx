import { Avatar, Card, CardHeader, CardMedia, CardActions, CardContent, Typography, IconButton, Checkbox, styled} from '@mui/material'
import { Favorite, FavoriteBorder, Share, MoreVert } from '@mui/icons-material'
import React from 'react'

const CardText = styled(Typography)({
  fontFamily: 'Poppins',
  display: 'inline',
  marginRight: 10
})

export const Post = ({ post }) => {
  return (
    post.map(p => (
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
              <CardText>15 minutes ago</CardText>             
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
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
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
  )
}
