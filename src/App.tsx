import React, { FC } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import ContactUs from './pages/ContactUs';

import './App.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Config from './config';
import ProductList from './pages/ProductList';

//TODO - move this to seperate theme file
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: '66px',
          minHeight: '66px',
          '@media(min-width:600px)': {
            minHeight: '66px',
          },
        },
      },
    },
  },
});

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppNavbar items={Config.Constants.HOME_MENU_OPTIONS} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
