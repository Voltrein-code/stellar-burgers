import { FC, ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { isAuthCheckedSelector, userDataSelector } from '@selectors';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userDataSelector);

  if (!isAuthChecked) return <Preloader />;

  if (onlyUnAuth && user) {
    return (
      <Navigate to={(location.state || { from: { pathname: '/' } }).from} />
    );
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
