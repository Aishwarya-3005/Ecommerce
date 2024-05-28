import { Table } from "react-bootstrap";
import { Order as OrderInterface } from "../type/Order";
import './OrderDetails.scss';
import { Link } from "react-router-dom";
import backButton from "../assets/back.jpg"

const OrderDetails: React.FC<{ selectedOrder: OrderInterface }> = ({
  selectedOrder,
}) => {
  return (
    <div>
      {selectedOrder.cartItems.length === 0 ? (
        <p className="conditional-msg">
          *Select an order to display order details
        </p>
      ) : (
        <div>
          <div>
            <Link to={"/orders"}>
              <div>
                <img
                  src={backButton}
                  className="back-image"
                />
              </div>
            </Link>
          </div>
          <div className="orderdetails">
          <div>
            <p className="user-name">
            Name :   {selectedOrder.shippingInfo.userName}
            </p>
            <p className="order-address"> Address :
              {selectedOrder.shippingInfo.shippingAddress.roadNo},{" "}
              {selectedOrder.shippingInfo.shippingAddress.street},{" "}
              {selectedOrder.shippingInfo.shippingAddress.city}
            </p>
          </div>

          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.cartItems.map((eachCartItem) => (
                  <tr key={eachCartItem.product.productId}>
                    <td>{eachCartItem.product.productName}</td>
                    <td>{eachCartItem.quantity}</td>
                    <td>₹ {eachCartItem.product.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="order-price">
            <p>Total Price: ₹ {selectedOrder.totalCartPrice}</p>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;