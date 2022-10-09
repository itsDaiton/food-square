import { Box } from '@mui/material'
import React from 'react'
import { Leftbar } from '../components/Leftbar'
import { Navbar } from "../components/Navbar";

export const Discover = () => {
  return (
    <Box>
        <Navbar></Navbar>
        <Leftbar/>
    </Box>
  )
}
