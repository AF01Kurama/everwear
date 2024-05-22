if (process.env.NODE_ENV != "production") require("dotenv").config();

const express = require("express");
const app = express();
const Email = require("./emailSchema");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const dburl = process.env.ATLAS_URL;
console.log(dburl);
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dburl);
  console.log("db connected");
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(3000, () => {
  console.log("app started");
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/email", async (req, res) => {
  console.log("hi");
  let { useremail } = req.body;
  console.log(useremail);
  let entry = new Email({
    email: useremail,
  });
  await entry.save();
  res.status(200).json({ message: "Data received successfully", useremail });
});

app.post("/send", (req, res) => {
  let sendingEmail = process.env.FROM_EMAIL;
  let receivingEmail = process.env.TO_EMAIL;
  let password = process.env.PASSWORD;
  const { email, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: sendingEmail,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: sendingEmail,
    to: receivingEmail,
    subject: subject,
    text: `From ${email} \n\n ${message}`,
    replyTo: email,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error, info);
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).json({ message: "Email sent successfully", info });
  });
});
