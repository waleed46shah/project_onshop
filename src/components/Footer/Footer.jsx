import React from "react";
import { images } from "../../constants";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaCartArrowDown,
} from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="app__footer">
      <div className="app__footer-mail">
        
        <form>
        <h1>Send Us A Mail</h1>
        <input
            type="email"
            name="usermail"
            id="email"
            placeholder="Your Name"
          />

          <input
            type="email"
            name="usermail"
            id="email"
            placeholder="Your Email"
          />
          
          <textarea name="message" placeholder="Your Message" id="message" />

          <button className="btn-primary" type="submit">Submit</button>
        </form>
      </div>
      {/* <div className="app__footer-left">
        <div className="branding">
          <div className="slogans">
            <h1>OnShop</h1>
            <h2>Just Snap & Shop</h2>
            <p className="p-text">Coming Soon!</p>
          </div>
        </div>
      </div> */}
      <div className="app__footer-right">
        <div className="headings">
          <h1>You Can Find Us At:</h1>
        </div>
        <div className="socials">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaWhatsapp />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
