if (process.env.NODE_ENV != "production") require("dotenv").config();

const express = require("express");
const app = express();
const Email = require("./emailSchema");

const mongoose = require("mongoose");

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

app.post("/email", async (req, res) => {
  console.log("hi");
  let { useremail } = req.body;
  console.log(useremail);
  let entry = new Email({
    email: useremail,
  });
  await entry.save();
  res.redirect(process.env.CLIENT_URL);
});
