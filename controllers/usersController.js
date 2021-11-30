//Await: espera hasta que se ejecute la consulta para seguir con otra instrucción
const User = require('../models/user'); //Para acceder al modelo user
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

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
    },

    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const myUser = await User.findByEmail(email); //para saber si hay un usuario con ese email

            if (!myUser){//si no existe un usuario con ese email
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }
            if (User.isPasswordMatched(password, myUser.password)){ // si el password insertado coincide con el guardado en la bd
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
                    // expiresIn: (60*60*24) // 1 hora
                });
                const data = {//información que se va a retornar cuando el usuario haga login
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                }

                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'El usuario ha sido autenticado'                    
                });
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                });
            }
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Error al momento de logearse`,
                error: error
            });
        }
    }

};