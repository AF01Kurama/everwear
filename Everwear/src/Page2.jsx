import React, { useEffect, useRef, useState } from "react";
import "./Page2.css";
import img1 from "./assets/card1.1.png";
import img2 from "./assets/card2.png";
import img3 from "./assets/card3.png";
import img4 from "./assets/card4.png";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";

function Page2({ width }) {
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
  let [email2, setEmail2] = useState("");

  let [sendEmail, setSendEmail] = useState(false);
  let [subject, setSubject] = useState("");
  let [message, setMessage] = useState("");

  const handleInput = (fn, event) => {
    let str = event.target.value;
    if (fn == setEmail) {
      if (
        str.match(
          /^[A-Za-z\._0-9]+[@][A-Za-z]+[\.][a-z]{2,}(?:[\.][a-z]{2,})?$/
        )
      )
        setValidEmail(true);
      else setValidEmail(false);
    }
    fn(str);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (validEmail) {
      setEmailSubmitted(true);
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
    } else return;
  };
  const onSubmitSend = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/send", {
        email: email2,
        subject: subject,
        message: message,
      })
      .then(() => {
        setSendEmail(false);
        setEmail2("");
        setSubject("");
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const contents = [
    <>
      <div className="cardBody">
        <h2 className="cardTitle">Full Wardrobe, Nothing to Wear</h2>
        <div className="cardDesc">
          Never worry about what to wear again. Our rental service offers a
          rotating wardrobe for every occasion, with a new outfit
          provided weekly.
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
          individuals on tight budgets. Stay stylish on a budget by accessing
          the latest trends affordably with our circular model.
        </div>
      </div>
    </>,
    <>
      <div className="cardBody">
        <h2 className="cardTitle">Infinite Wardrobe, Minimal Footprint</h2>
        <div className="cardDesc">
          Embrace an expansive wardrobe experience within minimal space
          constraints. Expand your wardrobe with our monthly subscription.
          Curated outfits, refreshed regularly. Plus, if you fall in love with a
          piece, you have the option to keep one or two favorites at the end of
          each month.
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
          Embrace our eco-friendly approach. We're dedicated to sustainability,
          reducing waste, and lowering carbon emissions. By minimizing your
          carbon footprint and extending clothing lifespans, together, we can
          protect the planet.
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
                onChange={(event) => {
                  handleInput(setEmail, event);
                }}
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
      <div className="contact">
        You can reach us at <b>everwears@gmail.com</b> or{" "}
        <span
          onClick={() => {
            setSendEmail(true);
          }}>
          <u>click here</u>
        </span>{" "}
        to send us an email.
      </div>
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
      <div className={`emailBox ${!sendEmail ? null : "show"}`}>
        <div
          className="cancel"
          onClick={() => {
            setSendEmail(false);
          }}>
          <span>&#10060;</span>
        </div>
        <form onSubmit={onSubmitSend}>
          <div className="send">
            <div>
              <label htmlFor="email" className="form-label fs-5">
                Email
              </label>
              <input
                type="text"
                placeholder="Email..."
                name="email"
                id="email"
                className="form-control"
                value={email2}
                onChange={(event) => {
                  handleInput(setEmail2, event);
                }}
              />
            </div>
            <div>
              <label htmlFor="subject" className="form-label fs-5">
                Subject
              </label>
              <input
                type="text"
                placeholder="Subject..."
                name="subject"
                id="subject"
                className="form-control"
                value={subject}
                onChange={(event) => {
                  handleInput(setSubject, event);
                }}
              />
            </div>
            <div style={{ flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="form-control"
                placeholder="Message..."
                value={message}
                onChange={(event) => {
                  handleInput(setMessage, event);
                }}></textarea>
            </div>
            <button type="submit" className="btn btn-outline-success">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page2;
