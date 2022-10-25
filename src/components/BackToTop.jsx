import { ArrowUpward } from '@mui/icons-material'
import { 
  Fade, 
  useScrollTrigger, 
  Fab, 
  Tooltip 
} 
from '@mui/material'
import React from 'react'

export const BackToTop = () => {

  const trigger = useScrollTrigger()

  const handleClick = (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Tooltip title='Scroll back to top' placement='left'>
      <Fade in={trigger}>
      <Fab
          color='info'
          onClick={handleClick}
          role="presentation"
          size='large'
          sx={{ position: 'fixed', bottom: 25, right: 25 }}
      >
        <ArrowUpward/>
      </Fab>
      </Fade>
    </Tooltip>
  )
}
