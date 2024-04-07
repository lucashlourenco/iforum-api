const Sequelize = require('sequelize');
const database = require('../db');
const Perguntas = require('./Perguntas.js');
const Usuarios = require('./Usuarios.js');

const Respostas = database.define('Respostas', {
    
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

Respostas.belongsTo(Perguntas, {foreignKey: 'pergunta_id'});
Respostas.belongsTo(Usuarios, {foreignKey: 'usuario_id'});

module.exports = Respostas;