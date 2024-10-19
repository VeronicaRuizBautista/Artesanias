const express = require('express');
const cors = require('cors');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const ConnectToDatabase = require('./infrastructure/database/database.cjs');
const createServer = require('./infrastructure/server/server.cjs');


const startApp = async () => {

    
    const { app: expressApp, server, io } = createServer();
    
    expressApp.use((err,req, res, next) => {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({status: 413, message: 'El archivo es demasiado grande. Límite máximo: 0.5 MB'});
        }
        res.status(404).json({ message: "No tiene autorización" });
        next(err);
    });

    const DBConnection = async() => {
        const dbInstance = new ConnectToDatabase()
        try {
            await dbInstance.connectOpen()
            console.log("Conexion a la db exitosa")
        }catch(error) {
            console.log("Conexión a la base de datos fallida: ", error.message)
        }
    }
    DBConnection()
    
    const PORT = process.env.EXPRESS_PORT || 3000;

    server.listen(PORT, () => {
        console.log(`Servidor escuchando en http://${process.env.EXPRESS_HOST}:${PORT}`);

        // Ejemplo de enviar un mensaje desde el servidor cada 5 segundos
        // setInterval(() => {
        //     io.emit('recievedMessage', { texto: 'mensaje del servidor', transmitter: 'server' });
        // }, 5000);
    });
};

startApp();
