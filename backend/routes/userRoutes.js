const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.get("/", userController.getAllusers); // B
router.get("/cookie", userController.getUserByCookie); // R
router.put("/:id", userController.updateUser); // E
router.post("/", userController.createUser); // A
//router.delete('/', ) // D
//router.delete('/:id', ) // D

module.exports = router;
