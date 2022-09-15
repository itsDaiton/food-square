import React from 'react'
import { Box, Divider, Stack } from "@mui/material";
import { Create } from "../components/Create";
import { Feed } from "../components/Feed";
import { Leftbar } from "../components/Leftbar";
import { Navbar } from "../components/Navbar";
import { Rightbar } from "../components/Rightbar";

export const Home = ({ mode, setMode }) => {
  return (
    <Box className="App" bgcolor={'background.default'} color={'text.primary'}>
    <Navbar></Navbar>
    <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2}}/>} minHeight='93vh'>
      <Leftbar setMode={setMode} mode={mode}></Leftbar>
      <Feed></Feed>
      <Rightbar></Rightbar> 
    </Stack>
    <Create/>
    </Box>
  )
}
