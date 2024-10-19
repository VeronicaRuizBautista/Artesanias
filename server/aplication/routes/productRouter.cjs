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

const productController = require('../controllers/productController.cjs');
const productValidator = require('../validator/productValidator.cjs');

const ProductController = new productController();
const ProductValidator = new productValidator();

// const currentDirectory = process.cwd();
// let EXPRESS_STATIC = currentDirectory + '/src'
// router.get("/", async (req, res)=>{
//     res.sendFile(path.join(EXPRESS_STATIC, '/modules/pages/'));
// })

router.get("/products", async (req, res) => {
    try {
        const products = await ProductController.getAllProduct(req, res);
        res.json(products); // Devuelve los productos como JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});
router.get("/v1.1.0", sessionAuth,  auth, (req, res)=>{
    res.sendFile(path.join(EXPRESS_STATIC, '/modules/pages/'));
})
router.get("/v1.0.0", cookieParser(), authCookie, (req, res)=>{
    res.sendFile(path.join(EXPRESS_STATIC, '/modules/pages/'));
})
router.get("/v2.0.0", sessionGoogleOAuth, (req, res)=>{
    console.log(req.session);
    res.sendFile(path.join(EXPRESS_STATIC, '/modules/pages/'));
})



router.get('/:id', ProductValidator.validateProductId(), (req, res) => ProductController.getProduct(req, res));
router.get('/find/:category', ProductValidator.validateProductCategory(), (req, res) => ProductController.getProductCategory(req, res));
router.get('/', (req, res) => ProductController.getAllProduct(req, res));
router.put('/:id', ProductValidator.validateProductUpdateDataById(), (req, res) => ProductController.updateProduct(req, res));
// router.delete('/:id', ProductValidator.validateProductId(), (req, res) => ProductController.deleteProduct(req, res));
// router.get('/search', (req, res) => ProductController.searchProducts(req, res));

module.exports = router;