const UsersController = require('../controllers/usersController');

module.exports = (app) => {
    app.get('/api/users/getAll', UsersController.getAll); //crear nueva ruta, cuando el usuario lance una peticion a esta 
                                                          //ruta ejecute el metodo getAll que devuelve todos los usuarios
    app.post('/api/users/create', UsersController.register);

    //ruta para el login
    app.post('/api/users/login', UsersController.login);
}