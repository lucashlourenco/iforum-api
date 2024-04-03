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
    
const Disciplinas = sequelize.define('Disciplinas', {
    nome: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
    },
     periodo: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
     curso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Cursos',
        key: 'id'
    }
    }
});


    
module.exports = Disciplinas;