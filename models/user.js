//crear todas las consultas o sentencias en sql

const db = require('../config/config'); //trae la variable db

const User = {};

User.getAll = () => {
    const sql = `
    SELECT 
        * 
    FROM 
        users
    `;

    return db.manyOrNone(sql) //retorna muchos o ningun valor
}

module.exports = User;