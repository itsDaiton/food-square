import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Discover } from "./pages/Discover";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

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
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/home' element={<Home mode={mode} setMode={setMode}/>}/>
        <Route path='/discover' element={<Discover/>}/>
        <Route path="/" element={<Navigate to="/home" replace/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
