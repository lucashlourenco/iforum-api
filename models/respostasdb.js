const Sequelize = require("sequelize");
const sequelize = new Sequelize('iforum', 'root', 'Ads131822%', {
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
    
const Respostas = sequelize.define('Respostas', {
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

Respostas.sync()
    .then(() => {
    console.log('Tabela criada.')
})
.catch((erro) => {
    console.log('Erro ao criar tabela: ' + erro);
});
    
module.exports = Respostas;