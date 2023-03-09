import React from "react";
import "./CollectionCard.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, increaseCount, decreaseCount } from "../../../../state";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { RiStarSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IconButton, Typography, Button } from "@mui/material";
const CollectionCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="app__card"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      
      <img
        className="app__image"
        src={props.img}
        alt="lorem ipsum"
        onClick={() => navigate(`/item/${props.id}`)}
      />
      <div className="app__card-name" style={{marginLeft:'0.5rem'}}>
        <h3>{props.name}</h3>
      </div>
      <div className="app__bottom">
        <div className="bottomLeft">
          <div className="price">
            <p className="p-text" style={{ fontSize: "16px", color:'green' }}>
              ${props.price}
            </p>
            <p
              style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}
            >
              <del>${props.discount}</del>
            </p>
          </div>
        </div>
        <div
          className="bottomRight"
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0rem 0.5rem",
          }}
        >
          {/* <button className="btn-primary" style={{width:'40px',height:'40px',display:'flex', justifyContent:'center',alignItems:'center', borderRadius:'50%'}}><AddIcon/></button> */}
          <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
            <RemoveIcon />
          </IconButton>
          <Typography color={"var(--black-color)"}>{count}</Typography>
          <IconButton onClick={() => setCount(count + 1)}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <Button
        onClick={()=>dispatch(addToCart({item: {...props, count}}))}
        sx={{backgroundColor:'#000', color:'#fff', mx:'0.5rem'}}
        
      >Add To Cart</Button>
    </div>
  );
};

export default CollectionCard;
