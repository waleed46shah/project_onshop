import React, { useState } from "react";
import { HiMenuAlt4, HiX, HiSearch } from "react-icons/hi";
import { motion } from "framer-motion";
import "./Navbar.scss";
import { images } from "../../constants";
import { MdShoppingCart } from "react-icons/md";
import { setIsCartOpen } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Badge } from "@mui/material";
import { Link } from 'react-router-dom'
 
const Navbar = () => {
  
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-left">
        <div className="app__navbar-logo">
          <Link to='home'>
          <img
            style={{ width: "70px", height: "70px" }}
            src={images.logo}
            alt="logo"
          />
          </Link>
        </div>
        <ul className="app__navbar-links-right">
          
        </ul>
      </div>

      <div className="app__navbar-mid">
        <input
          className="app__navbar-search-input"
          type="search"
          placeholder="Search Here"
        />
        <button className="app__navbar-search-btn">
          <HiSearch />
        </button>
      </div>

      <div className="app__navbar-right">
        <ul className="app__navbar-links-right">
          <li className="app__flex p-text">
            <div>
              <Link id="lgn" to="login">Login</Link>
            </div>
          </li>

          <li>
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length===0}
              sx={{"& .MuiBadge-badge":{
                right:5,
                top:5,
                backgroundColor:"#000",
                padding:"0 4px",
                height: "14px",
                minWidth:"13px",
                margin:"-5px 5px"
              }}}
            >
              <div>
                <Link>
                  <MdShoppingCart onClick={() => dispatch(setIsCartOpen({}))} />
                </Link>
              </div>
            </Badge>
          </li>
        </ul>
      </div>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["home", "categories", "contact", "about", "login"].map(
                (item) => (
                  <li key={item}>
                    <Link to={`${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
