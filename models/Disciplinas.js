const Sequelize = require('sequelize');
const database = require('../db');
const Cursos = require('./Cursos.js');

const Disciplinas = database.define('Disciplinas', {
    nome: {
        type: Sequelize.STRING,
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
            model: Cursos, 
            key: 'id'
        }
    }
});

Disciplinas.belongsTo(Cursos, { foreignKey: 'curso_id' });

module.exports = Disciplinas;
