import { Box, Divider, Stack } from '@mui/material'
import React from 'react'
import { Leftbar } from '../components/Leftbar'
import { MealPlanner } from '../components/MealPlanner'
import { Navbar } from '../components/Navbar'
import { Rightbar } from '../components/Rightbar'
import { BackToTop } from '../components/BackToTop';

export const MealPlanning = ({ mode, setMode }) => {
	return (
    <Box className="App" bgcolor={'background.default'} color={'text.primary'} display='flex' flexDirection='column' minHeight='100vh'>
      <Navbar setMode={setMode} mode={mode}></Navbar>
      <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }}/>} flexGrow={1}>
        <Leftbar/>
        <MealPlanner/>
        <Rightbar page='discover'/>
      </Stack>
			<BackToTop/>
    </Box>
  )
}
