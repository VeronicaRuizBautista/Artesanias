// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const cuponService = require('../services/cuponService.cjs');

class CuponController {
    constructor() {
        this.cuponService = new cuponService();
    }

    async getCupon(req, res) {
        try {
            const cupon = await this.cuponService.getCuponById(req.params.id);
            res.status(200).json(cupon);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    async getCuponIdCode(req, res) {
        try {
            const cupon = await this.cuponService.getCuponByIdCode(req.params.code);
            res.status(200).json(cupon);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    async getCuponFecha(req, res) {
        try {
            const cupon = await this.cuponService.getCuponByFecha(req.params.fecha);
            res.status(200).json(cupon);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    async getAllCupon(req, res) {
        try {            
            const cupon = await this.cuponService.getCupons();
            res.status(200).json(cupon);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateCupon(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const cupon = await this.cuponService.updateCupon(req.params.id, req.body);
            res.status(200).json(cupon);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteCupon(req, res) {
        try {
            const errors = validationResult(req.params.id);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const cupon = await this.cuponService.deleteCupon(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            //res.status(204).json(Cupon);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            res.status(200).json(cupon);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchCupons(req, res) {
        try {
            const cupons = await this.cuponService.searchCuponsByName(req.query.nombre);
            res.json(cupons);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async productWithCupon(req, res) {
        try {
            const cupons = await this.cuponService.allProductWithCupon();
            res.json(cupons);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CuponController;