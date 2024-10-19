const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { auth, authCookie } = require('../middlewares/authenticationToken.cjs');
const sessionAuth = require('../middlewares/sessionLogin.cjs');
const sessionGoogleOAuth = require('../../infrastructure/middlewares/sessionOAuthConf.cjs');
const { versionMiddleware } = require('../middlewares/version.cjs');

const cuponController = require('../controllers/cuponController.cjs');
const cuponValidator = require('../validator/cuponValidator.cjs');

const CuponController = new cuponController();
const CuponValidator = new cuponValidator();

// const currentDirectory = process.cwd();
// let EXPRESS_STATIC = currentDirectory + '/src'
// router.get("/", async (req, res)=>{
//     res.sendFile(path.join(EXPRESS_STATIC, '/modules/pages/'));
// })

router.get("/", async (req, res) => {
    try {
        const cupons = await CuponController.getAllCupon(req, res);
        res.json(cupons); // Devuelve los Cuponos como JSON
    } catch (error) {
        console.error('Error fetching cupons:', error);
        res.status(500).json({ message: 'Error fetching cupons' });
    }
});


router.get('/:id', CuponValidator.validateCuponId(), (req, res) => CuponController.getCupon(req, res));
router.get('/find/:code', CuponValidator.validateCuponCode(), (req, res) => CuponController.getCuponIdCode(req, res));
router.get('/find/:fecha', CuponValidator.validateCuponFecha(), (req, res) => CuponController.getCuponFecha(req, res));
router.get('/product/:f', (req, res) => CuponController.productWithCupon(req, res));
// router.put('/:id', CuponValidator.validateCuponUpdateDataById(), (req, res) => CuponController.updateCupon(req, res));
// router.delete('/:id', CuponValidator.validateCuponId(), (req, res) => CuponController.deleteCupon(req, res));
// router.get('/search', (req, res) => CuponController.searchcupons(req, res));

module.exports = router;