import { Box, Divider, Stack } from '@mui/material'
import React from 'react'
import { Leftbar } from '../components/Leftbar'
import { Navbar } from '../components/Navbar'
import { Rightbar } from '../components/Rightbar'
import { UserList } from '../components/UserList'

export const Followers = ({ mode, setMode }) => {

  return (
    <Box className="App" bgcolor={'background.default'} color={'text.primary'} display='flex' flexDirection='column' minHeight='100vh'>
      <Navbar setMode={setMode} mode={mode}></Navbar>
      <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }}/>} flexGrow={1}>
        <Leftbar/>
				<UserList type='followers'/>
        <Rightbar page='discover'/>
      </Stack>
    </Box>
  )
}
