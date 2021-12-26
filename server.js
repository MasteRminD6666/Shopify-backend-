
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


const server = express();
server.use(express.json());
server.use(cors());

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`listening on ${PORT}`));