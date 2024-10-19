// Dependencias
const express = require('express');
const router = express.Router(); // { mergeParams: true } merge params me permite acceder a los parametros de rutas padres
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const multer = require('multer')

// Middlewares para verificacion
const { auth, authCookie } = require('../middlewares/authenticationToken.cjs');
const sessionAuth = require('../middlewares/sessionLogin.cjs');
const { versionMiddleware } = require('../middlewares/version.cjs');

// Controladores
const UserController = require('../controllers/userController.cjs');
const userController = new UserController();

// Validadores
const UserValidator = require('../validator/userValidator.cjs');
const userValidator = new UserValidator();

// Get all
router.get('/favorite/check/:id', userController.checkForAnIdOnFavoriteUserList)
router.get('/cart', (req, res) => userController.getAllItemsFromAField(req, res, 'carrito'))
router.get('/coupons', (req, res) => userController.getAllItemsFromAField(req, res, 'cupones'))
router.get('/purchases', (req, res) => userController.getAllItemsFromAField(req, res, 'compras'))
router.get('/favorites/workshops', (req, res) => userController.getAllItemsFromAField(req, res, 'talleres_favoritos'))
router.get('/subscribed/workshops', (req, res) => userController.getAllItemsFromAField(req, res, 'talleres_inscritos'))
// Agregates
router.get('/favorites/products/details', (req, res) => userController.getAllProductDetailseFromField(req, res, 'productos', 'favoritos'))
router.get('/cart/details', (req, res) => userController.getAllProductDetailsShopeFromFieldWithWorkshops(req, res, 'productos', 'carrito'))
router.get('/purchases/details', userController.getAllProductDetailseFromFieldWithWorkshops)
router.get('/favorites/workshops/details', (req, res) => userController.getAllProductDetailseFromField(req, res, 'taller', 'talleres_favoritos'))
router.get('/subscribed/workshops/details', (req, res) => userController.getAllProductDetailseFromField(req, res, 'taller', 'talleres_inscritos'))
router.get('/coupons/details', userController.getAllCuponDetailseFromFieldWithWorkshop)

router.post('/favorites/products/:id', express.json(), userValidator.validateFavoriteProductParam(), (req, res) => userController.createFieldOfArraysAndPushCouponsItems(req, res, 'favoritos'))
router.post('/cart/:id', express.json(), userValidator.validateFavoriteProductParam(), userController.createCartOfArraysAndPushObjectIdItems)
router.post('/purchases', express.json(), userValidator.validatePurchasesBodyPost(), userController.createPurchasesOfArraysAndPushObjectIdItems)
router.post('/favorites/workshops/:id', express.json(), userValidator.validateFavoriteProductParam(), (req, res) => userController.createFieldOfArraysAndPushCouponsItems(req, res, 'talleres_favoritos'))
router.post('/subscribed/workshops/:id', express.json(), userValidator.validateFavoriteProductParam(), (req, res) => userController.createFieldOfArraysAndPushCouponsItems(req, res, 'talleres_inscritos'))
router.post('/coupons/:id', express.json(), userValidator.validateFavoriteProductParam(), (req, res) => userController.createFieldOfArraysAndPushCouponsItems(req, res, 'cupones'))

router.delete('/favorites/products/:id', express.json(), userValidator.validateFavoriteProductParam(), (req, res) => userController.removeProductsFromFieldsList(req, res, 'favoritos'))
router.delete('/cart/:id', express.json(), userValidator.validateFavoriteProductParam(), (req, res) => userController.removeProductsFromCartsList(req, res, 'carrito'))
router.delete('/cart/dec/:id', express.json(), userValidator.validateFavoriteProductParam(), userController.decrementCartProduct)
router.delete('/favorites/workshops/:id', express.json(), userValidator.validateFavoriteProductParam(), (req, res) => userController.removeProductsFromFieldsList(req, res, 'talleres_favoritos'))
router.delete('/subscribed/workshops/:id', express.json(), userValidator.validateFavoriteProductParam(), (req, res) => userController.removeProductsFromFieldsList(req, res, 'talleres_inscritos'))
router.delete('/coupons/:id', express.json(), userValidator.validateFavoriteProductParam(), (req, res) => userController.removeProductsFromFieldsList(req, res, 'cupones'))


// Estamos trabajando con la subida de archivos hacia nuestro endpoint, por lo que la trata de datos debe ser distinta, ya que ahora debemos recibir files.

// Para esto, debemos especificarle a la ruta que ahora no va a esperar archivos json (express.json()), sino que deberá manejar archivos y que puede esperar
// ninguno o uno o varios, esto se hace con multer upload.none(), upload.single('file'), upload.array('file', maxCount)  o upload.fields([{ name: 'file1' }, { name: 'file2' }]) 
// con esto se le dice que va a esperar o ningun archivo, o uno solo con la llave 'file', o varios archivos con la misma clave 'file', o varios archivos con distintas claves
// (upload es la variable que almacena la declaracion de la funcion multer).

// Es importante que este middleware de multer sea puesto inmediatamente despues de la ruta para que procese los datos entrantes, y que posteriormente express-validator pueda procesar los datos de manera correcta y validarlos,
// esto porque express-validator solo es compatible con archivos json (express.json() application/json) o con archvos url-extended (express.urlencoded({extended: true} application/x-www-form-urlencoded)
// y el metodo con el que estamos trabajando para archivos es multipart/form-data, por lo que si definimos primero el express-validator, este no sabra como manipular los datos y le asignara a cada campo del body un undefined
// por lo tanto definiendo primero multer, este procesa los datos y los acomoda en req.body y req.file o req.files para que posteriormente ahi si express-validator los pueda manejar

// el nombre que se pone en el upload.single(<nombre>) de este caso debe ser igual al nombre del campo del formulario que se manda, es decir, el atributo name que se le dio o el que se le puso al formdata, y lo mismo con los nombres
// que se les de por si especificamos multiples archivos
const upload = multer({
    limits: {fileSize: 524288}
});
router.put('/edit', upload.single('file'), (req, res, next) => {
    for (let name of Object.keys(req.body) ) if (!req.body[name].trim()) delete req.body[name]
    next()
}, (req, res) => userController.editUserData(req, res))

// router.get('/:id', auth, userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
// router.get('/search', auth, (req, res) => userController.searchUsers(req, res));

// router.post('/', userValidator.validateUserData(), express.json(), (req, res) => userController.createUser(req, res));
// router.post('/login', versionMiddleware("1.1.0"), express.json(), sessionAuth,  userValidator.validateUserLogin(), (req, res) => userController.verifyUser(req, res))
// router.post('/login', versionMiddleware("1.0.0"), express.json(), cookieParser(), userValidator.validateUserLogin(), (req, res) => userController.verifyUserCookies(req, res))

// router.put('/:id', auth, userValidator.validateUserUpdateDataById(), express.json(), (req, res) => userController.updateUser(req, res));

// router.delete('/:id', auth, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));



module.exports = router;