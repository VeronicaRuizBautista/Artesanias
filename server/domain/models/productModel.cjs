const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/database.cjs");
// Define el modelo de usuario y la lógica de negocio independiente de la tecnología de persistencia.
class Product{
    async findById (id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray();
        return res;
    }
    async findByCategory (categoria) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        const [res] = await collection.find({categoria: categoria}).toArray();
        return res;
    }
    async find () {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        let lista = []
        lista = await collection.aggregate([
            {
              $lookup: {
                from: "taller",                   // Colección a unir
                localField: "_id",                // Campo en 'productos'
                foreignField: "productos",      // Campo en 'taller'
                as: "tallerDetalles"              // Nombre del array resultante
              }
            },
            {
              $unwind: "$tallerDetalles"          // Descomponer el array para obtener un taller por producto
            },
            {
              $project: {
                _id: 1,                            // Mostrar el _id del producto
                nombre: 1,                         // Mostrar el nombre del producto
                descripcion: 1,                    // Mostrar la descripción
                categoria: 1,                      // Mostrar la categoría
                precio: 1,                         // Mostrar el precio
                cantidad: 1,                       // Mostrar la cantidad
                dimensiones: 1,                    // Mostrar las dimensiones
                img: 1,                            // Mostrar la imagen
                nombre_taller: "$tallerDetalles.nombre_taller" // Mostrar el nombre del taller
              }
            }
          ]).toArray();
        return lista;
    }
    async insert(productData){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/ProductRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        const res = await collection.insertMany([productData]);
        return res;
    }
    async findByIdAndUpdate(id, updateData, upsert){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/ProductRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }
    async findByIdAndDelete(id){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('productos');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }
    
}

module.exports = Product;