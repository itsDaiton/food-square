import { Box, Fab, IconButton, Modal, Tooltip, styled, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Divider, TextField, Button, ButtonGroup} from '@mui/material'
import { Add, Send } from '@mui/icons-material'
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

  const [open, setOpen] = useState(false)
  const [postType, setPostType] = useState('recipe')

  return (
    <React.Fragment>
      <Tooltip 
        onClick={(e) => setOpen(true)}
        title="Create a post" 
        sx={{ 
          position: 'fixed',
          bottom: 25,
          left: { xs: 'calc(100% - 105px)', md: 25}
        }}
        >
        <IconButton>
          <Fab color="primary" aria-label="add" sx={{ width: 70, height: 70 }}>
            <Add/>
          </Fab>
        </IconButton>
      </Tooltip>
      <CustomModal
        open={open}
        onClose={(e) => {setOpen(false); setPostType('recipe')}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={600} height={450} bgcolor={'background.default'} color={'text.primary'} borderRadius={5} p={3}>
          <Typography textAlign='center' variant='h6'>Create a post</Typography>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <FormControl>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="recipe"
                row
              >
                <FormControlLabel onChange={(e) => {setPostType(e.target.value)}} value="recipe" labelPlacement="bottom" control={<Radio />} label="Recipe" />
                <FormControlLabel onChange={(e) => {setPostType(e.target.value)}} value="review" labelPlacement="bottom" control={<Radio />} label="Review" />
                <FormControlLabel onChange={(e) => {setPostType(e.target.value)}} value="thread" labelPlacement="bottom" control={<Radio />} label="Thread" />
              </RadioGroup>
            </FormControl>
          </Box>
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
