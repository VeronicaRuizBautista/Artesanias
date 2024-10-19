const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");

class ProductValidator {
    validateProductData = () => {
        return [
            body('nombre')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isString().withMessage('El nombre debe ser un texto'),

            body('descripcion')
                .optional()
                .isString().withMessage('La descripción debe ser un texto'),

            body('categoria')
                .notEmpty().withMessage('La categoría es obligatoria')
                .isString().withMessage('La categoría debe ser un texto'),

            body('img')
                .notEmpty().withMessage('La URL de la imagen es obligatoria')
                .isString().withMessage('La URL de la imagen debe ser un texto')
                .isURL().withMessage('La URL de la imagen debe ser válida'),

            body('idTaller')
                .notEmpty().withMessage('El idTaller es obligatorio')
                .custom(value => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El idTaller debe ser un ObjectId válido');
                    }
                    return true;
                }),

            body('precio')
                .notEmpty().withMessage('El precio es obligatorio')
                .isNumeric().withMessage('El precio debe ser un número'),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`No se deben enviar parámetros en la URL`);
                }
                return true;
            })
        ];
    };

    validateProductDataEmpty = () => {
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

    
    validateProductCategory = () => {
        return [
            param('category').isString().withMessage('Category must be a string').trim().isLength({ min: 1 }).withMessage('Category cannot be empty'),

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

    validateProductId = () => {
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
    validateProductUpdateDataById = () => {
        return [   
            body('nombre').notEmpty().isString().withMessage('el nombre es obligatorio'),
            body('precio').isNumeric().withMessage('debe colocar el precio'),
            body('categoria').isString().withMessage('debe colocar la categoria'),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };
}

module.exports = ProductValidator;