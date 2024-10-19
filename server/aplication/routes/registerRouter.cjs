const passport = require('passport');
const express = require('express');
const router = express.Router();

// Configuradores de passport para las diferentes estrategias de aitenticacion
const configPassportGoogleOAuth = require('../middlewares/GoogleOAuth.cjs');
const configPassportFacebookOAuth = require('../middlewares/FacebookOAuthStrategy.cjs')
const configPassportDiscordOAuth = require('../middlewares/DiscordOAuthStrategy.cjs')
const configPassportGitHubOAuth = require('../middlewares/GitHubOAuthStrategy.cjs')

// Callbacks de los OAuths
const {loginGoogleAuthCallback, loginFacebookAuthCallback, loginDiscordAuthCallback } = require('../controllers/OAuthsController.cjs')

// Validaciones de los cuerpos para peticiones HTTP
const UserValidator = require('../validator/userValidator.cjs')
const userValidator = new UserValidator()

// Controladores
const UserController = require('../controllers/userController.cjs')
const userController = new UserController()

router.get('/', (req,res) => res.status(400).json({msg: 'Cree una cuenta'}))

router.get('/auth/google', (req, res, next) => {
    configPassportGoogleOAuth(passport, 'register') 
    next()
},passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback', loginGoogleAuthCallback )

router.get('/auth/facebook', (req, res, next) =>{
    configPassportFacebookOAuth(passport, 'register')
    next()
},passport.authenticate('facebook', {scope: ['email']}))
router.get('/auth/facebook/callback', loginFacebookAuthCallback)

router.get('/auth/discord', (req, res, next) => {
    configPassportDiscordOAuth(passport, 'register')
    next()
},passport.authenticate('discord'))
router.get('/auth/discord/callback', loginDiscordAuthCallback)

router.post('/auth/ruraqMaki', express.json(),userValidator.validateUserRegistration(), userController.registerUser)

router.get('/auth/github', (req, res, next) => {
    configPassportGitHubOAuth(passport, 'register')
    next()
},passport.authenticate('github', { scope: [ 'user:email' ] }))

module.exports = router;