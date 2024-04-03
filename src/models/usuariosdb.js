const Sequelize = require("sequelize");
const sequelize = require("../../db");


sequelize
    .authenticate()
    .then(function() {
        console.log('Conectado');
    })
    .catch(function (erro) {
        console.log('Erro ao conectar: ' + erro);
    });

const Usuarios = sequelize.define('Usuarios', {
    nome: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(256),
        unique: true,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    total_curtidas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
});

module.exports = Usuarios;