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
    
const Perguntas = sequelize.define('Perguntas', {
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

Perguntas.sync()
    .then(() => {
    console.log('Tabela criada.')
})
.catch((erro) => {
    console.log('Erro ao criar tabela: ' + erro);
});
    
module.exports = Perguntas;