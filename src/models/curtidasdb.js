const Sequelize = require('sequelize');
const sequelize = require('../../db');
const Respostas = require('./respostasdb');

const Curtidas = sequelize.define('Curtidas', {
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios', // refere-se ao modelo de Usuários
            key: 'id'
        }
    },
    id_resposta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Respostas', // refere-se ao modelo de Respostas
            key: 'id'
        }
    },
    data_curtida: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

Curtidas.belongsTo(Respostas, {foreignKey: 'id_resposta', as: 'resposta'});

module.exports = Curtidas;
