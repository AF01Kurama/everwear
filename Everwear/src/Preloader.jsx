import React, { useEffect } from "react";
import "./Preloader.css";
import { preLoaderAnim } from "./preloadpage";

function Preloader() {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Your</span>
        <span>Infinite</span>
        <span>Wardrobe</span>
      </div>
    </div>
  );
}

export default Preloader;
