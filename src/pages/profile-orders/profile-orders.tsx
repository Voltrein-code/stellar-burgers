import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ordersDataSelector } from '@selectors';
import { getOrdersList } from '../../services/slices/orders-list-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  return <ProfileOrdersUI orders={useSelector(ordersDataSelector)} />;
};
