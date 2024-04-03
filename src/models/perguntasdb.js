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
    
const Perguntas = sequelize.define('Perguntas', {
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    },
    disciplina_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Disciplinas',
        key: 'id'
        }
    }
});


    
module.exports = Perguntas;