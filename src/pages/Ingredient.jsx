import { Divider, Box, Stack  } from '@mui/material'
import React from 'react'
import { IngredientList } from '../components/IngredientList'
import { Leftbar } from '../components/Leftbar'
import { Navbar } from '../components/Navbar'
import { Rightbar } from '../components/Rightbar'

export const Ingredient = ({ mode, setMode }) => {
  return (
    <Box className="App" bgcolor={'background.default'} color={'text.primary'} display='flex' flexDirection='column' minHeight='100vh'>
      <Navbar setMode={setMode} mode={mode}></Navbar>
      <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }}/>} flexGrow={1}>
        <Leftbar/>
				<IngredientList/>
        <Rightbar page='discover'/>
      </Stack>
    </Box>
  )
}
