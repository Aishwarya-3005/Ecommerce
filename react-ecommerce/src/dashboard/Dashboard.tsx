
import "./Dashboard.scss";
import { Product as ProductInterface } from "../type/Product";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



//orders,products,users component which are displayed on dashboard 
const Dashboard: React.FC = () => {

  const[productCount,setProductCount]=useState<number>(0)
  const[userCount,setUserCount]=useState<number>(0)
  const[orderCount,setOrderCount]=useState<number>(0);

    const[isLoading,setIsLoading]=useState<Boolean>(false);
  const[error,setError]=useState<any>(null);

  useEffect(()=>{
    const fetchData=async ()=>{
      setIsLoading(true);
      try{
      const response= await axios.get("http://localhost:8080/products/productsCount");
      setProductCount(response.data);
       } 
      catch(error){
        setError(error as Error);
      }
      finally{
        setIsLoading(true);
      }
    };
    fetchData()
  },[])
  useEffect(()=>{
    const fetchData=async ()=>{
      setIsLoading(true);
      try{
      const response= await axios.get("http://localhost:8080/users/usersCount");
      setUserCount(response.data);
       } 
      catch(error){
        setError(error as Error);
      }
      finally{
        setIsLoading(true);
      }
    };
    fetchData()
  },[])

  useEffect(()=>{
    const fetchData=async()=>{
      setIsLoading(true);
      try{
        const response=await axios.get("http://localhost:8080/orders/ordersCount");
        setOrderCount(response.data);
      }
      catch(error){
        setError(error as Error);
      }
      finally{
        setIsLoading(false);
      }
    };fetchData();
  },[])
  return (
    <div>
      <div className="btn-dashboard">
        <Link to ="/addtocart">
        <button className="btn btn-primary">Go To Cart</button>
        </Link>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-display">
          <div className="dashboard-content">
            <div>
            <p>Orders</p>
            <p>{orderCount}</p>
            </div>
          </div>
          <div className="dashboard-content">
            <div>
            <p>Products</p>
            <p>{productCount}</p>
          </div>
          </div>
          <div className="dashboard-content">
            <div>
            <p>Users</p>
            <p>{userCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
