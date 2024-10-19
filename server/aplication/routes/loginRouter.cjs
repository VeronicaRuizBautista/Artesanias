const passport = require('passport');
const express = require('express');
const router = express.Router();

// Configuradores de passport para las diferentes estrategias de aitenticacion
const configPassportGoogleOAuth = require('../middlewares/GoogleOAuth.cjs');
const configPassportFacebookOAuth = require('../middlewares/FacebookOAuthStrategy.cjs')
const configPassportDiscordOAuth = require('../middlewares/DiscordOAuthStrategy.cjs')
const configPassportLocalOAuth = require('../middlewares/LocalOAuthStrategy.cjs')
const configPassportGitHubOAuth = require('../middlewares/GitHubOAuthStrategy.cjs')

// Callbacks de los OAuths
const {loginGoogleAuthCallback, loginFacebookAuthCallback, loginDiscordAuthCallback } = require('../controllers/OAuthsController.cjs')

// Validaciones de los cuerpos para peticiones HTTP
const UserValidator = require('../validator/userValidator.cjs')
const userValidator = new UserValidator()

// router.post('/auth/user', express.urlencoded({ extended: true }), (req, res) => userController.verifyUser(req, res))

router.get('/', (req,res) => res.status(400).json({msg: 'iniciar sesion'}))

router.get('/auth/google', (req,res,next) =>{
    configPassportGoogleOAuth(passport, 'login');
    next()
},passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback', loginGoogleAuthCallback )

router.get('/auth/facebook', (req, res, next) => {
    configPassportFacebookOAuth(passport, 'login')
    next()
},passport.authenticate('facebook', {scope: ['email']}))
router.get('/auth/facebook/callback', loginFacebookAuthCallback)

router.get('/auth/discord', (req, res, next) => {
    configPassportDiscordOAuth(passport, 'login')
    next()
},passport.authenticate('discord'))
router.get('/auth/discord/callback', loginDiscordAuthCallback)

router.post('/auth/ruraqmaki', express.json(), userValidator.validateUserLogIn(), (req, res, next) => {
    configPassportLocalOAuth(passport)
    next()
}, passport.authenticate('local'), (req, res) => res.status(200).json({code: 200, msg: 'login exitoso'}));

router.get('/auth/github', (req, res, next) => {
    configPassportGitHubOAuth(passport, 'login')
    next()
},passport.authenticate('github', { scope: [ 'user:email' ] }))

module.exports = router;