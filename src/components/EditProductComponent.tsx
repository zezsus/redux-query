/** @format */

import { useEffect, useState } from "react";
import "../assets/styles/components/EditProductComponent.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import SpinnerComponent from "./SpinnerComponent";

const EditProductComponent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>({});
  const clientQuery = useQueryClient();

  useEffect(() => {
    const getProductData = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
    };
    getProductData();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const mutationEditProduct = useMutation(
    async (updateProduct) => {
      const res = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        updateProduct
      );

      return res.data;
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries("getProduct");
        navigate("/");
      },
    }
  );

  const handleSave = (e: any) => {
    e.preventDefault();
    if (product) {
      mutationEditProduct.mutate(product);
    }
  };

  if (mutationEditProduct.isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      <div className='editProductComponent'>
        <form className='editForm'>
          <h2 className='formHeader'>EditProduct</h2>
          <div className='formBody'>
            <div className='formInput'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                placeholder='Title'
                value={product.title}
                name='title'
                onChange={handleChange}
                id='title'
              />
            </div>

            <div className='formInput'>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                placeholder='Price'
                id='price'
                value={product.price}
                name='price'
                onChange={handleChange}
              />
            </div>

            <div className='formInput'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                placeholder='Description'
                id='description'
                value={product.description}
                name='description'
                onChange={handleChange}
              />
            </div>

            <div className='formInput'>
              <label htmlFor='category'>Category</label>
              <input
                type='text'
                placeholder='Category'
                id='category'
                value={product.category}
                name='category'
                onChange={handleChange}
              />
            </div>

            <div className='formInput'>
              <label htmlFor='image'>Image</label>
              <input
                type='text'
                placeholder='Image'
                id='image'
                value={product.image}
                name='image'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='formFooter'>
            <button
              type='button'
              className='btnSaveProduct'
              onClick={handleSave}>
              Save
            </button>
            <button
              type='button'
              className='btnClose'
              onClick={() => navigate("/")}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductComponent;
