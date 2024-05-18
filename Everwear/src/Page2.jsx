import React, { useEffect, useRef, useState } from "react";
import "./Page2.css";
import img1 from "./assets/card1.1.png";
import img2 from "./assets/card2.png";
import img3 from "./assets/card3.png";
import img4 from "./assets/card4.png";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";

function Page2({ width, height }) {
  const targetRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const scrollYProgress = targetRefs.map(
    (ref) =>
      useScroll({
        target: ref,
        offset: ["start end", "60% end"],
      }).scrollYProgress
  );
  const opacities = scrollYProgress;
  const translates = scrollYProgress.map((progress) =>
    useTransform(progress, [0, 1], ["20%", "0%"])
  );

  let [emailSubmitted, setEmailSubmitted] = useState(false);
  let [validEmail, setValidEmail] = useState(false);
  let [email, setEmail] = useState("");
  const handleInput = (event) => {
    let str = event.target.value;
    if (
      str.match(/^[A-Za-z\._0-9]+[@][A-Za-z]+[\.][a-z]{2,}(?:[\.][a-z]{2,})?$/)
    )
      setValidEmail(true);
    else setValidEmail(false);
    setEmail(str);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("https://everwear.onrender.com/email", {
        useremail: email,
      })
      .then(() => {
        console.log(done);
      })
      .catch((err) => {
        console.log(err);
      });
    if (validEmail) setEmailSubmitted(true);
    else return;
  };
  const contents = [
    <>
      <div className="cardBody">
        <h2 className="cardTitle">Full Wardrobe, Nothing to Wear</h2>
        <div className="cardDesc">
          Ever got the feeling of having a full wardrobe but feel like you have
          nothing suitable to wear? Whether it be for your next office meeting
          or your next Instagram post, our subscription based rental model
          provides access to a constantly updated selection of outfits, ensuring
          that you always have fresh and appropriate outfits.
        </div>
      </div>
      <div className="cardPhoto">
        <img src={img1} alt="img1" />
      </div>
    </>,
    <>
      <div className="cardPhoto">
        <img src={img2} alt="img2" />
      </div>
      <div className="cardBody">
        <h2 className="cardTitle">Trendy Clothes, Tight Budget</h2>
        <div className="cardDesc">
          Keeping up with fashion trends can be expensive, especially for
          individuals on tight budgets. Our model offers a cost-effective
          alternative to purchasing trendy items outright allowing you to access
          the latest fashion without the hefty price tag, enabling you to stay
          stylish within your budget.
        </div>
      </div>
    </>,
    <>
      <div className="cardBody">
        <h2 className="cardTitle">Infinite Wardrobe, Minimal Footprint</h2>
        <div className="cardDesc">
          Embrace an expansive wardrobe experience within minimal space
          constraints. Our monthly subscription service offers a curated
          selection of outfits, ensuring a diverse and constantly refreshed
          collection. Seamlessly integrate style into your life without clutter,
          and discover the convenience of an infinite wardrobe that complements
          your lifestyle with elegance and efficiency. Plus, if you fall in love
          with a piece, you have the option to keep one or two favorites at the
          end of each month.
        </div>
      </div>
      <div className="cardPhoto">
        <img src={img3} alt="img3" />
      </div>
    </>,
    <>
      <div className="cardPhoto">
        <img src={img4} alt="img4" />
      </div>
      <div className="cardBody">
        <h2 className="cardTitle">Fashion Meets Nature</h2>
        <div className="cardDesc">
          The fashion industry's environmental impact, including textile waste
          and carbon emissions, is a growing concern for environmentally
          conscious consumers. Our model promotes sustainability by reducing the
          demand for new clothing production and minimizing textile waste, and
          you can contribute to environmental conservation efforts by prolonging
          the lifespan of clothing items and reducing their carbon footprint.
        </div>
      </div>
    </>,
    <>
      <h1>COMING SOON</h1>
      {!emailSubmitted ? (
        <>
          <div>
            Stay in the loop and enjoy a <b>free month's subscription</b> at
            launch by sharing your email with us.
          </div>
          <form onSubmit={onSubmit}>
            <div>
              {validEmail || email == "" ? null : (
                <div className="invalid-email">Please enter a valid email</div>
              )}

              <input
                type="email"
                placeholder="Enter your email here..."
                className="form-control"
                name="useremail"
                value={email}
                onChange={handleInput}
                required
              />
              <button className="btn btn-outline-success" type="submit">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          Thank you for expressing interest in our brand! We're excited to have
          you on board.
        </div>
      )}
    </>,
  ];
  return (
    <div className="main2">
      <h1>Our Signature Features</h1>
      {targetRefs.map((ref, index) => (
        <motion.div
          className={index === 4 ? "end" : "card_"}
          key={index}
          ref={ref}
          style={{
            translateY: translates[index],
            opacity: opacities[index],
            flexDirection:
              width < 700 && index !== 4
                ? [0, 2].includes(index)
                  ? "column-reverse"
                  : "column"
                : null,
          }}>
          {contents[index]}
        </motion.div>
      ))}
    </div>
  );
}

export default Page2;
