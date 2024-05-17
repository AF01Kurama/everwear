import React, { useState } from "react";
import "./Page1.css";
import Photos from "./Photos";
import Preloader from "./Preloader";

function Page1({ width }) {
  let x = width / 1000;
  let indices = [0, 1, 2, 3, 4, 5];
  let [index, setIndex] = useState(0);
  const clickArrow = (num) => {
    setIndex((prev) => {
      let value = (indices.indexOf(prev) + num) % 6;
      if (value < 0) value += 6;
      return indices[value];
    });
  };
  return (
    <>
      <Preloader />
      <div className="main1">
        <div className="title">
          <h1
            className={
              width > 450
                ? [1, 3, 5].includes(index)
                  ? "black"
                  : "white"
                : "white"
            }
            style={{ fontSize: `${x * 7}rem` }}>
            EVERWEAR
          </h1>
        </div>
        <div className="photos">
          <Photos
            photoNum={index}
            setIndex={setIndex}
            clickArrow={clickArrow}
            width={width}
          />
        </div>
      </div>
    </>
  );
}

export default Page1;
