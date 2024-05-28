import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AddProducts from "./products/AddProducts";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";
import GetProducts from "./products/GetProducts"; // Assuming GetProducts is now a component
import Dashboard from "./dashboard/Dashboard";
import { Product as ProductInterface } from "./type/Product";
import { User as UserInterface } from "./type/User";
import ProductDetails from "./products/ProductDetail";
import  AddUser  from "./users/AddUser";
import  GetUsers  from "./users/GetUsers";
import UserDetails from "./users/UserDetails";
import { Cart as CartInterface } from "./type/Cart";
import Cart from "./cart/Cart";
import  GetOrders  from "./orders/GetOrders";
import { Order as OrderInterface, ShippingInfo } from "./type/Order";
import OrderDetails from "./orders/OrderDetails";

function App() {

  const[product,setProduct]=useState<ProductInterface>({
    productId:"",
    productName:"",
    category:"",
    description:"",
    price:0,
    imageURL:"",

  })
  const displayProduct=(product:ProductInterface)=>{
    setProduct(product);
  }

  const[user,setUser]=useState<UserInterface>({
    userId:"",
    userName:"",
    email:"",
    phoneNumber:"",
    addressIds:[]
  })
  const displayUser=(user:UserInterface)=>{
    setUser(user);
  }

  

  const[cartItems,setCartItems]=useState<CartInterface[]>([]);
  const addToCart=(product:ProductInterface)=>{
    const findProduct=cartItems.findIndex((eachCartItems)=>eachCartItems.product.productId===product.productId);
    if(findProduct===-1){
      setCartItems([...cartItems,{product, quantity : 1}])
    }
  }
  console.log(cartItems)

  const decreaseQuantity=(cartItem:CartInterface)=>{
    const quantity=cartItems.map((eachCartItem)=>{
    if(eachCartItem.product.productId===cartItem.product.productId){
      const newQuantity=cartItem.quantity>1?cartItem.quantity-1:1;
      return {...cartItem,quantity:newQuantity};
    }
    return eachCartItem;
    });
    setCartItems(quantity);
  }

  const increaseQuantity=(cartItem:CartInterface)=>{
    const quantity=cartItems.map((eachCartItem)=>eachCartItem.product.productId===cartItem.product.productId
    ?{...cartItem,quantity:eachCartItem.quantity+1}:eachCartItem);
    setCartItems(quantity);
  }
const removeCartItem=(cartItem:ProductInterface)=>{
const updateCartItems=cartItems.filter((eachCartItem)=>eachCartItem.product.productId!==cartItem.productId);
setCartItems(updateCartItems);
}

const clearCart = () => {
  setCartItems([]);
};

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


const [selectedOrder, setSelectedOrder] = useState<OrderInterface>(emptyOrder);

const displayOrderDetails = (order: OrderInterface) => {
  setSelectedOrder(order);
};



  return (
    <div className="App">
      <BrowserRouter>
        <Header />
      <div className="app-content">
        <div className="sidebar-content">
        <SideBar />
        </div>
        <Switch>
          <div>
            <Route path={"/"} exact>
              <Dashboard />
            </Route>
            <Route path={"/addProduct"}>
              <AddProducts />
            </Route>
            <Route path={"/products"}>
              <GetProducts displayProduct={displayProduct} addToCart={addToCart} />
            </Route>{" "}
           <Route path={"/displayProduct"}>
            <ProductDetails {...product}/>
           </Route>
           <Route path={"/addUsers"}>
            <AddUser/>
           </Route>
           <Route path={"/users"}>
            <GetUsers displayUser={displayUser}/>
           </Route>
          <Route path={"/userDetails"}>
            <UserDetails user={user}/>
          </Route>
          <Route path={"/addToCart"}>
            <Cart cartItems={cartItems} increaseQuantity={increaseQuantity} 
            decreaseQuantity={decreaseQuantity} removeCartItem={removeCartItem} clearCart={clearCart}/>
          </Route>
          <Route path={"/orders"}>
            <GetOrders displayOrderDetails={displayOrderDetails}/>
          </Route>
         <Route path={"/orderdetails"}>
          <OrderDetails selectedOrder={selectedOrder}/>
         </Route>
          </div>
        </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
