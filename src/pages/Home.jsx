import React, { useEffect, useState } from 'react'
import { Box, Divider, Stack } from "@mui/material";
import { Create } from "../components/Create";
import { Feed } from "../components/Feed";
import { Leftbar } from "../components/Leftbar";
import { Navbar } from "../components/Navbar";
import { Rightbar } from "../components/Rightbar";
import { BackToTop } from '../components/BackToTop';
import { AccessDenied } from './AccessDenied';
import { getCurrentUser } from '../services/Authentication';

export const Home = ({ mode, setMode }) => {

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
        <Feed page='home'/>
        <Rightbar page='home'/>
      </Stack>
      <Create/>
      <BackToTop/>
    </Box>
  )
}
