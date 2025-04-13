import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { ordersDataSelector } from '@selectors';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(ordersDataSelector);

  return <ProfileOrdersUI orders={orders} />;
};
