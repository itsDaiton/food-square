import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, styled} from '@mui/material'
import React from 'react'

export const UserAvatar = styled(Avatar)({
  width: 45, 
  height: 45,
  cursor: 'pointer',
  marginRight: 20
})

export const UserText = styled(Typography)({
  fontFamily: 'Poppins',
  display: 'inline',  
})

const FriendsListItem = ({ fullname, username, picture }) => {
  return (
    <ListItem>
        <ListItemAvatar>
          <UserAvatar src={picture}/>
        </ListItemAvatar>
        <ListItemText primary={
          <UserText component={'span'}
            sx={{
              fontWeight: 'bold',
              fontSize: 20
            }}
          >
            {fullname}
          </UserText>            
        }
        secondary={
          <UserText component={'span'}
            sx={{
              color: 'gray'
              }}
            >
              @{username}
          </UserText>
        }
      />
      </ListItem>
  )  
}

export const Rightbar = () => {
  return (
    <Box
      flex={2}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position='fixed' /*boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px;'*/>
        <Typography component={'span'} variant='h4' sx={{
          fontWeight: 'bold',
        }}
        >
          Friends
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <FriendsListItem fullname={'David Poslušný'} username={'davidposlusny'}  picture={'/resources/Despair.png'} />
          <FriendsListItem fullname={'Antonín Dvořák'} username={'antonindvorak'}  picture={'/resources/KEKW.png'} />
          <FriendsListItem fullname={'Josef Strašný'} username={'josefstrasny'}  picture={'/resources/monkaS.png'} />
          <FriendsListItem fullname={'Tereza Rychlá'} username={'terezarychla'}  picture={'/resources/OkayChamp.png'} />
          <FriendsListItem fullname={'Lucie Pomalá'} username={'luciepomala'}  picture={'/resources/YEP.png'} />
        </List>     
      </Box>
    </Box>
  )
}
