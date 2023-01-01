import { selectAccount } from '../../redux/selectors/accountSelectors';
import { useSelector } from 'react-redux';
import { Navigate, useOutlet } from 'react-router-dom';

export const AuthLayout = () => {
  const outlet = useOutlet();
  const account = useSelector(selectAccount);

  console.log('AuthLayout', account);

  if (!account.accountGuid) {
    return <Navigate to="/admin/login" />;
  }

  return <div>{outlet}</div>;
};
