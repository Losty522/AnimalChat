const Message = require("../models/messageModel");

//get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all specific room messages
const getRoomMessages = async (req, res) => {
  const room = req.params.room;
  console.log(room);
  try {
    const messages = await Message.find({ room: room });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create new message
const createMessage = async (req, res) => {
  try {
    //check if user already exists
    const newMessage = new Message({
      msg: req.body.msg,
      user: req.body.user,
      userId: req.body.userId,
      unixTimestamp: req.body.unixTimestamp,
      room: req.body.room,
    });
    const addedMessage = await newMessage.save();
    res.json(addedMessage);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: "Item not found!" });

    const deletedMessage = await message.deleteOne();
    res.json(deletedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAllMessage = async (req, res) => {
  try {
    const result = await Message.deleteMany({});
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMessages,
  createMessage,
  getRoomMessages,
  deleteAllMessage,
  deleteMessageById,
};
