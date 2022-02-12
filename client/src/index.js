import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/styles'
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import './styles.css'
const theme = unstable_createMuiStrictModeTheme();
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


