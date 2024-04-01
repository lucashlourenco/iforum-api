const Sequelize = require("sequelize");
const sequelize = new Sequelize('iforum', 'root', 'Nise1978%', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
});

sequelize
    .authenticate()
    .then(function() {
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

Usuarios.sync()
    .then(() => {
    console.log('Tabela criada.')
})
.catch((erro) => {
    console.log('Erro ao criar tabela: ' + erro);
});

module.exports = Usuarios;