'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/routes')
const server = express();
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
server.use(cors(corsOptions))
server.use(express.json());
server.use(routes);
server.use(express.json());
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`listening on 🥰 ${PORT}`));

module.exports = server 
    