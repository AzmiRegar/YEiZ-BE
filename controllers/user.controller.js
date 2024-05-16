const userModel = require(`../models/index`).user
const { request, response } = require("express")
const { Result } = require("express-validator")
const md5 = require(`md5`)
const Op = require(`sequelize`).Op

//memunculkan semua user
exports.getAllUser = async (request, response) => {

    let users = await userModel.findAll()
    return response.json({
        success: true,
        data: users,
        message: `All users have been loaded`
    })
}

//mencari user
exports.findUser = async (request, response) => {
    let keyword = request.params.key
    let users = await userModel.findAll({
        where: {
            [Op.or]: [
                { userID: { [Op.substring]: keyword } },
                { firstname: { [Op.substring]: keyword } },
                { lastname: { [Op.substring]: keyword } },
                { email: { [Op.substring]: keyword } },
                { number: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } },
                { role: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: users,
        message: `Users have been loaded`
    })
}

//menambah user
exports.addUser = (request, response) => {
    let newUser = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        number: request.body.number,
        address: request.body.address,
        password: md5(request.body.password),
        role: request.body.role
    }

    userModel.create(newUser)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `New user has been inserted`
            })
        })
        .catch(eror => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

//Register
exports.register = (request, response) => {
    // Check if the email alaready exists
    userModel.findOne({ where: { email: request.body.email } })
        .then(existingUser => {
            if (existingUser) {
                return response.status(400).json({
                    success: false,
                    message: 'Email is already registered'
                });
            } else {
                // If email is not registered, proceed with registration
                let newUser = {
                    firstname: request.body.firstname,
                    lastname: request.body.lastname,
                    email: request.body.email,
                    password: md5(request.body.password),
                    role: "user"
                };

                userModel.create(newUser)
                    .then(result => {
                        return response.json({
                            success: true,
                            data: result,
                            message: `Registration has been inserted`
                        });
                    })
                    .catch(error => {
                        return response.status(500).json({
                            success: false,
                            message: error.message
                        });
                    });
            }
        })
        .catch(error => {
            return response.status(500).json({
                success: false,
                message: error.message
            });
        });

};

//edit user
exports.updateUser = (request, response) => {
    let dataUser = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        number: request.body.number,
        address: request.body.address,
        password: md5(request.body.password),
        role: request.body.role
    }
    if (request.body.password) {
        dataUser.password = md5(request.body.password)
    }
    let userID = request.params.id

    userModel.update(dataUser, { where: { userID: userID } })
        .then(result => {
            return response.json({
                success: true,
                data: dataUser,
                message: `Data user has been updated`
            })
        })
        .catch(eror => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

// Reset Password
exports.resetPass = (request, response) => {
    let dataUser = {
        password: md5("12345678")
    }
    let userID = request.params.id

    userModel.update(dataUser, { where: { userID: userID } })
        .then(result => {
            return response.json({
                success: true,
                message: `Password has been reset : 12345678`
            })
        })
        .catch(eror => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

// hapus user
exports.deleteUser = (request, response) => {
    let userID = request.params.id

    userModel.destroy({ where: { userID: userID } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data user has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: message.error
            })
        })
}