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

const Usuarios = sequelize.define('Usuarios', {
    nome: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(256),
        unique: true,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    total_curtidas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
});

Usuarios.associate = (models) => {
    Usuarios.hasMany(models.Perguntas, {foreignKey: 'usuario_id'});
    Usuarios.hasMany(models.Respostas, {foreignKey: 'id_usuario'});
    Usuarios.hasMany(models.Comentarios, {foreignKey: 'id_usuario'});

    Usuarios.hasMany(models.Curtidas, {foreignKey: 'id_usuario'});

};
module.exports = Usuarios;