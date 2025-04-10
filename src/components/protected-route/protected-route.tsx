import { FC } from 'react';
import { ProtectedRouteProps } from './types';
import { useSelector } from 'react-redux';

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const isAuth = useSelector()
}
