import { Box, Divider, Stack } from '@mui/material'
import React from 'react'
import { Leftbar } from '../components/Leftbar'
import { Rightbar } from "../components/Rightbar";
import { Navbar } from "../components/Navbar";
import { Feed } from "../components/Feed";
import { BackToTop } from '../components/BackToTop';
import { Create } from '../components/Create';

export const Discover = ({ mode, setMode }) => {
  return (
    <Box className="App" bgcolor={'background.default'} color={'text.primary'} display='flex' flexDirection='column' minHeight='100vh'>
      <Navbar setMode={setMode} mode={mode}></Navbar>
      <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }}/>} flexGrow={1}>
        <Leftbar/>
        <Feed page='discover'/>
        <Rightbar page='discover'/>
      </Stack>
      <Create/>
      <BackToTop/>
    </Box>
  )
}
