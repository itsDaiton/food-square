import { 
  Box,
  Modal, 
  styled, 
  Typography,  
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction
} from '@mui/material'
import { Restaurant, Description, Forum } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { UserAvatar, UserText } from './Rightbar'
import { Recipe } from './content/Recipe'
import { Review } from './content/Review'
import { Thread } from './content/Thread'
import Authentication from '../services/Authentication'

const CustomModal = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const ModalBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 20,
  marginTop: 20
})

export const Create = () => {

  const actions = [
    { icon: <Restaurant />, name: 'recipe', tooltip: 'Recipe'},
    { icon: <Description />, name: 'review', tooltip: 'Review' },
    { icon: <Forum />, name: 'thread', tooltip: 'Thread' },
  ];

  const [postType, setPostType] = useState('')
  const [openDial, setOpenDial] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const [user, setUser] = useState()

  useEffect(() => {
    const currentUser = Authentication.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleOpenDial = () => setOpenDial(true)
  const handleCloseDial = () => setOpenDial(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    user &&
    <React.Fragment>
        <SpeedDial
          ariaLabel="Create a new post"
          icon={<SpeedDialIcon />}
          onOpen={handleOpenDial}
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
            setPostType(action.name)
            handleOpenModal()
            e.stopPropagation()
          }
          } 
        />
        ))}
        </SpeedDial>  
        <CustomModal
        disableRestoreFocus
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={600} height={'auto'} bgcolor={'background.default'} color={'text.primary'} borderRadius={5} p={3}>
          <Typography textAlign='center' variant='h6'>Create new {postType}</Typography>
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
        <Typography variant='p'>
          {postType === 'recipe' && <Recipe handleCloseModal={handleCloseModal}/>}
          {postType === 'review' && <Review handleCloseModal={handleCloseModal}/>} 
          {postType === 'thread' && <Thread handleCloseModal={handleCloseModal}/>}             
        </Typography>   
        </Box>
      </CustomModal> 
    </React.Fragment>
  )
}
