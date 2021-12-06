//crear todas las consultas o sentencias en sql

const db = require('../config/config'); //importa la variable db del archivo config.js
const crypto = require('crypto');


const User = {}; //objeto


// método para obtener los usuarios de la tabla users
User.getAll = () => {
    const sql = `
    SELECT 
        * 
    FROM 
        users
    `;

    return db.manyOrNone(sql) //retorna muchos o ningún usuario (en caso de que la tabla esté vacía)
}

//método para obtener un usuario por ID

User.findById = (id, callback) => {

    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password,
        session_token
    FROM
        users
    WHERE
        id = $1`;

    return db.oneOrNone(sql, id).then(user => { callback(null, user); })
}

//metodo para buscar un usuario segun su email
User.findByEmail = (email) => {
    const sql = `
   
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token,
		json_agg(
			json_build_object(
			'id', R.id,
			'name', R.name,
			'image', R.image,
			'route', R.route
			)	
		) AS roles
    FROM
        users AS U
	INNER JOIN
		user_has_roles AS UHR
	ON 
		UHR.id_user = U.id
	INNER JOIN
		roles AS R
	ON
	R.id = UHR.id_rol
    WHERE
        U.email = $1
	GROUP BY
		U.id`;
    return db.oneOrNone(sql, email);
}
//metodo para Crear un nuevo usuario
User.create = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');//encriptar el password con el formato md5
    user.password = myPasswordHashed;

    const sql = `
    INSERT INTO
        users(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
    `;

    return db.oneOrNone(sql, [//que retorne un ID o nada
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ]);
}

User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) { // exactamente igual
        return true;
    }
    return false;
}
module.exports = User;