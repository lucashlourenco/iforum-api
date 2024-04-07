const Sequelize = require('sequelize');
const database = require('../db');

const Usuarios = database.define('Usuarios', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total_curtidas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
});

module.exports = Usuarios;