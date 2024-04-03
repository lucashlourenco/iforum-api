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

const Cursos = sequelize.define('Cursos', {
    nome: {
            type: Sequelize.STRING(45),
            allowNull: false
    }
    });

module.exports = Cursos;
