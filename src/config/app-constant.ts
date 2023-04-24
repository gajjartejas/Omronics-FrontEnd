/*
App constants
 */

const Constant = {
  IMAGE_PATH: 'https://api.omronics.com/media/images/',
  FILE_PATH: 'https://api.omronics.com/media/resources/',
  CATEGORY_IMAGE_PATH: 'https://api.omronics.com/media/categories/',
  HOME_MENU_OPTIONS: [
    { id: 0, name: 'Home' },
    { id: 1, name: 'Products & Brands' },
    { id: 2, name: 'About Us' },
    { id: 3, name: 'Contact Us' },
  ],
  HOME_PRODUCTS: [
    { id: 0, name: 'CABLE HARNESS' },
    { id: 1, name: 'INTERFACE AND\nRELAY MODULE' },
    { id: 2, name: 'SERVO' },
    { id: 3, name: 'VFD' },
    { id: 4, name: 'SMPS' },
    { id: 5, name: 'CONNECTOR' },
    { id: 6, name: 'GEARBOX' },
    { id: 7, name: 'DIODE' },
  ],
  HOME_RANDS: [
    { id: 0, name: 'MITSUBISHI' },
    { id: 1, name: 'FUJI' },
    { id: 2, name: 'SIEMENS' },
    { id: 3, name: 'DELTA' },
    { id: 4, name: 'SUNCHU' },
    { id: 5, name: 'XINIYA' },
  ],
  ADMIN_ITEMS: [
    {
      id: 0,
      title: '',
      items: [
        {
          id: 0,
          title: 'Dashboard',
          route: '/admin/dashboard',
          icon: 'dashboard',
        },
      ],
    },
    {
      id: 1,
      title: 'Manage',
      items: [
        {
          id: 0,
          title: 'Products',
          route: '/admin/dashboard/products',
          icon: 'shopping_cart',
        },
        {
          id: 1,
          title: 'Product Images',
          route: '/admin/dashboard/images',
          icon: 'photo_library',
        },
        {
          id: 2,
          title: 'Product Resources',
          route: '/admin/dashboard/resources',
          icon: 'description',
        },
        {
          id: 3,
          title: 'Manufacturers',
          route: '/admin/dashboard/manufacturers',
          icon: 'business',
        },
        {
          id: 4,
          title: 'Categories',
          route: '/admin/dashboard/categories',
          icon: 'category',
        },
        {
          id: 5,
          title: 'Recently Connected',
          route: '/admin/dashboard/contact-data',
          icon: 'phone-missed',
        },
      ],
    },
    {
      id: 2,
      title: 'Pages',
      items: [
        {
          id: 0,
          title: 'Home',
          icon: 'home',
        },
        {
          id: 1,
          title: 'Products & Brands',
          icon: 'shopping_cart',
        },
        {
          id: 2,
          title: 'About US',
          icon: 'verified_user',
        },
        {
          id: 3,
          title: 'Contact US',
          icon: 'verified_user',
        },
      ],
    },
    {
      id: 3,
      title: 'Others',
      items: [
        {
          id: 0,
          title: 'Logout',
          icon: 'power_off',
        },
      ],
    },
    {
      id: 3,
      title: 'Others',
      items: [
        {
          id: 0,
          title: 'Logout',
          icon: 'power_off',
        },
      ],
    },
  ],
};

export default Constant;
