const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  msg: String,
  user: String,
  userId: String,
  unixTimestamp: Number,
  room: String,
});

module.exports = mongoose.model("Message", messageSchema);
