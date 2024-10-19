const express = require('express');
const path = require('path');
const {loginGitHubAuthCallback} = require('../controllers/OAuthsController.cjs')

const router = express.Router();

router.get('/auth/check', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({ authenticated: true, user: req.user, details: 'Usuario logueado' });
    } else {
        return res.status(401).json({ authenticated: false, user: null, details: 'No se encuentra logueado' });
    }
});

router.get('/auth/github/callback', loginGitHubAuthCallback)
// Ejemplo de una peticion de registro desde el frontend y manejar la respuesta
/* router.get('/prueba', async (req, res, next) => {

    let data = {
        "username": "Pepito",
        "password": "123456",
        "email": "jiji"
    }
    console.log('sadasda')
    console.log(data)
    console.log(req.isAuthenticated());
    let fet = await fetch('http://localhost:3000/login/auth/ruraqmaki', { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(data) })
    fet = await fet.json()
    console.log('res');

    console.log(fet)
    //  if (!fet.redirected) {
    //      console.log('entra');
    //      fet = await fet.json()
    //  }
    //  console.log('this one',fet)
    console.log(req.isAuthenticated());
    res.status(200).json({ data: fet })


}) */

module.exports = router;