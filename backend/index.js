const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Importa las rutas
const routes = require('./routes/route');
app.use('/api', routes);

app.listen(process.env.PORT, () => console.log('Server started'));

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB, (err) => {
    if(err){
        return console.log('Error al conectar con la base de datos => ', err)
    }
    return console.log('conectado a la base de datos')
});




console.log('HOLA JUIJUI')