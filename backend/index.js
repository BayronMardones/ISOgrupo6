const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.listen(process.env.PORT, () => console.log('Server started'));

return console.log('HOLA JUIJUI')