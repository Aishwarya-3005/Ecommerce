
import { Product as ProductInterface  } from "../type/Product"
import "./ProductDetails.scss";
const ProductDetails:React.FC<ProductInterface>=(product)=>{
    const imageURL = `http://localhost:8080/images/${product.imageURL}`;

    return(
        <div className="product-detail">
            <div>
            <img src={imageURL} alt={product.productName} className="productdetail-image"/>
            </div>
            <div className="productdetails-info">
            <p>Name: {product.productName}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            </div>
        </div>
    )
}

export default ProductDetails