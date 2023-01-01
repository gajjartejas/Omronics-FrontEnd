import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
// @ts-ignore
import { NotificationContainer } from 'react-notifications';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import 'react-notifications/lib/notifications.css';

//Layout
import HomeLayout from './components/HomeLayout';

//Pages
import SignIn from './pages/Admin/AdminLogin/SignIn';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import ContactUs from './pages/ContactUs';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import AboutUs from './pages/AboutUs';

//Admin Pages
import AuthLayout from './components/AuthLayout';
import AddProduct from './pages/Admin/ManageProducts/AddProduct';
import ManageProductList from './pages/Admin/ManageProducts/ManageProductList';
import ManageImageList from './pages/Admin/ManageImages/ManageImageList';
import ManageResourceList from 'pages/Admin/ManageResources/ManageResourcesList';
import ManufacturerList from 'pages/Admin/ManageManufacturers/ManufacturerList';
import ManageCategoryList from 'pages/Admin/ManageCategories/ManageCategoryList';
import AddCategory from 'pages/Admin/ManageCategories/AddCategory';
import AddManufacturerList from "./pages/Admin/ManageManufacturers/AddManufacturer";

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

            <Route path="dashboard/products" element={<ManageProductList />} />
            <Route path="dashboard/add-product" element={<AddProduct />} />

            <Route path="dashboard/images" element={<ManageImageList />} />
            <Route path="dashboard/resources" element={<ManageResourceList />} />

            <Route path="dashboard/manufacturers" element={<ManufacturerList />} />
            <Route path="dashboard/add-manufacturer" element={<AddManufacturerList />} />

            <Route path="dashboard/categories" element={<ManageCategoryList />} />
            <Route path="dashboard/add-category" element={<AddCategory />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <NotificationContainer />
    </ThemeProvider>
  );
};

export default App;
