const express = require("express");
const ChatController = require("../controllers/chatController.cjs")

const router = express.Router();

const chatController = new ChatController()

router.get("/:userId", (req, res) => chatController.getChat(req.params.userId, res));

module.exports = router