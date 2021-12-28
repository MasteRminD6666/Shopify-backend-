
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let clients;
let appointment;
main().catch(err => console.log(err));

async function main() {
    console.log(process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL,).then(() => {
        console.log('Database connected')
    }).catch(err => console.log(err));
    const clientsSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        role: Number,


    });

    const appointmentsSchema = new mongoose.Schema({
        seller_id: {
            type: String,
            required: true,
        },
        buyer: { type: Schema.Types.ObjectId, ref: 'Clients' },
        status: {
            type: String,
            required: true,
        },
        Appointment_Date: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: true
        }


    });
    //Schemas
    clients = mongoose.model('Clients', clientsSchema);
    appointment = mongoose.model('Appointments', appointmentsSchema);
    // saving()
}
// used to add Clients 
async function saving() {
    // const firstClients = new clients({
    //     email:'murad@gmail.com',
    //     username:'MasteRmind',
    //     password:'JackJackLikeTheBlack',
    //     role:1,
    //    });
    // await firstClients.save();
    const firstAppointment = new appointment({
        seller_id: 'anaaaaaaaaaaa@gmail.com',
        buyer_id: 'asd',
        status: 'asd',
        Appointment_Date: "sxzzxcadasd",
    });
    await firstAppointment.save();

}


module.exports = {
    clients,
    appointment
}