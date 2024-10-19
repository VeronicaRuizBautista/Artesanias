// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const CuponRepository = require('../../domain/repositories/cuponRepository.cjs');

class CuponService {
    constructor() {
        this.CuponRepository = new CuponRepository();
    }

    async getCuponById(id) {
        const cupon = await this.CuponRepository.getById(id);
        if (!cupon) {
            throw new Error(JSON.stringify({status: 404, message: 'cupon not found'}));
        }
        return cupon;
    }
    async getCuponByIdCode(code) {
        const cupon = await this.CuponRepository.getByIdCode(code);
        if (!cupon) {
            throw new Error(JSON.stringify({status: 404, message: 'cupon not found'}));
        }
        return cupon;
    }
    async getCuponByFecha(fecha) {
        const cupon = await this.CuponRepository.getByFecha(fecha);
        if (!cupon) {
            throw new Error(JSON.stringify({status: 404, message: 'cupon not found'}));
        }
        return cupon;
    }
    async getCupons() {
        const cupon = await this.CuponRepository.getCupons();
        if (!cupon) {
            throw new Error(JSON.stringify({status: 404, message: 'cupon not found'}));
        }
        return cupon;
    }

    async createCupon(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.CuponRepository.save(data);
    }

    async updateCupon(id, data) {
        const updatedcupon = await this.CuponRepository.updateById(id, data);
        if (!updatedcupon) {
            throw new Error(JSON.stringify({status: 404, message: 'cupon not found or could not be updated'}));
        }
        return updatedcupon;
    }

    async deleteCupon(id) {
        const deletedcupon = await this.CuponRepository.deleteById(id);
        if (!deletedcupon) {
            throw new Error(JSON.stringify({status: 404, message: 'cupon not found or could not be deleted'}));
        }        
        return deletedcupon;
    }
    
    async searchCuponsByName(name) {
        return await this.CuponRepository.searchByName(name);
    }
    async allProductWithCupon() {
        return await this.CuponRepository.searchByProductCupon();
    }
}

module.exports = CuponService;