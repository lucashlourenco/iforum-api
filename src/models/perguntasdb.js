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

const Perguntas = sequelize.define('Perguntas', {
    titulo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
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

Perguntas.associate = (models) => {
    Perguntas.belongsTo(models.Usuarios, {foreignKey: 'usuario_id'});
    Perguntas.belongsTo(models.Disciplinas, {foreignKey: 'disciplina_id'});
    Perguntas.hasMany(models.Respostas, {foreignKey: 'pergunta_id'});
};

module.exports = Perguntas;