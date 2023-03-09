import React from "react";
import "./Banner.scss";
import img from '../../../assets/dusk-mountains-4k-ma.jpg'
import {FiArrowUpRight} from 'react-icons/fi'
const Banner = () => {
  return (
    <div className="app__banner">
      <div className="app__banner-left">
        <div className="app__banner-title">
          <h1 className="head-text">A Mountain Photograph</h1>
        </div>
        <div className="app__description">
          <p className="p-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
            repellat blanditiis quo, velit maxime ex praesentium provident.
            Excepturi, possimus quia?
          </p>
        </div>
        <a href="#">
          <button className="btn-primary">Shop Now <FiArrowUpRight/></button>
        </a>
        
      </div>

      <div className="app__banner-right">
        <img className="app__banner-img" src={img} alt="lorem ipsum"/>
      </div>
    </div>
  );
};

export default Banner;
