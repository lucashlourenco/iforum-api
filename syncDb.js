const Cursos = require('./src/models/cursosdb');
const Usuarios = require('./src/models/usuariosdb');
const Disciplinas = require('./src/models/disciplinasdb');
const Perguntas = require('./src/models/perguntasdb');
const Respostas = require('./src/models/respostasdb');
const Comentarios = require('./src/models/comentariosdb');

function syncDatabase() {
    return Promise.all([
        Cursos.sync(),
        Usuarios.sync(),
        Disciplinas.sync(),
        Perguntas.sync(),
        Respostas.sync(),
        Comentarios.sync()
    ]).then(() => {
        console.log('Tabelas criadas com sucesso');
    }).catch((error) => {
        console.error('Erro na criação das tabelas', error);
    });
}

module.exports = syncDatabase;