import { Link } from "react-router-dom";
import { Product as ProductInterface } from "../type/Product";
import "./Product.scss";
interface ProductProp{
  product:ProductInterface;
  displayProduct:(product:ProductInterface)=>void;
  addToCart:(product:ProductInterface)=>void;
}
const Product: React.FC<ProductProp> = ({product,displayProduct,addToCart}) => {
  const imageURL = `http://localhost:8080/images/${product.imageURL}`;
  return (
    <div>
      <div className="product-display">
      <div className="product-info">
        <Link to ="/displayProduct">
        <img src={imageURL} alt={product.productName} className="product-img" onClick={()=>displayProduct(product)}/>
        </Link>
      </div>
      <div className="product-details">
        <p>Name:{product.productName}</p>
        <p>Price:{product.price}</p>
      
        <button className="btn btn-primary" onClick={()=>addToCart(product)}>Add To Cart</button>
      
      </div>
      </div>
    </div>
  );
};

export default Product;
