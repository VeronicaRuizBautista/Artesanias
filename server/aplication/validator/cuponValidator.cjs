const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");

class CuponValidator {
    validateCuponData = () => {
        return [
            body('codigo')
            .notEmpty().withMessage('El código es obligatorio')
            .isString().withMessage('El código debe ser un texto'),

            body('descuento')
                .notEmpty().withMessage('El descuento es obligatorio')
                .isString().withMessage('El descuento debe ser un texto'),

            body('idProductos')
                .isArray().withMessage('idProductos debe ser un array')
                .custom((value) => {
                    if (!value.every(id => isValidObjectId(id))) {
                        throw new Error('Todos los idProductos deben ser ObjectIds válidos');
                    }
                    return true;
                }),

            body('fechaVencimiento')
                .isISO8601().withMessage('fechaVencimiento debe ser una fecha válida')
                .toDate(), // Opcional: convierte el string a un objeto Date

            // Validación de parámetros en la URL
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No se deben enviar parámetros en la URL');
                }
                return true;
            })
        ];
    };

    validateCuponDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    
    validateCuponCode = () => {
        return [
            param('code').isString().withMessage('code must be a string').withMessage('code cannot be empty'),

            // Validar que no se envíen parámetros adicionales en la URL
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error("Don't send anything in the URL");
                }
                return true;
            }),

            // Validar que no se envíen datos en el cuerpo de la solicitud
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };
    validateCuponFecha = () => {
        return [
            // Validar que 'fechaVencimiento' sea una fecha válida
            param('fechaVencimiento')
                .isISO8601().withMessage('fechaVencimiento must be a valid date')
                .toDate(), // convierte el string a un objeto Date
    
            // Validar que no se envíen parámetros adicionales en la URL
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error("Don't send anything in the URL");
                }
                return true;
            }),
    
            // Validar que no se envíen datos en el cuerpo de la solicitud
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    validateCuponId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };
    validateCuponUpdateDataById = () => {
        return [   
            body('codigo').notEmpty().isString().withMessage('el codigo es obligatorio'),
            body('descuento').isString().withMessage('debe colocar la descuento'),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };
}

module.exports = CuponValidator;