//Await: espera hasta que se ejecute la consulta para seguir con otra instrucción
const User = require('../models/user'); //Para acceder al modelo user

module.exports = { //se exporta todo el objeto
    async getAll(req, res, next) { // método asincrono
        try{
            const data = await User.getAll(); //en data se retornan todos los usuarios de la tabla
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data); //201 que ha tenido exito y se ha creado un nuevo recurso. 
                                               // Se pasan los datos
        }
        catch (error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                succes: false,
                message: 'Error al obtener los usuarios'
            }); // 501 el método no es soportado por el servidor
            
        }
    },

    async register(req, res, next) {
        try {
            const user = req.body;//se capturan los datos de un usuario que envía el cliente
            const data = await User.create(user);

            return res.status(201).json({ // respuesta para el usuario
                success: true,
                message: 'El registro se realizo correctamente',
                data: data.id,// se retorna el id
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error,
            });
        }
    }

};