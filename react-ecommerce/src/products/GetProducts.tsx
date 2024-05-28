import { useEffect, useState } from "react";
import { Product as ProductInterface } from "../type/Product";
import axios from "axios";
import Product from "./Product";

interface getProductProps{
  displayProduct:(product:ProductInterface)=>void;
  addToCart:(product:ProductInterface)=>void;
}
const GetProduct: React.FC<getProductProps> = ({displayProduct,addToCart}) => {
  const [data, setData] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/products/all");
        setData(response.data as ProductInterface[]);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
 

  return (
    <div className="product-container">
      {data.map((product) => (
        <Product product={product} displayProduct={displayProduct} addToCart={addToCart}/>
      ))}
    </div>
  );
};

export default GetProduct;
