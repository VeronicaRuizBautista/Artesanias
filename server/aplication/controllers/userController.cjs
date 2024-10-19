const { validationResult } = require('express-validator')
const UserService = require('../services/userService.cjs')
const { ObjectId, Binary } = require('mongodb')
const multer = require('multer');

module.exports = class UserController {

    async registerUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const userService = new UserService()
        delete req.body.password
        let { nick, passwordHash, email, phone, birth_day, sex } = req.body
        let query = [
            {
                $match: {
                    $or: [
                        phone ? { phone: phone } : { email: email },
                    ],
                    provider: 'ruraqmaki'
                }
            }
        ]
        let isUserResgistered = await userService.agregate(query)

        if (isUserResgistered.length) return res.status(409).json({ status: 409, message: 'El usuario ya existe' })

        let data = {
            cedula: 'Not assigned',
            names: 'Not assigned',
            surnames: 'Not assigned',
            email: email ? email : 'Not assigned',
            photo: 'https://unavatar.io/microlink/microlink.io',
            provider: 'ruraqmaki',
            nick: nick,
            phone: phone ? phone : 'Not assigned',
            role: 'Usuario Estandar',
            password: passwordHash,
            birth_day: birth_day ? birth_day : 'Not assigned',
            sex: sex ? sex : 'Not assigned'
        }

        await userService.createUser(data)

        return res.status(201).json({ code: 201, message: 'Usuario creado satisfactoriamente' })

    }

    async editUserData(req, res) {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const userService = new UserService()

        const file = req.file;
        const prevUser = req.user

        try {
            let imageDataUrl = undefined
            
            let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'
            let user = await userService.getUserById(userId)
            console.log(user)
            for (let field of Object.keys(req.body)) {
                if (user[field] == req.body[field]) continue
                userService.updateFieldsWithSet(userId, field, req.body[field])
                req.user[0][field] = req.body[field]
            }
            console.log(req.user, user)
            if (file) {
                if ( !(user['photo'] instanceof Binary) || !file.buffer.equals(user['photo'].buffer)) {
                    imageDataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
                    await userService.updateFieldsWithSet(userId, 'photo', file.buffer)
                    await userService.updateFieldsWithSet(userId, 'mimetyoe', file.mimetype)
                } else imageDataUrl = `data:${user.mimetype};base64,${user['photo'].buffer.toString('base64')}`
                req.user[0]['photo'] = imageDataUrl
            }
            
            res.json({ message: 'Datos modificados', data: req.body, imageDataUrl: imageDataUrl ? imageDataUrl : undefined });
        } catch (err) {
            res.status(500).json({status: 500, message: 'Error inesperado en la edicion de los datos de usuario'})
        }

    }

    async createFieldOfArraysAndPushObjectIdItems(req, res, fieldName) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const userService = new UserService()

        let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'

        let query = await userService.updateFieldFromUser(userId, fieldName, [{id: ObjectId.createFromHexString(req.params.id), cantidad: 1}])
        
        if (query.modifiedCount) return res.status(200).json({ status: 200, message: 'Producto agregado con exito al carrito' })
        else if (query.modifiedCount == 0) return res.status(304).json({ status: 304, message: `Usuario encontrado, pero el id que desea registrar ya existe dentro del campo carrito` })
        else if (query.matchedCount == 0) return res.status(404).json({ status: 404, message: 'No se encontro el documento del usuario' })
        else return res.status(500).json({ status: 500, message: query })

    }

    async createFieldOfArraysAndPushCouponsItems(req, res, fieldName) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const userService = new UserService()

        let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'

        let query = await userService.updateFieldFromUser(userId, fieldName, [ObjectId.createFromHexString(req.params.id)])
        
        if (query.modifiedCount) return res.status(200).json({ status: 200, message: 'Producto agregado con exito al carrito' })
        else if (query.modifiedCount == 0) return res.status(304).json({ status: 304, message: `Usuario encontrado, pero el id que desea registrar ya existe dentro del campo carrito` })
        else if (query.matchedCount == 0) return res.status(404).json({ status: 404, message: 'No se encontro el documento del usuario' })
        else return res.status(500).json({ status: 500, message: query })

    }

    async createPurchasesOfArraysAndPushObjectIdItems(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const userService = new UserService()

        let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'
        const productoIds = req.body.productos.map((productoInfo) => ObjectId.createFromHexString(productoInfo));
        console.log(productoIds)
        let query = await userService.updateArrayPush(userId, 'compras', [{productos: productoIds, cantidad: req.body.cantidad, total: req.body.total}])
        
        if (query.modifiedCount) return res.status(200).json({ status: 200, message: 'Producto agregado con exito al carrito' })
        else if (query.modifiedCount == 0) return res.status(304).json({ status: 304, message: `Usuario encontrado, pero el id que desea registrar ya existe dentro del campo carrito` })
        else if (query.matchedCount == 0) return res.status(404).json({ status: 404, message: 'No se encontro el documento del usuario' })
        else return res.status(500).json({ status: 500, message: query })

    }

    async createCartOfArraysAndPushObjectIdItems(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const userService = new UserService()

        let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'

        
        let verifyExistence = await userService.verifyProductIdInUserCart(userId, ObjectId.createFromHexString(req.params.id) )
        let response = verifyExistence == null ? verifyExistence : await userService.incrementDataFromCart(userId, 1, ObjectId.createFromHexString(req.params.id))

        if (response == null) console.log('No se realiza incremento, el producto ya existia')
        else if (response.modifiedCount == 1) return res.status(200).json({ status: 200, message: 'Producto del carrito incrementado' })
        else console.log(response)

        let query = await userService.updateFieldFromUser(userId, 'carrito', [{id: ObjectId.createFromHexString(req.params.id), cantidad: 1}])
        
        if (query.modifiedCount) return res.status(200).json({ status: 200, message: 'Producto agregado con exito al carrito' })
        else if (query.modifiedCount == 0) return res.status(304).json({ status: 304, message: `Usuario encontrado, pero el id que desea registrar ya existe dentro del campo carrito` })
        else if (query.matchedCount == 0) return res.status(404).json({ status: 404, message: 'No se encontro el documento del usuario' })
        else return res.status(500).json({ status: 500, message: query })

    }

    

    async removeProductsFromFieldsList(req, res, field) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const userService = new UserService()

        let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'

        let query = await userService.removeMultipleElementsFromField(userId, field, [ObjectId.createFromHexString(req.params.id)])

        if (query.modifiedCount) return res.status(200).json({ status: 200, message: 'Documento eliminado con exito' })
        else if (query.modifiedCount == 0) return res.status(304).json({ status: 304, message: `Usuario encontrado, pero el id que desea eliminar no existe dentro del campo ${field}` })
        else if (query.matchedCount == 0) return res.status(404).json({ status: 404, message: 'No se encontro el documento del usuario' })
        else return res.status(500).json({ status: 500, message: query })

    }

    async removeProductsFromCartsList(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const userService = new UserService()

        let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'

        let query = await userService.removeElementsFromCart(userId, req.params.id)
        console.log(query)

        if (query.modifiedCount) return res.status(200).json({ status: 200, message: 'Producto eliminado del carrito con exito' })
        else if (query.modifiedCount == 0) return res.status(304).json({ status: 304, message: `Usuario encontrado, pero el id que desea eliminar no existe dentro del campo carrito` })
        else if (query.matchedCount == 0) return res.status(404).json({ status: 404, message: 'No se encontro el documento del usuario' })
        else return res.status(500).json({ status: 500, message: query })

    }

    async decrementCartProduct(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const userService = new UserService()

        let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'

        
        let verifyExistence = await userService.verifyProductIdInUserCart(userId, ObjectId.createFromHexString(req.params.id) )
        let response = verifyExistence == null ? verifyExistence : await userService.decrementDataFromCart(userId, ObjectId.createFromHexString(req.params.id))
        console.log(response)
        if (response == null || response.matchedCount == 0) return res.status(404).json({ status: 404, message: 'No se encontro el documento del usuario' })
        else if (response.modifiedCount == 1) return res.status(200).json({ status: 200, message: 'Producto del carrito decrementado' })
        else return res.status(500).json({ status: 500, message: query })

    }

    async getAllItemsFromAField(req, res, field) {

        try {
            const userService = new UserService()
            // 66fcd36332175b17183a6acb
            let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'

            let data = await userService.getAllFromFIeld(userId, field)
            if (!data) return res.status(404).json({ status: 400, message: 'Usuario no econtrado' })
            if (!Object.keys(data).length) return res.status(404).json({ status: 404, message: `El usuario no presenta contenido en ${field}` })

            return res.status(200).json({ status: 200, data: data })
        } catch (err) {
            return res.status(500).json({ status: 500, message: err })
        }

    }

    async checkForAnIdOnFavoriteUserList(req, res) {

        const userService = new UserService()
        console.log(req.user)
        let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'
        let favoriteList = await userService.getAllFromFIeld(userId, 'favoritos')
        if (!Object.keys(favoriteList).length) return res.status(404).json({ status: 404, message: 'El usuario no presenta favoritos en su lista' })
        let aux = ObjectId.createFromHexString(req.params.id)
        let existsParamId = favoriteList.favoritos.some((prdt) => prdt.equals(aux) )
        if (existsParamId) return res.status(200).json({ status: 200, exists: true })
        else if (!existsParamId) return res.status(404).json({ status: 200, exists: false })

    }

    async getAllProductDetailseFromField(req, res, coleccion, campoLocal) {
        try {
            
            const userService = new UserService()
            
            // 66fcd36332175b17183a6acb
            let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'
            let userExists = await userService.getUserById(userId)
            if (!userExists) return res.status(404).json({ status: 400, message: 'Usuario no econtrado' })
            let aux = `${campoLocal}.0`

            let agg = [
                {
                    $match: {
                        _id: ObjectId.createFromHexString(`${userId}`)
                    }
                },
                {
                    $lookup: {
                        from: coleccion,
                        localField: campoLocal,
                        foreignField: "_id",
                        as: campoLocal
                    }
                },
                {
                    $project: {
                        [campoLocal]: 1
                    }
                },
                {
                    $match: {
                        [aux]: { $exists: true }
                    }
                }
            ]
            let aggDetails = await userService.agregate(agg)
            
            if (!aggDetails.length) return res.status(404).json({ status: 404, message: `El usuario no presenta contenido en ${campoLocal}` })

            return res.status(200).json({ status: 200, data: aggDetails })

        } catch (err) {
            return res.status(500).json({ status: 500, message: err })
        }

    }
    async getAllProductDetailseFromFieldWithWorkshops(req, res) {
        try {
            
            const userService = new UserService()
            
            // 66fcd36332175b17183a6acb
            let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'
            let userExists = await userService.getUserById(userId)
            if (!userExists) return res.status(404).json({ status: 400, message: 'Usuario no econtrado' })

            let agg = [
                {
                  $match: {
                    _id: ObjectId.createFromHexString(`${userId}`)
                  }
                },
                {
                  $unwind: "$compras"  // Descomponer el array de compras para tener una compra por documento
                },
                {
                  $unwind: "$compras.productos"  // Descomponer el array de productos dentro de cada compra
                },
                {
                  $lookup: {
                    from: "productos",  // Unir con la colección de productos
                    localField: "compras.productos",  // ID del producto en compras.productos
                    foreignField: "_id",  // ID del producto en la colección de productos
                    as: "productoDetalles"
                  }
                },
                {
                  $unwind: "$productoDetalles"  // Descomponer para tener solo un producto detallado
                },
                {
                  $lookup: {
                    from: "taller",  // Unir con la colección de talleres
                    localField: "productoDetalles._id",  // ID del producto detallado
                    foreignField: "productos",  // Campo productos del taller
                    as: "tallerDetalles"
                  }
                },
                {
                  $unwind: "$tallerDetalles"  // Descomponer el array de talleres para obtener los detalles
                },
                {
                  $group: {
                    _id: {
                      usuario: "$_id",  // ID del usuario
                      compraId: "$compras._id",  // Agrupar por ID de compra
                      productoId: "$productoDetalles._id"  // Agrupar por ID de producto
                    },
                    producto: { $first: "$productoDetalles" },  // Guardar el primer documento del producto
                    cantidad: { $first: "$compras.cantidad" },  // Guardar la cantidad de la compra
                    nombre_taller: { $first: "$tallerDetalles.nombre_taller" },  // Guardar el nombre del taller
                    id_taller : { $first: "$tallerDetalles._id" },
                  }
                },
                {
                  $project: {
                    _id: 0,  // No mostrar el ID compuesto del agrupamiento
                    usuarioId: "$_id.usuario",  // Mostrar el ID del usuario
                    compraId: "$_id.compraId",  // Mostrar el ID de la compra
                    producto: 1,  // Mostrar el detalle del producto
                    cantidad: 1,  // Mostrar la cantidad
                    nombre_taller: 1, // Mostrar el nombre del taller
                    id_taller: 1
                  }
                }
              ]

            let aggDetails = await userService.agregate(agg)
            
            if (!aggDetails.length) return res.status(404).json({ status: 404, message: `El usuario no presenta contenido en compras` })

            return res.status(200).json({ status: 200, data: aggDetails })

        } catch (err) {
            return res.status(500).json({ status: 500, message: err })
        }

    }

    async getAllProductDetailsShopeFromFieldWithWorkshops(req, res) {
        try {
            
            const userService = new UserService()
            
            // 66fcd36332175b17183a6acb
            let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'
            let userExists = await userService.getUserById(userId)
            if (!userExists) return res.status(404).json({ status: 400, message: 'Usuario no econtrado' })

            let agg = [
                {
                    "$match": {
                        "_id": ObjectId.createFromHexString(`${userId}`)
                    }
                },
                  {
                    "$unwind": "$carrito"
                },
                {
                    "$lookup": {
                        "from": "productos",
                        "localField": "carrito.id",
                        "foreignField": "_id",
                        "as": "productoInfo"
                    }
                },
                {
                    "$unwind": "$productoInfo"
                },
                {
                    "$lookup": {
                        "from": "taller",
                        "localField": "productoInfo._id",
                        "foreignField": "productos",
                        "as": "tallerDetalles"
                    }
                },
                {
                    "$unwind": {
                        "path": "$tallerDetalles",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                {
                    "$project": {
                        "_id": 0,
                        "usuario_id": "$_id",                   // Incluye el ID del usuario como `usuario_id`
                        "carrito.cantidad": "$carrito.cantidad", // Mantén la cantidad original del carrito
                        "productoInfo": 1,                       // Incluye la información del producto
                        "tallerDetalles.nombre_taller": 1        // Incluye solo el nombre del taller
                    }
                },
                {
                    "$group": {
                        "_id": "$usuario_id",                    // Agrupa por el ID del usuario
                        "productos": {
                            "$push": {                           // Agrega los productos como un array de objetos
                                "cantidad": "$carrito.cantidad",
                                "productoInfo": "$productoInfo",
                                "nombre_taller": "$tallerDetalles.nombre_taller"
                            }
                        }
                    }
                },
                {
                    "$project": {
                        "_id": 1,
                        "productos": 1                          // Mantiene el array `productos` con todos los detalles
                    }
                }
            ]

            let aggDetails = await userService.agregate(agg)
            
            if (!aggDetails.length) return res.status(404).json({ status: 404, message: `El usuario no presenta contenido en compras` })

            return res.status(200).json({ status: 200, data: aggDetails })

        } catch (err) {
            return res.status(500).json({ status: 500, message: err })
        }

    }
    async getAllCuponDetailseFromFieldWithWorkshop(req, res) {
        try {
            
            const userService = new UserService()
            
            // 66fcd36332175b17183a6acb
            let userId = req.user ? req.user[0]._id : '66fce2a0da531255789f1fff'
            let userExists = await userService.getUserById(userId)
            if (!userExists) return res.status(404).json({ status: 400, message: 'Usuario no econtrado' })

            let agg = [
                {
                    $match: {
                        _id: ObjectId.createFromHexString(`${userId}`)
                    }
                },
                {
                    $lookup: {
                        from: "cupon",
                        localField: "cupones",
                        foreignField: "_id",
                        as: "cupones"
                    }
                },
                {
                    $unwind: "$cupones"
                },
                {
                    $lookup: {
                        from: "productos",
                        localField: "cupones.idProductos",
                        foreignField: "_id",
                        as: "productos"
                    }
                },
                {
                    $unwind: "$productos"
                },
                {
                    $lookup: {
                        from: "taller",
                        localField: "productos._id",
                        foreignField: "productos",
                        as: "tallerDetalles"
                    }
                },
                {
                    $unwind: "$tallerDetalles"
                },
                {
                    $group: {
                        _id: "$cupones._id", // Agrupar por ID del cupón
                        cupones: { $first: "$cupones" }, // Conservar el primer documento del cupón
                        nombre_taller: { $first: "$tallerDetalles.nombre_taller" }, // Conservar el nombre del taller
                        img: { $first: "$productos.img" }, // Conservar la imagen del producto
                        id: { $first: "$productos._id" } 
                    }
                },
                {
                    $project: {
                        cupones: 1,
                        nombre_taller: 1,
                        img: 1,
                        id:1
                    }
                }
            ]
            

            let aggDetails = await userService.agregate(agg)
            console.log(aggDetails)
            if (!aggDetails.length) return res.status(404).json({ status: 404, message: `El usuario no presenta contenido en compras` })

            return res.status(200).json({ status: 200, data: aggDetails })

        } catch (err) {
            return res.status(500).json({ status: 500, message: err })
        }

    }

}