import React from "react";
import CollectionCard from "./CollectionCard/CollectionCard";
import { useEffect, useState } from "react";
import { client, urlFor } from "../../../client";
import "./NewCollections.scss";

const NewCollections = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const query = '*[_type == "product"]';
    client.fetch(query).then((data) => {
      setProduct(data);
    });
  }, []);

  return (
    <div className="app__sectionAlt app__newCollections">
      <h1 className="head-text">New Collections</h1>
      <div className="app__newCollections-cardsContainer">
        
      {product.map((prod) => (
            <CollectionCard
              key={prod._id}
              img={urlFor(prod.image[0]).url()}
              price={prod.price}
              name = {prod.name}
              discount={prod.discount}
              desc = {prod.description}
              id = {prod._id}
            />
            
          ))}
        
      </div>
    </div>
  );
};

export default NewCollections;
