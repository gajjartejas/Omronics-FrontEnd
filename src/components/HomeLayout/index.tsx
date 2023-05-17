import { useOutlet } from 'react-router-dom';
import Config from '../../config';
import AppNavbar from '../AppNavbar';
import AppFooter from '../AppFooter';
import useStaticDataStore from '../../store/store';
import { useEffect } from 'react';

const HomeLayout = () => {
  //Const
  const outlet = useOutlet();
  const getData = useStaticDataStore(state => state.fetch);
  const featuredProducts = useStaticDataStore(state => state.featuredProducts);
  const featuredManufacturer = useStaticDataStore(state => state.featuredManufacturer);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <AppNavbar
        items={Config.Constants.HOME_MENU_OPTIONS}
        featuredManufacturer={featuredManufacturer}
        featuredProducts={featuredProducts}
      />
      {outlet}
      <AppFooter />
    </div>
  );
};

export default HomeLayout;
