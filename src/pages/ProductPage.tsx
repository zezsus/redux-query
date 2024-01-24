/** @format */

import axios from "axios";
import { useQuery } from "react-query";
import "../assets/styles/pages/ProductPage.scss";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SpinnerComponent from "../components/SpinnerComponent";
import { useState } from "react";

const ProductPage = () => {
  const navigate = useNavigate();
  const [filterProduct, setFilterProduct] = useState([]);

  const productData = useQuery("getProduct", async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  });

  const listCategory = [
    "all",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  const handleDetailProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  if (productData.isLoading) {
    return <SpinnerComponent />;
  }

  if (filterProduct.length === 0) {
    setFilterProduct(productData.data);
  }

  const handleFilter = (category: string) => {
    if (category === "all") {
      setFilterProduct(productData.data);
    } else {
      const filterValue = productData.data.filter(
        (product: any) => product.category === category
      );

      setFilterProduct(filterValue);
    }
  };

  return (
    <div className='productPage'>
      <div className='productPageHeader'>
        {listCategory.map((category: string) => {
          return (
            <div className='category' onClick={() => handleFilter(category)}>
              {category}
            </div>
          );
        })}
      </div>

      <div className='productPageBody'>
        {filterProduct?.map((product: any) => {
          return (
            <div className='listProduct' key={product.id}>
              <div className='listProductHeader'>
                <img src={product.image} alt={product.title} />
              </div>
              <div className='listProductBody'>
                <h3
                  className='title'
                  onClick={() => handleDetailProduct(product.id)}>
                  {product.title}
                </h3>
                <h3>$ {product.price}</h3>
                <span>
                  <FaStar />
                  {product.rating.rate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductPage;
