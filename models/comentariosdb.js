const Sequelize = require("sequelize");
const sequelize = new Sequelize('iforum', 'root', 'senha', {
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
            model: 'Respostas',
            key: 'id'
        }
    }
});

Comentarios.sync()
    .then(() => {
    console.log('Tabela criada.')
})
.catch((erro) => {
    console.log('Erro ao criar tabela: ' + erro);
});
    
module.exports = Comentarios;