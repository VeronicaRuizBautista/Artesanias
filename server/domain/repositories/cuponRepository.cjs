// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const cupon = require('../models/cuponModel.cjs');

class CuponRepository {
    async getById(id) {
        try {
            const Cupon = new cupon();
            return await Cupon.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Cupon'}));
        }
    }
    async getByIdCode(code) {
        try {
            const Cupon = new cupon();
            return await Cupon.findByIdCode(code);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Cupon'}));
        }
    }
    async getByFecha(fecha) {
        try {
            const Cupon = new cupon();
            return await Cupon.findByIdProduct(fecha);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Cupon'}));
        }
    }
    async getCupons() {
        try {
            const Cupon = new cupon();
            return await Cupon.find();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Cupon'}));
        }
    }

    async save(CuponData) {
        try {
            const Cupon = new cupon();
            return await Cupon.insert(CuponData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving Cupon'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const Cupon = new cupon();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await Cupon.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating Cupon'}));
        }
    }

    async deleteById(id) {
        try {
            const Cupon = new cupon();
            return await Cupon.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting Cupon'}));
        }
    }

    async searchByName(name) {
        try {
            const Cupon = new cupon();
            return await Cupon.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for Cupons');
        }
    }
    async searchByProductCupon() {
        try {
            const Cupon = new cupon();
            return await Cupon.findProducCupon();
        } catch (error) {
            throw new Error('Error searching for Cupons');
        }
    }
}

module.exports = CuponRepository;