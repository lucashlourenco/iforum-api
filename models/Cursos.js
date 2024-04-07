const Sequelize = require('sequelize')
const database = require('../db');

const Cursos = database.define('Cursos', {
    nome: {
            type: Sequelize.STRING,
            allowNull: false
    }
});

module.exports = Cursos