import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { DataContext } from "../context/DataContext";


const Navbar = () => {
  const { cart } = useContext(DataContext);
  console.log(cart)

  return (
    <>
      <div className="code-nav">
        <nav>
          <input type="checkbox" id="check" />
          <label for="check" className="checkbtn">
            <i className="fa fa-bars"></i>
          </label>
          <label className="logo">
            <NavLink to="/">Konter HP</NavLink>
          </label>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Products">Produk</NavLink>
            </li>

            <li>
              <NavLink to="/adminkonter">Admin Konter</NavLink>
            </li>
            {/* <li>
              <NavLink to="/cart" className="cart-box">
                Cart <span>{cart.length}</span>{" "}
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/myaccount">Profile </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
