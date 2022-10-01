import { 
  Box,
  Modal, 
  styled, 
  Typography,  
  Fab,
  Tooltip
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserAvatar, UserText } from './Rightbar'
import { Add } from './Add'
import Authentication from '../services/Authentication'
import AddIcon from '@mui/icons-material/Add';

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

  const [openModal, setOpenModal] = useState(false)

  const [user, setUser] = useState()

  useEffect(() => {
    const currentUser = Authentication.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    user &&
    <React.Fragment>
      <Tooltip title='Create a new recipe' placement='right'>
        <Fab 
          color="primary" 
          aria-label='Create a new recipe'
          size='large'
          onClick={handleOpenModal}
          sx={{
            position: 'fixed',
            bottom: 25,
            left: { xs: 'calc(100% - 81px)', md: 25},
        }}>
          <AddIcon />
        </Fab>
      </Tooltip>
        <CustomModal
        disableRestoreFocus
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={600} height={'auto'} bgcolor={'background.default'} color={'text.primary'} borderRadius={5} p={3}>
          <Typography textAlign='center' variant='h6'>Create new Recipe</Typography>
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
          <Add handleCloseModal={handleCloseModal}/>        
        </Typography>   
        </Box>
      </CustomModal> 
    </React.Fragment>
  )
}
