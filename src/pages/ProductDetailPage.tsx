/** @format */

import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerComponent from "../components/SpinnerComponent";
import "../assets/styles/pages/ProductDetailPage.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/cart/cartSlices";
import { AppDispatch } from "../store";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading } = useQuery(["product", id], async () => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  });

  const handelAddToCart = (item: any) => {
    dispatch(addCartItem(item));
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div className='productDetailPage'>
      <div className='productDetailHeader'>
        <IoMdArrowRoundBack
          size={20}
          title='Back'
          onClick={() => navigate("/")}
        />
      </div>
      <div className='productDetailBody'>
        <div className='imageProduct'>
          <img src={data.image} alt={data.title} />
        </div>
        <div className='contentProduct'>
          <h2>{data.title}</h2>
          <h3>$ {data.price}</h3>
          <span>{data.description}</span>
          <div className='action'>
            <button className='btnBuy'>Buy now</button>
            <button
              className='btnAddToCart'
              onClick={() => handelAddToCart(data)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
