import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register"

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
        <Route path="/" element={<Home mode={mode} setMode={setMode} />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
