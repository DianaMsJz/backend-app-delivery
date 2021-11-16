//CORS es un paquete node.js para proporcionar un middleware (agente intermedio) Connect / Express que se puede usar 
//para habilitar CORS con varias opciones.
//Morgan: para debuggear los posibles errores que aparezcan después de crear la API


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

// Aqui se hará la instancia de las rutas

const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev')); //para debuggear errores
app.use(express.json()); //Para parsear las respuestas recibidas en .json
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.set('port', port);

//Llamando a las rutas

users(app);


app.disable('x-powered-by'); //seguridad

server.listen(3000, '192.168.56.1' || 'localhost', function() {
    console.log('Aplicación con NodeJS ' + port + ' Iniciada...')
});


//MANEJO DE ERRORES
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}