import React, { useEffect, useState } from "react";
import "./App.css";
import Page1 from "./Page1";
import Page2 from "./Page2";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [heigth, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="main">
      <Page1 width={width} heigth={heigth} />
      <Page2 width={width} heigth={heigth} />
    </div>
  );
}

export default App;
