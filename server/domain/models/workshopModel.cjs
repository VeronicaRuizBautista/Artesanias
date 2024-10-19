const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/database.cjs");

class Workshop {
    async findAll() {
        const obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection("taller");

        let lista = []
        
        lista = await collection.find({}).toArray(); 
        //console.log(lista)
        return lista;
    }

    async findWorkshopByID (id) {
        const obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection("taller");
        const res = await collection.find({_id: new ObjectId(id)}).toArray()
        
        return res
    }

    async findByDate(startDate, endDate) {
        const obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection("taller");

        // Realiza la consulta con el rango de fechas
        const res = await collection.find({
            fecha: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).toArray();
        
        return res;
    }

    async displayProductsByWorskshopId(id){
        const obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection("taller");

        const res = await collection.aggregate([
            {
            
              $match: { _id: new ObjectId(id) }
            },
            {
              $lookup: {
                from: "productos",            
                localField: "productos",       
                foreignField: "_id",           
                as: "productosDetalles"        
              }
            },
            {
              
              $project: {
                _id: 0,                        
                nombre_taller: 1,               
                imagen: 1,
                productosDetalles: {
                  _id: 1,
                  img: 1,                   
                  precio: 1,                   
                  nombre: 1,
                  descripcion: 1,                    
                }
              }
            }
          ]).toArray();

          return res
    }
    
}

module.exports = Workshop;
