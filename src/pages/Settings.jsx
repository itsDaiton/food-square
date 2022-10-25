import { Box, Divider, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Leftbar } from '../components/Leftbar'
import { Navbar } from '../components/Navbar'
import { SettingsContent } from '../components/SettingsContent'
import { getCurrentUser } from '../services/Authentication'
import { AccessDenied } from './AccessDenied'

export const Settings = ({ mode, setMode }) => {

  const [user, setUser] = useState(localStorage.getItem('user') ? getCurrentUser : null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  if (!user) {
    return <AccessDenied/>
  }

  return (
    <Box className="App" bgcolor={'background.default'} color={'text.primary'} display='flex' flexDirection='column' minHeight='100vh'>
      <Navbar setMode={setMode} mode={mode}></Navbar>
      <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }}/>} flexGrow={1}>
        <Leftbar/>
        <SettingsContent userId={user.id}/>
      </Stack>
    </Box>
  )
}
