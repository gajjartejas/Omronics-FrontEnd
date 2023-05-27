import { useOutlet } from 'react-router-dom';
import Config from '../../config';
import AppNavbar from '../AppNavbar';
import AppFooter from '../AppFooter';
import useStaticDataStore from '../../store/store';
import { useEffect } from 'react';
import { IManufacturer } from '../../services/api-service/manufacturer/types';
import { IProduct } from '../../services/api-service/product/types';
import { useNavigate } from 'react-router';

const HomeLayout = () => {
  //Const
  const outlet = useOutlet();
  const navigate = useNavigate();
  const getData = useStaticDataStore(state => state.fetch);
  const featuredProducts = useStaticDataStore(state => state.featuredProducts);
  const featuredManufacturer = useStaticDataStore(state => state.featuredManufacturer);
  const staticPageData = useStaticDataStore(state => state.staticPageData);

  useEffect(() => {
    getData();
  }, [getData]);

  const onClickMenuButton = (item: { id: number; name: string }, index: number) => {
    switch (item.id) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/');
        break;
      case 2:
        navigate('/about-us');
        break;
      case 3:
        navigate('/service');
        break;
      case 4:
        navigate('/contact-us');
        break;
      default:
        break;
    }
  };

  const onClickManufacturer = (item: IManufacturer, index: number): void => {
    window.open(`${window.location.origin}/products?manufacturerId=${featuredManufacturer[index].id}`);
  };

  const onClickProduct = (item: IProduct, index: number) => {
    window.open(`${window.location.origin}/product?id=${featuredProducts[index].id}`);
  };

  const onClickFixtures = (item: { id: number; name: string }, index: number) => {
    alert('Coming soon...');
  };

  const onClickViewAllBrands = () => {
    window.open(`${window.location.origin}/brands`);
  };

  const onClickViewAllFixtures = () => {
    alert('Coming soon...');
  };

  const onClickViewAllProduct = () => {
    window.open(`${window.location.origin}/categories`);
  };

  return (
    <div>
      <AppNavbar
        items={Config.Constants.HOME_MENU_OPTIONS}
        featuredManufacturer={featuredManufacturer}
        featuredProducts={featuredProducts}
        onClickManufacturer={onClickManufacturer}
        onClickProduct={onClickProduct}
        onClickMenuButton={onClickMenuButton}
        onClickFixtures={onClickFixtures}
        onClickViewAllBrands={onClickViewAllBrands}
        onClickViewAllFixtures={onClickViewAllFixtures}
        onClickViewAllProduct={onClickViewAllProduct}
      />
      {outlet}
      <AppFooter staticPageData={staticPageData} />
    </div>
  );
};

export default HomeLayout;
