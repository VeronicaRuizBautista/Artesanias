// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const product = require('../models/productModel.cjs');

class ProductRepository {
    async getById(id) {
        try {
            const Product = new product();
            return await Product.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Product'}));
        }
    }
    async getByCategory(category) {
        try {
            const Product = new product();
            return await Product.findByCategory(category);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Product'}));
        }
    }
    async getProducts() {
        try {
            const Product = new product();
            return await Product.find();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Product'}));
        }
    }

    async save(productData) {
        try {
            const Product = new product();
            return await Product.insert(productData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving Product'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const Product = new product();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await Product.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating Product'}));
        }
    }

    async deleteById(id) {
        try {
            const Product = new product();
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting Product'}));
        }
    }

    async searchByName(name) {
        try {
            const Product = new product();
            return await Product.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for Products');
        }
    }
}

module.exports = ProductRepository;