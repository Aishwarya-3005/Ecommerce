import { useEffect, useState } from "react";
import { Cart as CartInterface } from "../type/Cart";
import { Product as ProductInterface } from "../type/Product";
import "./Cart.scss";
import { User as UserInterface } from "../type/User";
import { Address as AddressInterface } from "../type/Address";
import axios from "axios";
import { ShippingInfo } from "../type/Order";
import { Order as OrderInterface } from "../type/Order";
interface cartProps {
  cartItems: CartInterface[];
  increaseQuantity: (cartItem: CartInterface) => void;
  decreaseQuantity: (cartItem: CartInterface) => void;
  removeCartItem: (cartItem: ProductInterface) => void;
  clearCart:()=>void;
}

const Cart: React.FC<cartProps> = ({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  clearCart,
}) => {
  const totalCartPrice = cartItems.reduce(
    (current, eachCartItem) =>
      current + eachCartItem.product.price * eachCartItem.quantity,
    0
  );
  const totalCartQuantity = cartItems.reduce(
    (current, eachCartItem) => current + eachCartItem.quantity,
    0
  );

  const [userId, setUserId] = useState<string>("");
  const [addressId, setAddressId] = useState<string>("");

  const handleUserList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
    setPlaceOrderBtn(false);
  };
  const handleUserAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddressId(e.target.value);
  };
  const [showAddresses, setShowAddress] = useState<boolean>(false);
  const showAddressList = () => {
    if (userId.trim() === "") {
      setShowAddress(false);
    } else {
      setShowAddress(true);
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data as UserInterface[]);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [addressList, setAddressList] = useState<AddressInterface[]>([]);
  useEffect(() => {
    if (userId) {
      const fetchAddressListByUserId = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8080/users/addressList/${userId}`
          );
          setAddressList(response.data as AddressInterface[]);
        } catch (error) {
          setError(error as Error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAddressListByUserId();
    }
  }, [userId]);

  const [users, setUsers] = useState<UserInterface[]>([]);

  const emptyShippingInfo: ShippingInfo = {
    userId: "",
    userName: "",
    email: "",
    phoneNumber: "",
    shippingAddress: { addressId: "", roadNo: "", street: "", city: "" },
  };
  const emptyOrder: OrderInterface = {
    orderId: "",
    cartItems: [],
    totalCartQuantity: 0,
    totalCartPrice: 0,
    shippingInfo: emptyShippingInfo,
  };

  const orderId: string = "";

  const [placeOrderBtn, setPlaceOrderBtn] = useState<boolean>(false);

  const [order, setOrder] = useState<OrderInterface>(emptyOrder);

  const showPlaceOrderBtn = () => {
    if (addressId.trim() === "") {
      setPlaceOrderBtn(false);
    } else {
      setPlaceOrderBtn(true);
      const selectedUser = users.find((eachUser) => eachUser.userId === userId);
      const selectedUserAddress = addressList.find(
        (eachUserAddress) => eachUserAddress.addressId === addressId
      );
      if (selectedUser && selectedUserAddress) {
        setOrder({
          orderId,
          cartItems,
          totalCartQuantity,
          totalCartPrice,
          shippingInfo:{
            userId:selectedUser.userId,
            userName:selectedUser.userName,
            email:selectedUser.email,
            phoneNumber:selectedUser.phoneNumber,
            shippingAddress:selectedUserAddress ,
          }
        }
        )
      }
    }
  };
  const handlePlaceOrder=async()=>{
    if(totalCartPrice>0){
      setIsLoading(true);
      try{
        const newOrder:OrderInterface=order;
        const response=await axios.post("http://localhost:8080/orders",newOrder);
        setOrder(emptyOrder);
        console.log(response.data);
        clearCart();
        setUserId("");
        setAddressId("");
      }
      catch(error){
        setError(error as Error);
      }
      finally{
        setIsLoading(false);
      }

    }
  };

  return (
    <div>
      {cartItems.length===0 ?(
        <p className="conditional-msg">*No items in cart</p>
      ):(
        <div>
      <div className="cartdetails">
        {cartItems.map((eachCartItem) => (
          <div
            className="cartItem-container"
            key={eachCartItem.product.productId}
          >
            <div>
              <p>{eachCartItem.product.productName}</p>
            </div>
            <div className="cart-quantity">
              <div>
                <button
                  className="quantity-btn"
                  onClick={() => decreaseQuantity(eachCartItem)}
                >
                  -
                </button>
              </div>
              <p>{eachCartItem.quantity}</p>
              <div>
                <button
                  className="quantity-btn"
                  onClick={() => increaseQuantity(eachCartItem)}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <p>{eachCartItem.quantity * eachCartItem.product.price}</p>
            </div>
            <div className="remove-btn">
              <button
                className="btn btn-danger"
                onClick={() => removeCartItem(eachCartItem.product)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="total-price">Total Cart Price:{totalCartPrice}</p>
      </div>
  
      <div className="user-address-form">
        <select
          onChange={handleUserList}
          onClick={showAddressList}
          value={userId}
        >
          <option value="">Select User</option>
          {users.map((eachUser) => (
            <option key={eachUser.userId} value={eachUser.userId}>
              {eachUser.userName}
              
            </option>
            
          ))}
        </select>
      </div>

      {showAddresses && (
        <div className="user-addressList">
          <select
            onChange={handleUserAddress}
            onClick={showPlaceOrderBtn}
            value={addressId}
          >
            <option value="">Select Address</option>
            {addressList.map((eachAddressList) => (
              <option
                key={eachAddressList.addressId}
                value={eachAddressList.addressId}
              >
                {eachAddressList.roadNo}
                {eachAddressList.street}
                {eachAddressList.city}
              </option>
            ))}
          </select>
        </div>
      )}

      {placeOrderBtn && (
        <div className="place-order-container">
          <button className="btn btn-success" onClick={handlePlaceOrder}>Place Order</button>
          </div>
      )}
      </div>
      )}
    </div>
  );
};

export default Cart;
