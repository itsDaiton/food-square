import { Box, Divider, Stack } from '@mui/material'
import React from 'react'
import { BackToTop } from '../components/BackToTop'
import { Leftbar } from '../components/Leftbar'
import { Navbar } from '../components/Navbar'
import { Rightbar } from '../components/Rightbar'
import { UserFeed } from '../components/UserFeed'

export const Profile = ({ mode, setMode }) => {

  return (
    <Box className="App" bgcolor={'background.default'} color={'text.primary'} display='flex' flexDirection='column' minHeight='100vh'>
      <Navbar setMode={setMode} mode={mode}></Navbar>
      <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }}/>} flexGrow={1}>
        <Leftbar/>
        <UserFeed/>
        <Rightbar page='discover'/>
      </Stack>
      <BackToTop/>
    </Box>
  )
}
