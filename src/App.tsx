import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

//Layout
import { HomeLayout } from './components/HomeLayout';

//Pages
import SignIn from './pages/Admin/AdminLogin/SignIn';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import ContactUs from './pages/ContactUs';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import AboutUs from './pages/AboutUs';
import { AuthLayout } from './components/AuthLayout';

//TODO - move this to separate theme file
const theme = createTheme({
  palette: {
    primary: {
      main: '#DC004E',
    },
    secondary: {
      main: '#ff547a',
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
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(232, 241, 250)',
          '&:hover': {
            backgroundColor: 'rgb(250, 232, 241)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'rgb(232, 241, 250)',
            },
          },
          '&.Mui-focused': {
            backgroundColor: 'rgb(0, 241, 232)',
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
        <Routes>
          <Route element={<HomeLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product-detail/:productId" element={<ProductDetail />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Route>

            <Route path="/admin/login" element={<SignIn />} />

          <Route path="/admin" element={<AuthLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
