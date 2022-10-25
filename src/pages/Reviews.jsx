import { Box, Divider, Stack } from '@mui/material'
import React from 'react'
import { BackToTop } from '../components/BackToTop'
import { Leftbar } from '../components/Leftbar'
import { Navbar } from '../components/Navbar'
import { ReviewFeed } from '../components/ReviewFeed'
import { Rightbar } from '../components/Rightbar'

export const Reviews = ({ mode, setMode}) => {
  return (
    <Box className="App" bgcolor={'background.default'} color={'text.primary'} display='flex' flexDirection='column' minHeight='100vh'>
      <Navbar setMode={setMode} mode={mode}></Navbar>
      <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }}/>} flexGrow={1}>
        <Leftbar/>
        <ReviewFeed/>
        <Rightbar page='discover'/>
      </Stack>
      <BackToTop/>
    </Box>
  )
}
