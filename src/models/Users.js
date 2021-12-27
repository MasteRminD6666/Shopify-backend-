const express = require('express');
const server = express();
require('dotenv').config();
server.use(express.json());
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
server.use(cors());
const bcrypt = require('bcrypt');


let clients; 
main().catch(err => console.log(err));

async function main() {
   mongoose.connect(process.env.MONGO_URL,()=>console.log('Database connected'));
  const clientsSchema = new mongoose.Schema({
    email:{
        type :String,
        required:true
    },
    username:{
        type :String,
        required:true
    },
    password:{
        type :String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    role:Number,

});
const appointmentSchema = new mongoose.Schema({
    email:String,
    username: String,
    role:Number,

});
clients = mongoose.model('Clients', clientsSchema);
// saving()
}
// used to add Clients 
async function saving() {
    const firstClients = new clients({
        email:'rami-zaitoun@hotmail.com',
        username:'MasteRmind',
        password:'JackJackLikeTheBlack',
        role:1,
       });
    await firstClients.save();
 
 }

 async function addUserHandler(req,res) { 
     const saltPassword = await bcrypt.genSalt(10)
     const securePassword = await bcrypt.hash(req.body.password , saltPassword)
     const clientData= {
        username: req.body.username ,
        email:req.body.email,
        password:securePassword,
        role:req.body.role
    }
        const newUser = new clients(clientData);
        await newUser.save()
        .then((data) => { res.json(data)})
         .catch((err) => {res.send(err)})
 }

 function Handler(req,res)
 {  
     console.log('we reached');
     const userEmail = req.query.email;
    
     clients.find({email:userEmail},(err,result) => {
       if (err) {
           console.log(err);
       }
       else{
           res.send(result);
       }
     })
 }
 function loginUserHandler(req,res) { 
     console.log('rreached login');
     const username = req.body.username
        clients.find({username:username},(err,result) => {
        if (err) {
            console.log('that ',err);
        }
        else{
           try {
            bcrypt.compare(req.body.password , result[0].password)
           } catch (error) {
               res.status(500).send()
           }
           const accessToken = jwt.sign(result[0].password,process.env.ACCESS_TOKEN_SECRET)
           res.json({accessToken:accessToken})
        }

      })
  }


  async function authenticateBasic(username, password) {
    const user = await find({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };
module.exports = {
    booksHandler,
    addUserHandler,
    loginUserHandler,
}