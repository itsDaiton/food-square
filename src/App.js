import { Box, createTheme, Divider, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Create } from "./components/Create";
import { Feed } from "./components/Feed";
import { Leftbar } from "./components/Leftbar";
import { Navbar } from "./components/Navbar";
import { Rightbar } from "./components/Rightbar";

function App() {

  const [mode, setMode] = useState('light')

const theme = createTheme({
  palette: {
    mode,
      ...(mode === 'light'
      ? {
        primary: {
          main: '#6228c1',
        },
        secondary: {
          main: '#f50057',
        },
        text: {
          primary: 'rgba(0,0,0,0.9)',
        },
      }
      : {
        text: {
          secondary: 'rgba(255,255,255,0.8)',
        },   
      })
  },
  typography: {
    fontFamily: 'Poppins',
    fontSize: 16
  },
})

  return (
    <ThemeProvider theme={theme}>
      <Box className="App" bgcolor={'background.default'} color={'text.primary'}>
      <Navbar></Navbar>
      <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem />}>
        <Leftbar setMode={setMode} mode={mode}></Leftbar>
        <Feed></Feed>
        <Rightbar></Rightbar> 
      </Stack>
      <Create/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
