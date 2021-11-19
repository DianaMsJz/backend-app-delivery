//crear todas las consultas o sentencias en sql

const db = require('../config/config'); //importa la variable db del archivo config.js

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

//metodo para Crear un nuevo usuario
User.create = (user) => {
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

module.exports = User;