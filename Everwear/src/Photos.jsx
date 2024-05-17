import React, { useState, useEffect, useRef } from "react";
import "./Photos.css";
import stock1 from "./assets/bg1.jpg";
import stock2 from "./assets/bg2.jpg";
import stock3 from "./assets/bg3.jpg";
import stock4 from "./assets/bg4.png";
import stock5 from "./assets/bg5.jpg";
import stock6 from "./assets/bg6.jpg";
import stockM1 from "./assets/bg1.1.jpg";
import stockM2 from "./assets/bg2.1.png";
import stockM3 from "./assets/bg3.1.png";
import stockM4 from "./assets/bg4.1.png";
import stockM5 from "./assets/bg5.1.png";
import stockM6 from "./assets/bg6.1.png";
import { preloadImages } from "./preload";

function Photos({ photoNum, clickArrow, width }) {
  let photoList = [stock1, stock2, stock3, stock4, stock5, stock6];
  let photoMList = [stockM1, stockM2, stockM3, stockM4, stockM5, stockM6];

  useEffect(() => {
    preloadImages([...photoList, ...photoMList]);
  }, []);
  return (
    <div className="stockphotos">
      <img
        src={width > 450 ? photoList[photoNum] : photoMList[photoNum]}
        alt="stock"
        className="stocks"
      />
      <div
        style={{ scale: width < 450 ? "80%" : null }}
        className={`arrow right ${
          width > 450
            ? [1, 3, 5].includes(photoNum)
              ? "black black-out"
              : "white white-out"
            : "white white-out"
        }`}
        onClick={() => {
          clickArrow(1);
        }}>
        <span>&gt;</span>
      </div>
      <div
        style={{ scale: width < 450 ? "80%" : null }}
        className={`arrow left ${
          width > 450
            ? [1, 3, 5].includes(photoNum)
              ? "black black-out"
              : "white white-out"
            : "white white-out"
        }`}
        onClick={() => {
          clickArrow(-1);
        }}>
        <span>&lt;</span>
      </div>
    </div>
  );
}

export default Photos;
