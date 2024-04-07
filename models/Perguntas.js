const Sequelize = require('sequelize');
const database = require('../db');
const Disciplinas = require('./Disciplinas');
const Usuarios = require('./Usuarios');

const Perguntas = database.define('Perguntas', {
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

Perguntas.belongsTo(Usuarios, {foreignKey: 'usuario_id'});
Perguntas.belongsTo(Disciplinas, {foreignKey: 'disciplina_id'});

module.exports = Perguntas