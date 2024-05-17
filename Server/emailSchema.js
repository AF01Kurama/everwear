const mongoose = require("mongoose");

let emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

let Email = mongoose.model("Email", emailSchema);
module.exports = Email;
