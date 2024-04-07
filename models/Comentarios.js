const Sequelize = require('sequelize');
const database = require('../db');
const Usuarios = require('../models/Usuarios');
const Respostas = require('../models/Respostas');

const Comentarios = database.define('Comentarios', {
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    resposta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Respostas',
            key: 'id'
        }
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { 
            model: 'Usuarios', 
            key: 'id'
        }
    }
});

Comentarios.belongsTo(Respostas, {foreignKey: 'resposta_id'});
Comentarios.belongsTo(Usuarios, {foreignKey: 'usuario_id'});

module.exports = Comentarios;