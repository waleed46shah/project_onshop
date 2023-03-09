import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      try {
        state.items = action.payload;
        console.log(state.items);
      } catch {}
    },
    addToCart: (state, action) => {
      try {
        
        
        state.cart = [...state.cart, { ...action.payload.item }];
        console.log(state.cart);
        console.log(state.items);
      } catch {}
    },
    removeFromCart: (state, action) => {
      try {
        const itemId = action.payload;
        
        state.cart = state.cart.filter((item) => item._id !== itemId);
        console.log(window.store.getState())
      } catch {}
    },

    increaseCount: (state, action) => {
      try {
        
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload._id) {
            item.count++;
          }
          return item;
        });
      } catch {}
    },
    decreaseCount: (state, action) => {
      try {
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload._id && item.count > 1) {
            item.count--;
          }
          return item;
        });
      } catch {}
    },
    clearCart: (state,action)=>{
      try{
        state.cart = [];
      }
      catch{

      }
    }
    ,
    setIsCartOpen: (state) => {
      try {
        state.isCartOpen = !state.isCartOpen;
      } catch {}
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
