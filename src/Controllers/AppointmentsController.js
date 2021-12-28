"use strict";
const express = require('express');
const server = express();
require('dotenv').config();
server.use(express.json());
const cors = require('cors');
server.use(cors());
const { appointment } = require('../models/User')
async function appointments(req, res) {

    let appointmentData = {
        seller_id: req.body[0].seller_id,
        buyer: req.user._id,
        status: 'Pending',
        Appointment_Date: req.body[0].appointmentDate,
        notes: req.body[0].notes

    }
    const newAppointment = new appointment(appointmentData);
    await newAppointment.save()

}
async function updateStatus(req, res) {
    const filter = { _id: req.params.id };
    const update = { status: req.body.status };

    let doc = await appointment.findOneAndUpdate(filter, update, {
        new: true
    }).clone()

    return res.send(doc)
}

module.exports = {
    appointments,
    updateStatus,
}