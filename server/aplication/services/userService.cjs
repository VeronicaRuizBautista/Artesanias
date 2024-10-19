const UserRepository = require('../../domain/repositories/userRepository.cjs')

module.exports = class UserService {

    constructor () {

        this.UserRepository = new UserRepository()

    }

    async getUserById(id) {
        return await this.UserRepository.getUserById(id)
    }

    async agregate(aggData) {

        return await this.UserRepository.getUserByAgregate(aggData)

    }

    async createUser(userData) {

        return await this.UserRepository.insertUser(userData)

    }

    async updateFieldsWithSet(userId, field, value) {

        return await this.UserRepository.updateFieldsWithSet(userId, field, value)

    }

    async updateFieldFromUser(userId, field, values) {

        return await this.UserRepository.updateUserCustomField(userId, field, values)

    }

    async removeMultipleElementsFromField(userId, field, values) {

        return await this.UserRepository.removeElements(userId, field, values)

    }

    async removeElementsFromCart(userId, productId) {
        return await this.UserRepository.removeElementsFromCart(userId, productId)
    }

    async getAllFromFIeld(userId, field) {

        return await this.UserRepository.getAllFromFIeld(userId, field)

    }

    async verifyProductIdInUserCart(userId, productId) {

        return await this.UserRepository.verifyProductIdInUserCart(userId, productId)

    }

    async incrementDataFromCart(userId, amount, productId) {
        return await this.UserRepository.incrementDataFromCart(userId, amount, productId)
    }

    async updateArrayPush(userId, field, values) {
        return await this.UserRepository.updateArrayPush(userId, field, values)
    }

    async decrementDataFromCart(userId, productId) {
        return await this.UserRepository.decrementDataFromCart(userId, productId)
    }

}