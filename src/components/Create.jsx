import { 
  Box,
  Modal, 
  styled, 
  Typography,  
  Divider, 
  TextField, 
  Button, 
  ButtonGroup,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction
} from '@mui/material'
import { Send, Restaurant, Description, Forum } from '@mui/icons-material'
import React, { useState } from 'react'
import { UserAvatar, UserText } from './Rightbar'
import { Recipe } from './content/Recipe'
import { Review } from './content/Review'
import { Thread } from './content/Thread'

const CustomModal = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const ModalBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: 16,
})

export const Create = () => {

  const actions = [
    { icon: <Restaurant />, name: 'recipe', tooltip: 'Recipe'},
    { icon: <Description />, name: 'review', tooltip: 'Review' },
    { icon: <Forum />, name: 'thread', tooltip: 'Thread' },
  ];

  const [postType, setPostType] = useState('')
  const [openDial, setOpenDial] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenDial = () => setOpenDial(true);
  const handleCloseDial = () => setOpenDial(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <React.Fragment>
        <SpeedDial
          ariaLabel="Create a new post"
          icon={<SpeedDialIcon />}
          onClick={handleOpenDial}
          onClose={handleCloseDial}
          open={openDial}
          sx={{ 
            position: 'fixed',
            bottom: 25,
            left: { xs: 'calc(100% - 81px)', md: 25},
          }}
        >
        {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.tooltip}
          onClick={e => {
            e.stopPropagation();
            setPostType(action.name)
            handleOpenModal()
          }
          } 
        />
        ))}
        </SpeedDial>  
        <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={600} height={450} bgcolor={'background.default'} color={'text.primary'} borderRadius={5} p={3}>
          <Typography textAlign='center' variant='h6'>Create new {postType}</Typography>
          <Divider sx={{marginBottom: 2, marginTop: 2}}/>
          <ModalBox>
            <UserAvatar
              sx={{marginRight: 1.5}}
              alt="picture" 
              src="/resources/OkayChamp.png" 
            />
            <UserText component={'span'}
              sx={{
                fontWeight: 'bold',
                fontSize: 18
              }}
            >
              David Poslušný
            </UserText>    
          </ModalBox>
          <TextField
          sx={{width: '100%'}}
          id="standard-textarea"
          multiline
          rows={4}
          placeholder="Default Value"
          variant="standard"
        />
        <Typography variant='p'>
          {postType === 'recipe' && <Recipe/>}
          {postType === 'review' && <Review/>} 
          {postType === 'thread' && <Thread/>}             
        </Typography>
        <ButtonGroup
          fullWidth
          sx={{marginTop: 2}}
        >
          <Button variant="contained" endIcon={<Send />}>
            Send
          </Button>             
        </ButtonGroup>    
        </Box>
      </CustomModal> 
    </React.Fragment> 
  )
}
