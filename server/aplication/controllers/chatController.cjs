const { validationResult } = require('express-validator');
const ChatService = require('../services/ChatService.cjs');

class ChatController {
    constructor() {
        this.chatService = new ChatService();
    }

    async handleMessage(userId, message) {
        try {
            const chat = await this.chatService.LogMessage(userId, message);
            return chat
            // res.status(200).json(chat);
        } catch (error) {
            console.log("Error en envio del mensaje")
        }
    }

    async getChat(userId, res) {
        try {
            const messages = await this.chatService.getMessages(userId);
            res.json(messages); // esto es un array, debe ser
        } catch (error) {
            console.log("No se ha podido obtener el chat", error);
            res.status(500).json({ error: "Error al obtener los mensajes" });
        }
    }
    

    
    
}

module.exports = ChatController;