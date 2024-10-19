const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/database.cjs");
// Define el modelo de usuario y la lógica de negocio independiente de la tecnología de persistencia.
class Cupon{
    async findById (id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cupon');
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray();
        return res;
    }
    async findByIdCode (code) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cupon');
        const [res] = await collection.find({codigo: code }).toArray();
        return res;
    }
    async findByFecha (fecha) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cupon');
        const [res] = await collection.find({fechaVencimiento: {$gte: new Date(fecha) }}).toArray();
        return res;
    }
    async find () {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cupon');
        let lista = []
        lista = await collection.find({}).toArray();
        return lista;
    }
    async insert(CuponData){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/CuponRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cupon');
        const res = await collection.insertMany([CuponData]);
        return res;
    }
    async findByIdAndUpdate(id, updateData, upsert){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/CuponRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cupon');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }
    async findByIdAndDelete(id){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cupon');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }

    async findProducCupon(){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cupon');
        const res = await collection.aggregate([
            {
              $lookup: {
                from: "productos",
                localField: "idProductos",
                foreignField: "_id", 
                as: "productoInfo" // El nombre del nuevo campo que contendrá los datos del producto
              }
            },
            {
              $unwind: "$productoInfo" // Descompone el array 'productoInfo' en documentos individuales
            },
            {
              $project: {
                "productoInfo": 1,
                "descuento": 1
              }
            }
          ]).toArray();
          
        return res;
    }
    
}

module.exports = Cupon;