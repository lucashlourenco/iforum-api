const Cursos = require('./src/models/cursosdb');
const Usuarios = require('./src/models/usuariosdb');
const Disciplinas = require('./src/models/disciplinasdb');
const Perguntas = require('./src/models/perguntasdb');
const Respostas = require('./src/models/respostasdb');
const Comentarios = require('./src/models/comentariosdb');

const sequelize = require("./db");
const populateDatabase = require('./src/helpers/populateDb');

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

        if (!usuariosTableExists || !cursosTableExists || !disciplinasTableExists || !perguntasTableExists || !respostasTableExists || !comentariosTableExists) {
            await sequelize.sync({ alter: true });
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
