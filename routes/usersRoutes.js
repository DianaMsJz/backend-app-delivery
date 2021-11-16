const UsersController = require('../controllers/usersController');

module.exports = (app) => {
    app.get('/api/users/getAll', UsersController.getAll); //crear nueva ruta, cuando el usuario lance una peticion a esta 
                                                         //ruta ejecute el metodo getAll que devuelve todos los usuarios
}