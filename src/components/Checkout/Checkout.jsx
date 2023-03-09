import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Checkout.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartAnim from "./CartAnim";
import { Divider } from "@mui/material";

import {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  clearCart,
} from "../../state";
//import { clearCart } from "../state";
//import { useHistory } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted!", { address, accountNumber, cashOnDelivery });
  };

  const handleCashOnDeliveryChange = (event) => {
    setCashOnDelivery(event.target.checked);
    if (event.target.checked) {
      setAccountNumber("");
    }
  };
  const isAccountNumberDisabled = cashOnDelivery;

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="app__section">
          <h1 className="head-text">Your Items</h1>
          <div className="app__checkout">
            <div className="app__checkout-items">
            <div className="app__checkout-total">
                <div className="quantity">
                  <h2 className="head-text">Total:</h2>
                  <h2 className="head-text">
                    <span style={{ fontWeight: "bold", color: "green" }}>
                      {cartItems.reduce((total, item) => total + item.count, 0)}{" "}
                      item(s) -
                    </span>{" "}
                    <span style={{ fontWeight: "bold", color: "green" }}>
                      ${totalAmount.toFixed(2)}
                    </span>
                  </h2>
                </div>
                <button onClick={handleClearCart}>Clear Cart</button>
              </div>
              {cartItems.map((item) => (
                <>
                  <div className="item" key={item.id}>
                    <div className="prod-img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="prod-det">
                      <div className="prod-details">
                        <p className="p-text name">{item.name}</p>
                        <p className="p-text desc">{item.desc}</p>
                      </div>
                      <div className="prod-count">
                        <RemoveIcon
                          onClick={() =>
                            dispatch(decreaseCount({ _id: item._id }))
                          }
                        />
                        <p
                          className="p-text"
                          style={{ color: "red", fontWeight: "800" }}
                        >
                          {item.count}
                        </p>
                        <AddIcon
                          onClick={() =>
                            dispatch(increaseCount({ _id: item._id }))
                          }
                        />
                      </div>
                      <div className="prod-price">
                        <h2 className="head-text">
                          {item.count} *{" "}
                          <span style={{ color: "green" }}>${item.price}</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <hr id="line" style={{ margin: "1rem 5rem" }} />
                </>
              ))}
              
            </div>
            <div className="app__checkout-payment">
              <h1 className="head-text">Payment Form</h1>
              <form onSubmit={handleSubmit} className="checkout-form">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />

                <label htmlFor="account-number">Account Number</label>
                <input
                  type="text"
                  name="account-number"
                  id="account-number"
                  value={accountNumber}
                  onChange={(event) => setAccountNumber(event.target.value)}
                  disabled={isAccountNumberDisabled}
                  required={!isAccountNumberDisabled}
                />

                <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                <input
                  type="checkbox"
                  name="cash-on-delivery"
                  id="cash-on-delivery"
                  checked={cashOnDelivery}
                  onChange={handleCashOnDeliveryChange}
                />

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="empty"
          style={{
            padding: "1rem 1rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            textAlign: "center",
          }}
        >
          <h1>CART IS EMPTY</h1>
        </div>
      )}
    </>
  );
};

export default Checkout;
