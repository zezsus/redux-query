/** @format */

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { MdDeleteForever } from "react-icons/md";
import "../assets/styles/pages/CartPage.scss";
import { removeCartItem } from "../redux/cart/cartSlices";

const CartPage = () => {
  const cartItem = useSelector((state: RootState) => state.carts.listCartItem);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveItemCart = (item: any) => {
    dispatch(removeCartItem(item));
  };

  if (cartItem.length === 0) {
    return <div className="cartNotFound">Cart not found</div>;
  }

  return (
    <div className='cartPage'>
      <div className='listCartItem'>
        {cartItem.map((cartItem: any) => {
          return (
            <div className='cartItem'>
              <img src={cartItem.image} alt={cartItem.title} />
              <span className='title'>{cartItem.title}</span>
              <span>${cartItem.price}</span>
              <MdDeleteForever
                title='Delete'
                onClick={() => handleRemoveItemCart(cartItem)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartPage;
