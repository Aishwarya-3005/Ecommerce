import React, { useState } from "react";
import { Product as ProductInterface } from "../type/Product";
import axios from "axios";
import "./AddProduct.scss";

const AddProducts: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [product, setProduct] = useState<ProductInterface>({
  productId:"",
    productName: "",
    category: "",
    description: "",
    price: 0,
    imageURL: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // if(product.productName.trim()==="" || product.category.trim()===""||product.description.trim()===""||product.price!==0,product.imageURL!==null){
    //     setError("All fields are required");
    // }
    event.preventDefault();
    setIsLoading(true);
    // setError(null);

    try {
      const formData = new FormData();
      // formData.append("productId",product.productId.toString())
      formData.append("productName", product.productName.toString());
      formData.append("category", product.category.toString());
      formData.append("description", product.description.toString());
      formData.append("price", product.price.toString());
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.post(
        "http://localhost:8080/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProduct(product);
      console.log("product added Successfully", response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-displaycontainer">
      <form onSubmit={handleSubmit} className="form-class">
        <div className="product-div">
          <h1>Add Product</h1>
          <div className="input-container">
            Name:
            <input
              type="text"
              name="productName"
              placeholder="Enter the Product Name"
              onChange={handleChange} required
            />
          </div>
          <div className="input-container">
            Category:
            <input
              type="text"
              name="category"
              placeholder="Enter the Category"
              onChange={handleChange} required
            />
          </div>
          <div className="input-container">
            Description:
            <input
              type="text"
              name="description"
              placeholder="Enter the description"
              onChange={handleChange} required
            />
          </div>
          <div className="input-container">
            Price:
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              onChange={handleChangeNumber} required
            />
          </div>
          <div className="input-container">
            <input type="file" name="imageURL" onChange={handleImage} required/>
          </div>
          <div className="input-container">
            <button>{isLoading ? "Adding" : "AddProduct"}</button>
          </div>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
