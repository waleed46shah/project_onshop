import React from "react";
import CollectionCard from "../NewCollections/CollectionCard/CollectionCard";
import image from "../../../assets/dusk-mountains-4k-ma.jpg";
import "./FlashDeals.scss";
const FlashDeals = () => {
  return (
    <div className="app__section app__flashDeals">
      <h1 className="head-text">Flash Deals</h1>
      <div className="app__newCollections-cardsContainer">
        <CollectionCard img={image} price="$2.99" />
        <CollectionCard img={image} price="$2.99" />
        <CollectionCard img={image} price="$2.99" />
        <CollectionCard img={image} price="$2.99" />
        <CollectionCard img={image} price="$2.99" />
        <CollectionCard img={image} price="$2.99" />
      </div>
    </div>
  );
};

export default FlashDeals;
