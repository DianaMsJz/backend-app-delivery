const { getAll } = require('../models/user');
const User = require('../models/user');

module.exports = { //se exporta todo el objeto
    async getAll(req, res, next) {
        try{
            const data = await User.getAll(); //en data se retornan todos los usuarios de la tabla
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);

        }
        catch (error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                succes: false,
                message: 'Error al obtener los usuarios'
            }); // 501 el método no es soportado por el servidor
            

        }
    }
}