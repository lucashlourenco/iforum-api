const Sequelize = require("sequelize");
const sequelize = require("../../db");


sequelize
    .authenticate()
    .then(function () {
        console.log('Conectado');
    })
    .catch(function (erro) {
        console.log('Erro ao conectar: ' + erro);
    });

const Respostas = sequelize.define('Respostas', {
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
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

Respostas.associate = (models) => {
    Respostas.belongsTo(models.Usuarios, {foreignKey: 'id_usuario'});
    Respostas.belongsTo(models.Perguntas, {foreignKey: 'pergunta_id'});
    Respostas.hasMany(models.Comentarios, {foreignKey: 'id_resposta'});
    Respostas.hasMany(require('./curtidasdb'), {foreignKey: 'id_resposta', as: 'curtidas'});

};

module.exports = Respostas;