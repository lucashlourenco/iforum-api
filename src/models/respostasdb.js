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
    
const Respostas = sequelize.define('Respostas', {
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'Usuarios', 
        key: 'id'
        }
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    curtidas: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    pergunta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Perguntas',
            key: 'id'
        }
    }
});

    
module.exports = Respostas;