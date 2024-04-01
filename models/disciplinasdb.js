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
    
const Disciplinas = sequelize.define('Disciplinas', {
    nome: {
        type: Sequelize.STRING(45),
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
        model: 'Cursos',
        key: 'id'
    }
    }
});

Disciplinas.sync()
    .then(() => {
    console.log('Tabela criada.')
})
.catch((erro) => {
    console.log('Erro ao criar tabela: ' + erro);
});
    
module.exports = Disciplinas;