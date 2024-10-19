// Define las rutas de la aplicación y mapea las URLs a los controladores.
const UserController = require('../controllers/userController.cjs');
const UserValidator = require('../validator/userValidator.cjs');

const userController = new UserController();
const userValidator = new UserValidator();

const express = require('express');
const path = require('path');
const router = express.Router();



router.post('/', express.urlencoded({ extended: true }), userValidator.validateUserData(), (req, res) => userController.createUser(req, res));



module.exports = router;