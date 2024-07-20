const Cursos = require('./src/models/cursosdb');
const Usuarios = require('./src/models/usuariosdb');
const Disciplinas = require('./src/models/disciplinasdb');
const Perguntas = require('./src/models/perguntasdb');
const Respostas = require('./src/models/respostasdb');
const Comentarios = require('./src/models/comentariosdb');

const sequelize = require("./db")

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await Usuarios.sync();
        await Cursos.sync();
        await Disciplinas.sync();
        await Perguntas.sync();
        await Respostas.sync();
        await Comentarios.sync();

        console.log('Tabelas criadas com sucesso');
    } catch (error) {
        console.error('Erro na criação das tabelas', error);
    }
}


module.exports = syncDatabase;