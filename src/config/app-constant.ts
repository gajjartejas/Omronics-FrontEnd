/*
App constants
 */

const Constant = {
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
        },
      ],
    },
    {
      id: 0,
      title: 'Manage',
      items: [
        {
          id: 0,
          title: 'Products',
          route: '/admin/dashboard/products',
        },
        {
          id: 2,
          title: 'Images',
          route: '/admin/dashboard/images',
        },
        {
          id: 3,
          title: 'Resources',
          route: '/admin/dashboard/resources',
        },
        {
          id: 4,
          title: 'Manufacturers',
          route: '/admin/dashboard/manufacturers',
        },
        {
          id: 5,
          title: 'Categories',
          route: '/admin/dashboard/categories',
        },
      ],
    },
    {
      id: 0,
      title: 'Pages',
      items: [
        {
          id: 0,
          title: 'Home',
        },
        {
          id: 2,
          title: 'Products & Brands',
        },
        {
          id: 3,
          title: 'About US',
        },
        {
          id: 4,
          title: 'Contact US',
        },
      ],
    },
  ],
};

export default Constant;
