const Workshop = require("../models/workshopModel.cjs");

class WorkshopRepository {
    async getAllWorkshops() {
        try {
            //console.log("hola")
            const workshop = new Workshop();
            const result = await workshop.findAll();
            return result; // Devuelve el resultado
        } catch (error) {
            throw new Error(`Error retrieving workshops: ${error.message}`); // Incluye el error original
        }

        
    }

    async getProductsByWorkshopId(id){
        try{
            console.log(id)
            const workshop = new Workshop();
            const result = await workshop.displayProductsByWorskshopId(id);
            return result;
        } catch(error){
            throw new Error(`Error retrieving workshops: ${error.message}`);
        }
    }

    async getWorkshopById(id){
        try{
            const workshop = new Workshop();
            //console.log(id)
            const result = await workshop.findWorkshopByID(id);
            //console.log(result);
            return result;
        } catch(error){
            throw new Error(`Error retrieving workshop: ${error.message}`);
        }
    }
}

module.exports = WorkshopRepository;
