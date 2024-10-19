const WorkshopRepository = require("../../domain/repositories/workshopRepository.cjs");

class WorkshopService {
    constructor() {
        this.workshopRepository = new WorkshopRepository(); // Cambiado a camelCase
    }

    async getAllWorkshops() {
        const workshops = await this.workshopRepository.getAllWorkshops();
        
        // Verificar si el resultado es nulo, indefinido o un array vacío
        if (!workshops || workshops.length === 0) {
            throw new Error('Workshop not found');
        }
        
        return workshops;
    }

    async getProductsByWorkshopId(id){
        const products = await this.workshopRepository.getProductsByWorkshopId(id);
        return products;
    }

    async getWorkshopById(id){
        console.log(id)
        const workshop = await this.workshopRepository.getWorkshopById(id);
        return workshop;
    }
}

module.exports = WorkshopService;
