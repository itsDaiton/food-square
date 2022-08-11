import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Create } from "./components/Create";
import { Feed } from "./components/Feed";
import { Leftbar } from "./components/Leftbar";
import { Navbar } from "./components/Navbar";
import { Rightbar } from "./components/Rightbar";

function App() {

  const [mode, setMode] = useState('light')

  const darkTheme = createTheme({
    palette: {
      mode: mode    
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="App" bgcolor={'background.default'} color={'text.primary'}>
      <Navbar></Navbar>
      <Stack direction="row" justifyContent="center">
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
