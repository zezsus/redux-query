/** @format */
import { FaCartPlus } from "react-icons/fa6";
import "../assets/styles/components/NavbarComponent.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";

const NavbarComponent = () => {
  const [isLogin, setIsLogin] = useState(false);
  const numberItem = useSelector((state: RootState) => state.carts.numberItem);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Usertoken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='navbarComponent'>
      <div className='navHeader'>
        <h2 onClick={() => navigate("/")}>ReactQuery</h2>
      </div>
      <div className='navBody'>
        <span></span>
        <div className='cart'>
          <FaCartPlus title='Cart' onClick={() => navigate("/cart")} />
          {numberItem !== 0 && <span>{numberItem}</span>}
        </div>
      </div>
      <div className='navFooter'>
        {!isLogin ? (
          <button className='btnLogin' onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
            <span>username</span>
            <IoIosLogOut onClick={handleLogout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
