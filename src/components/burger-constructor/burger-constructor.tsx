import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorSelector,
  orderDataSelector,
  orderIsLoadingSelector,
  userDataSelector
} from '@selectors';
import { useNavigate } from 'react-router-dom';
import { createOrder, resetOrder } from '../../services/slices/order-slice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(constructorSelector);
  const orderRequest = useSelector(orderIsLoadingSelector);
  const orderModalData = useSelector(orderDataSelector);
  const user = useSelector(userDataSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    dispatch(
      createOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (i: TConstructorIngredient) => i._id
        ),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => dispatch(resetOrder());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
