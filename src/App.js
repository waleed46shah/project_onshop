import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import Footer from "./components/Footer/Footer";

import CartMenu from "./containers/Cart/CartMenu";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Checkout from "./components/Checkout/Checkout";
import Login from "./containers/Authentication/Login/Login";

function App() {
  
  return (
    <div className="app">
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to='/Home'/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/item/:itemId" element={<ProductDetails/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        <Footer />
        <CartMenu/>
      
    </div>
  );
}

export default App;
