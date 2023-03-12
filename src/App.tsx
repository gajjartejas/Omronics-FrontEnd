import { FC } from 'react';
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

//Layout
import HomeLayout from './components/HomeLayout';

//Pages
import AboutUs from './pages/AboutUs';
import SignIn from './pages/Admin/AdminLogin/SignIn';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import ContactUs from './pages/ContactUs';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';

//Admin Pages
import AddCategory from 'pages/Admin/ManageCategories/AddCategory';
import ManageCategoryList from 'pages/Admin/ManageCategories/ManageCategoryList';
import ManufacturerList from 'pages/Admin/ManageManufacturers/ManufacturerList';
import ManageResourceList from 'pages/Admin/ManageResources/ManageResourcesList';
import AuthLayout from './components/AuthLayout';
import ManageImageList from './pages/Admin/ManageImages/ManageImageList';
import AddManufacturerList from "./pages/Admin/ManageManufacturers/AddManufacturer";
import AddProduct from './pages/Admin/ManageProducts/AddProduct';
import ManageProductList from './pages/Admin/ManageProducts/ManageProductList';
import UpdateCategory from "./pages/Admin/ManageCategories/UpdateCategory";
import UpdateManufacturer from "./pages/Admin/ManageManufacturers/UpdateManufacturer";
import UpdateProduct from "./pages/Admin/ManageProducts/UpdateProduct";
import Categories from "./pages/Categories";

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
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<Categories />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Route>

          <Route path="/admin/login" element={<SignIn />} />

          <Route path="/admin" element={<AuthLayout />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="dashboard/products" element={<ManageProductList />} />
            <Route path="dashboard/add-product" element={<AddProduct />} />
            <Route path="dashboard/update-product" element={<UpdateProduct />} />

            <Route path="dashboard/images" element={<ManageImageList />} />
            <Route path="dashboard/resources" element={<ManageResourceList />} />

            <Route path="dashboard/manufacturers" element={<ManufacturerList />} />
            <Route path="dashboard/add-manufacturer" element={<AddManufacturerList />} />
            <Route path="dashboard/update-manufacturer" element={<UpdateManufacturer />} />

            <Route path="dashboard/categories" element={<ManageCategoryList />} />
            <Route path="dashboard/add-category" element={<AddCategory />} />
            <Route path="dashboard/update-category" element={<UpdateCategory />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
