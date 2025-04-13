import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedOrdersSelector } from '@selectors';
import { getFeeds } from '../../services/slices/feed-slice';

export const Feed: FC = () => {
  const orders = useSelector(feedOrdersSelector);
  const dispatch = useDispatch();
  const handleGetFeeds = useCallback(() => dispatch(getFeeds()), [dispatch]);

  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
