const Sequelize = require("sequelize");
const sequelize = require("../../db");


sequelize
    .authenticate()
    .then(function() {
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
//o sync foi utilizado para sincronizar a adição do titulo ao banco - Thiago
Perguntas.sync({ alter: true }).then(() => {
    console.log('Tabela Perguntas sincronizada');
}).catch((error) => {
    console.error('Erro ao sincronizar tabela Perguntas:', error);
});

    
module.exports = Perguntas;