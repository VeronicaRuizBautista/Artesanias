const chatRepository = require("../../domain/repositories/chatRepository.cjs")

class ChatService {
    constructor() {
        this.chatRepo = new chatRepository()
    }
    
    async LogMessage(userId, message) {
        try {
            // console.log("Parametros de LogMessage: ", {userId, message})
            const chat = await this.chatRepo.save(userId, message); // Aquí el mensaje es el objeto completo
            return chat;
        } catch (error) {
            console.error("Error guardando el mensaje:", error);
            throw error;
        }
    }

    async getMessages(userId) {
        try {
            const chat = await this.chatRepo.reflect(userId); // Pasa el userId
            return chat;
        } catch (error) {
            console.error("Error obteniendo los mensajes:", error);
            throw error;
        }
    }
    
}


module.exports = ChatService;