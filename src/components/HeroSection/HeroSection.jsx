import React from "react";
import './HeroSection.scss'
import Banner from "./Banner/Banner";


const HeroSection = () => {
  return (
    <>
      <div className="app__home-hero">
        <h1 className="head-text"> Today's Feature</h1>
        <Banner/>
        
      </div>
    </>
  );
};

export default HeroSection;
