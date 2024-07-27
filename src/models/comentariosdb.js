const Sequelize = require("sequelize");
const sequelize = require("../../db")
const Respostas = require("../models/respostasdb");
sequelize
    .authenticate()
    .then(function() {
        console.log('Conectado');
    })
    .catch(function (erro) {
        console.log('Erro ao conectar: ' + erro);
    });
    
const Comentarios = sequelize.define('Comentarios', {
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
    id_resposta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Respostas,
            key: 'id'
        }
    }
});

Comentarios.belongsTo(Respostas, {foreignKey: 'id_resposta'});
Respostas.hasMany(Comentarios, { foreignKey: 'id_resposta' });

module.exports = Comentarios;