import { Link } from "react-router-dom";
import { User as UserInterface } from "../type/User";
import humanImage from "../assets/human.jpg";
import "./User.scss";
interface userProp {
  user: UserInterface;
  displayUser: (user: UserInterface) => void;
}
export const User: React.FC<userProp> = ({ user, displayUser }) => {
  return (
    <div className="displayuser">
      <div className="displaycard">
        <Link to="/userdetails">
          <div>
            <img
              src={humanImage}
              className="userImage"
              onClick={() => displayUser(user)}
            />
          </div>
        </Link>
        <div className="user-data">
          <p className="user-info">UserName:{user.userName}</p>
          <p className="user-info">Email:{user.email}</p>
        </div>
      </div>
    </div>
  );
};