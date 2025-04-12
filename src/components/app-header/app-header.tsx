import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { userNameSelector } from '@selectors';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(userNameSelector)} />
);
