import { selectAccount } from '../../redux/selectors/accountSelectors';
import { useSelector } from 'react-redux';
import { useOutlet } from 'react-router-dom';
import Config from '../../config';
import AppNavbar from '../AppNavbar';
import AppFooter from '../AppFooter';

const HomeLayout = () => {
  //Const
  const account = useSelector(selectAccount);
  const outlet = useOutlet();

  console.log('HomeLayout', account);

  return (
    <div>
      <AppNavbar items={Config.Constants.HOME_MENU_OPTIONS} />
      {outlet}
      <AppFooter />
    </div>
  );
};

export default HomeLayout;
