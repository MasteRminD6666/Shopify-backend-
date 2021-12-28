const jwt = require('jsonwebtoken');
const express = require('express');
const server = express();
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { clients, appointment } = require('../models/User')
require('dotenv').config();
server.use(express.json());
const cors = require('cors');
server.use(cors());

async function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)
    const clientData = {
        username: req.body.username,
        email: req.body.email,
        password: securePassword,
        role: req.body.role
    }

    const newUser = new clients(clientData);

    await newUser.save()
        .then((data) => { res.json(data) })
        .catch((err) => { res.send(err) })
}


async function getUserData(req, res) {

    await clients.findById({ _id: req.user._id }, (err, result) => {
        if (err) {
            console.log('error ', err);
        }

        return res.send(result);



    }).clone()
}
async function getBuyers(req, res) {

    appointment.find({ seller_id: req.user._id, status: "Pending" }, (err, result) => {
        if (err) {
            console.log('that ', err);
        }
        return res.send(result);
    }).populate('buyer').exec((err, res) => {

    })
}
async function login(req, res) {

    const username = req.body.username
    clients.find({ username: username }, (err, result) => {
        if (err) {
            console.log('err ', err);
        }

        if (result.length == 0) {
            res.send('you have to signup')
        }
        else {
            bcrypt.compare(req.body.password, result[0].password).then((valid) => {


                if (valid) {
                    const accessToken = jwt.sign({ _id: result[0]._id, role: result[0].role }, process.env.ACCESS_TOKEN_SECRET)
                    return res.json({ accessToken: accessToken })
                }

                return res.send('invaild login')



            })
        }

    })
}


async function getByRole(req, res) {
    let role = req.user.role

    const data = await clients.where("role").ne(role)
    return res.send(data)
}
module.exports = {
    login,
    register,
    getUserData,
    getByRole,
    getBuyers,

}