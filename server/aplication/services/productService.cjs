// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const ProductRepository = require('../../domain/repositories/productRepository.cjs');

class ProductService {
    constructor() {
        this.ProductRepository = new ProductRepository();
    }

    async getProductById(id) {
        const product = await this.ProductRepository.getById(id);
        if (!product) {
            throw new Error(JSON.stringify({status: 404, message: 'product not found'}));
        }
        return product;
    }
    async getProductByCategory(category) {
        const product = await this.ProductRepository.getByCategory(category);
        if (!product) {
            throw new Error(JSON.stringify({status: 404, message: 'product not found'}));
        }
        return product;
    }
    async getProducts() {
        const product = await this.ProductRepository.getProducts();
        if (!product) {
            throw new Error(JSON.stringify({status: 404, message: 'product not found'}));
        }
        return product;
    }

    async createProduct(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.ProductRepository.save(data);
    }

    async updateProduct(id, data) {
        const updatedproduct = await this.ProductRepository.updateById(id, data);
        if (!updatedproduct) {
            throw new Error(JSON.stringify({status: 404, message: 'product not found or could not be updated'}));
        }
        return updatedproduct;
    }

    async deleteProduct(id) {
        const deletedproduct = await this.ProductRepository.deleteById(id);
        if (!deletedproduct) {
            throw new Error(JSON.stringify({status: 404, message: 'product not found or could not be deleted'}));
        }        
        return deletedproduct;
    }
    
    async searchProductsByName(name) {
        return await this.ProductRepository.searchByName(name);
    }
}

module.exports = ProductService;