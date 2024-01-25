/** @format */
import { useState } from "react";
import "../assets/styles/components/AddProductComponent.scss";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const AddProductComponent = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>("");

  const queryClient = useQueryClient();

  const muattionAddProduct = useMutation(
    async (newProcut) => {
      const res = await axios.post(
        "https://fakestoreapi.com/products",
        newProcut
      );
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getProduct");
      },
    }
  );

  const navigate = useNavigate();

  const handleAddProduct = () => {
    if (!title || !price || !description || !category || !image) {
      setError("Missing required fields ");
    } else {
      const newProduct: any = {
        title,
        price,
        description,
        category,
        image,
      };
      muattionAddProduct.mutate(newProduct);
      handleCloseAddProduct();
    }
  };

  console.log(muattionAddProduct.data);

  const handleCloseAddProduct = () => {
    navigate("/");
    setTitle("");
    setPrice(0);
    setDescription("");
    setCategory("");
    setImage("");
  };

  return (
    <div className='addProductComponent'>
      <form className='addForm'>
        <h2 className='formHeader'>AddProduct</h2>
        <div className='formBody'>
          <div className='formInput'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id='title'
            />
          </div>

          <div className='formInput'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              placeholder='Price'
              id='price'
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
            />
          </div>

          <div className='formInput'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              placeholder='Description'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='formInput'>
            <label htmlFor='category'>Category</label>
            <input
              type='text'
              placeholder='Category'
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className='formInput'>
            <label htmlFor='image'>Image</label>
            <input
              type='text'
              placeholder='Image'
              id='image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <div className='formFooter'>
          <button
            type='button'
            className='btnAddProduct'
            onClick={handleAddProduct}>
            Add
          </button>
          <button
            type='button'
            className='btnClose'
            onClick={handleCloseAddProduct}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductComponent;
