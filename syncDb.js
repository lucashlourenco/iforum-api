const Cursos = require('./src/models/cursosdb');
const Usuarios = require('./src/models/usuariosdb');
const Disciplinas = require('./src/models/disciplinasdb');
const Perguntas = require('./src/models/perguntasdb');
const Respostas = require('./src/models/respostasdb');
const Comentarios = require('./src/models/comentariosdb');
const Curtidas = require('./src/models/curtidasdb');
const sequelize = require("./db");
const populateDatabase = require('./src/helpers/populateDb');

Usuarios.hasMany(Perguntas, {foreignKey: 'usuario_id'});
Perguntas.belongsTo(Usuarios, {foreignKey: 'usuario_id'});

Usuarios.hasMany(Respostas, {foreignKey: 'id_usuario'});
Respostas.belongsTo(Usuarios, {foreignKey: 'id_usuario'});

Perguntas.hasMany(Respostas, {foreignKey: 'pergunta_id'});
Respostas.belongsTo(Perguntas, {foreignKey: 'pergunta_id'});

Respostas.hasMany(Comentarios, {foreignKey: 'id_resposta'});
Comentarios.belongsTo(Respostas, {foreignKey: 'id_resposta'});

Usuarios.hasMany(Comentarios, {foreignKey: 'id_usuario'});
Comentarios.belongsTo(Usuarios, {foreignKey: 'id_usuario'});

Disciplinas.hasMany(Perguntas, {foreignKey: 'disciplina_id'});
Perguntas.belongsTo(Disciplinas, {foreignKey: 'disciplina_id'});

Cursos.hasMany(Disciplinas, {foreignKey: 'curso_id'});
Disciplinas.belongsTo(Cursos, {foreignKey: 'curso_id'});

async function checkIfTableExists(tableName) {
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();
    return tables.includes(tableName);
}

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const usuariosTableExists = await checkIfTableExists('Usuarios');
        const cursosTableExists = await checkIfTableExists('Cursos');
        const disciplinasTableExists = await checkIfTableExists('Disciplinas');
        const perguntasTableExists = await checkIfTableExists('Perguntas');
        const respostasTableExists = await checkIfTableExists('Respostas');
        const comentariosTableExists = await checkIfTableExists('Comentarios');
        const curtidasTableExists = await checkIfTableExists('Curtidas');

        if (!usuariosTableExists || !curtidasTableExists || !cursosTableExists || !disciplinasTableExists || !perguntasTableExists || !respostasTableExists || !comentariosTableExists) {
            await sequelize.sync({alter: true});
            console.log('Tabelas criadas ou atualizadas com sucesso');
            console.log("\n\n Iniciando script de população\n\n")
            populateDatabase()
        } else {
            console.log('Tabelas já existem, sincronização não necessária');
        }
    } catch (error) {
        console.error('Erro na criação das tabelas', error);
    }
}

module.exports = syncDatabase;
