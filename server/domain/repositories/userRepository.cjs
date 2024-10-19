const User = require('../models/userModel.cjs')

module.exports = class UserRepository {

    constructor() {
        this.userModel = new User()
    }

    async getUserById(id) {

        try {
            return this.userModel.getById(id)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user fetching'}))
        }

    }

    async getUserByAgregate(aggData) {
        try {
            return this.userModel.userAggregate(aggData)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user agregation'}))
        }
    }

    async insertUser(userData) {

        try {
            return await this.userModel.createUser(userData)
        } catch (err) {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user insertion'}))
        }

    }

    async updateFieldsWithSet(userId, field, values) {

        try {
            return await this.userModel.updateFieldsWithSet(userId, field, values)
        } catch (err) {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user insertion'}))
        }

    }

    async updateUserCustomField(userId, field, values) {

        try {
            return await this.userModel.updateCustomField(userId, field, values)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user insertion'}))
        }

    }

    async removeElements(userId, field, values) {

        try {
            return await this.userModel.removeElements(userId, field, values)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user extraction'}))
        }

    }

    async removeElementsFromCart(userId, productId) {

        try {
            return await this.userModel.removeElementsFromCart(userId, productId)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user extraction'}))
        }

    }

    async getAllFromFIeld(userId, field) {

        try {
            return await this.userModel.getAllFromField(userId, field)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user cart fetching'}))
        }

    }

    async verifyProductIdInUserCart(userId, productId) {

        try {
            return await this.userModel.verifyProductIdInUserCart(userId, productId)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user cart fetching'}))
        }

    }

    async incrementDataFromCart(userId, amount, productId) {

        try {
            return await this.userModel.incrementDataFromCart(userId, amount,productId)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user cart fetching'}))
        }

    }

    async updateArrayPush(userId,field, values) {

        try {
            return await this.userModel.updateArrayPush(userId, field, values)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user updating'}))
        }

    }

    async decrementDataFromCart(userId, productId) {
        try {
            return await this.userModel.decrementDataFromCart(userId, productId)
        } catch {
            throw new Error(JSON.stringify({status: 500, message: 'Error during the user updating'}))
        }
    }

}