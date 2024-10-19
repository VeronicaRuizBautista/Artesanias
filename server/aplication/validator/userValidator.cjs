const { body, query, param, files } = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports = class UserValidator {

    validateUserRegistration = () => {
        return [
            body().notEmpty().withMessage('No ha enviado ningun dato a guardar').custom((value, { req }) => {
                if (!req.body.email && !req.body.phone) {
                    throw new Error('Debe proporcionar al menos un teléfono o un email.');
                }
                return true;
            }),

            body('nick')
                .notEmpty().withMessage('Campo vacio')
                .isString().withMessage('Tipo de dato invalido')
                .isLength({ min: 5, max: 12 }).withMessage('Cadena de minimo 5 caracteres y maximo 12'),

            body('password')
                .notEmpty().withMessage('Campo no puede estar vacio')
                .isString().withMessage('Tipo de dato invalido')
                .custom(async (value, { req }) => {
                    req.body.passwordHash = await bcrypt.hash(value, 10);
                    return true;
                }),

            body('email')
                .optional()
                .notEmpty().withMessage('Email vacio, ingrese un valor')
                .isEmail().withMessage('Formato de email invalido')
                .custom((value, { req }) => {
                    // Si el correo está presente, entonces el teléfono puede ser opcional
                    if (!req.body.phone && !value) {
                        throw new Error('Debe proporcionar al menos un teléfono o un email.');
                    }
                    return true;
                }),

            body('phone')
                .optional()
                .notEmpty().withMessage('No puede registrar el telefono vacio')
                .isString().withMessage('Tipo de dato invalido')
                .custom((value, { req }) => {
                    if (!req.body.email && !value) {
                        throw new Error('Debe proporcionar al menos un teléfono o un email.');
                    }
                    return true;
                }),

            body('sex')
                .optional()
                .notEmpty().withMessage('Campo no puede estar vacio')
                .isString().withMessage('Tipo de dato invalido')
                .custom(value => {
                    if (value && !['Masculino', 'Femenino'].includes(value)) throw new Error('Solo existen dos sexos: Masculino, Femenino')
                    return true
                }),

            body('birth_day')
                .optional(),

            query()
                .custom((value, { req }) => {
                    if (Object.keys(req.query).length > 0) {
                        throw new Error(`Don't send anything in the url`);
                    }
                    return true;
                })
        ]
    }

    validateUserLogIn = () => {
        return [

            body('identifier')
                .notEmpty().withMessage('El campo no puede estar vacio')
                .isString().withMessage('Tipo de dato invalido'),
            body('password')
                .notEmpty().withMessage('Campo no puede estar vacio')
                .isString().withMessage('Tipo de dato invalido')

        ]
    }

    validateFavoriteProductParam = () => {
        return [

            param('id')
                .isMongoId()
                .withMessage('El id proporcionado no es un ObjectId válido'),

            body().custom((value, { req }) => {
                return Object.keys(req.body).length === 0;
            }).withMessage('No se debe enviar ningún dato en el cuerpo (body)'),

            query().custom((value, { req }) => {
                return Object.keys(req.query).length === 0;
            }).withMessage('No se debe enviar ningún dato en la query')

        ]
    }

    validatePurchasesBodyPost = () => {

        return [
            body('cantidad')
                .isNumeric().withMessage('Tipo de dato invalido'),
            body('total')
                .isNumeric().withMessage('Debe registrar un total como valor entero'),
            body('productos').isArray({min: 1}).withMessage('Minimo un id para la compra'),
            query().custom((value, { req }) => {
                return Object.keys(req.query).length === 0;
            }).withMessage('No se debe enviar ningún dato en la query')

        ]

    }

    validateUserInfoEdit = () => {
        return [

            body().custom((value, { req }) => {
                if (!req.body.email && !req.body.phone && !req.body.username && !req.body.sex && !req.body.birth_day && !req.body.payment_method && !req.file && !req.body.nick) {
                    throw new Error('Debe proporcionar al menos nombre de usuario o un email o telefono, o sexo, o fecha de nacimiento, o metodo de pago, o foto de perfil para actualizar.');
                }

                const allowedFields = ['email', 'phone', 'username', 'sex', 'birth_day', 'payment_method', 'nick'];
                const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field) && field !== 'file');

                if (extraFields.length > 0) {
                    throw new Error(`Los campos adicionales no están permitidos: ${extraFields.join(', ')}`);
                }

                return true;
            }),
            body('nick')
                .optional()
                .notEmpty().withMessage('Campo no puede estar vacio')
                .isString().withMessage('Tipo de dato invalido')
                .isLength({ min: 5, max: 12 }).withMessage('Cadena de minimo 5 caracteres y maximo 12'),

            body('email')
                .optional()
                .notEmpty().withMessage('Campo no puede estar vacio')
                .isEmail().withMessage('Formato de email invalido'),

            body('phone')
                .optional()
                .notEmpty().withMessage('No puede registrar el telefono vacio')
                .isString().withMessage('Tipo de dato invalido'),

            body('sex')
                .optional()
                .notEmpty().withMessage('Campo no puede estar vacio')
                .isString().withMessage('Tipo de dato invalido')
                .custom(value => {
                    if (value && !['MASCULINO', 'FEMENINO'].includes(value.toUpperCase())) throw new Error('Solo existen dos sexos: Masculino, Femenino')
                    return true
                }),

            body('birth_day')
                .optional()
                .isDate().withMessage('Formato de fecha invalido'),

            body('payment_method')
                .optional()
                .notEmpty().withMessage('No puede estar vacio'),

            query().custom((value, { req }) => {
                return Object.keys(req.query).length === 0;
            }).withMessage('No se debe enviar ningún dato en la query')

        ]
    }

}