



















import { Link } from "react-router-dom"
import './SideBar.scss';
const SideBar:React.FC=()=>{
    return(
        <div>
            <p><Link to = "/">Dashboard</Link></p>
            <p><Link to = "/products">Products</Link></p>
            <p><Link to = "/addUsers">AddUsers</Link></p>
            <p><Link to = "/orders">Orders</Link></p>
            <p><Link to = "/addProduct">AddProducts</Link></p>
            <p><Link to = "/users">users</Link></p>
    
        </div>
    )
}

export default SideBar