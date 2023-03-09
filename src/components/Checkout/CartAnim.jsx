import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

import animation from "../../animations/42176-empty-cart.json";

const CartAnim = () => {
  const anime = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animation,
    });
    return () => lottie.stop();
  }, []);
  return <div style={{ height: 250, width: 300 }} ref={anime}></div>;
};

export default CartAnim;