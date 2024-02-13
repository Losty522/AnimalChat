const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Routes
router.get("/", messageController.getAllMessages); // B
router.get("/:room", messageController.getRoomMessages);
router.post("/", messageController.createMessage); // A
router.delete("/", messageController.deleteAllMessage); // D
router.delete("/:id", messageController.deleteMessageById); // D

module.exports = router;
