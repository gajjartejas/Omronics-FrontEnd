/*
App constants
 */

const Constant = {
  IMAGE_PATH: 'https://api.omronics.com/media/images/',
  FILE_PATH: 'https://api.omronics.com/media/resources/',
  CATEGORY_IMAGE_PATH: 'https://api.omronics.com/media/categories/',
  COVER_IMAGE_PATH: 'https://api.omronics.com/media/cover-images/',
  MANUFACTURER_IMAGE_PATH: 'https://api.omronics.com/media/manufacturers-images/',
  HOME_MENU_OPTIONS: [
    { id: 0, name: 'Home' },
    { id: 1, name: 'Products & Brands' },
    { id: 2, name: 'About Us' },
    { id: 3, name: 'Service' },
    { id: 4, name: 'Contact Us' },
  ],
  HOME_MENU_ITEMS_FIXTURES: [
    { id: 0, name: 'Catalog' },
    { id: 1, name: 'Manual' },
    { id: 2, name: 'Software' },
    { id: 3, name: 'Drawing' },
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
          title: 'Cover Image',
          route: '/admin/dashboard/cover-images',
          icon: 'web',
        },
        {
          id: 1,
          title: 'Service',
          route: '/admin/dashboard/manage-service',
          icon: 'web',
        },
        {
          id: 2,
          title: 'About US',
          route: '/admin/dashboard/manage-about-us',
          icon: 'web',
        },
        {
          id: 3,
          title: 'Contact US',
          route: '/admin/dashboard/manage-contact-us',
          icon: 'web',
        },
        {
          id: 4,
          title: 'Footer',
          route: '/admin/dashboard/manage-footer',
          icon: 'web',
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
