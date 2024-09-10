const Usuarios = require('../models/usuariosdb');
const Cursos = require('../models/cursosdb');
const Disciplinas = require('../models/disciplinasdb');
const Perguntas = require('../models/perguntasdb');
const Respostas = require('../models/respostasdb');
const Comentarios = require('../models/comentariosdb');
const sequelize = require('../../db');

async function checkIfTableExists(tableName) {
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();
    return tables.includes(tableName);
}

async function populateDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const usuariosTableExists = await checkIfTableExists('Usuarios');
        const cursosTableExists = await checkIfTableExists('Cursos');
        const disciplinasTableExists = await checkIfTableExists('Disciplinas');
        const perguntasTableExists = await checkIfTableExists('Perguntas');
        const respostasTableExists = await checkIfTableExists('Respostas');
        const comentariosTableExists = await checkIfTableExists('Comentarios');

        if (usuariosTableExists && cursosTableExists && disciplinasTableExists && perguntasTableExists && respostasTableExists && comentariosTableExists) {
            const usuariosCount = await Usuarios.count();
            if (usuariosCount === 0) {
                const usuario1 = await Usuarios.create({
                    nome: 'John Doe',
                    email: 'john.doe@example.com',
                    senha: 'senha123'
                });
                const usuario2 = await Usuarios.create({
                    nome: 'Jane Doe',
                    email: 'jane.doe@example.com',
                    senha: 'senha123'
                });
                const usuario3 = await Usuarios.create({
                    nome: 'Alice Smith',
                    email: 'alice.smith@example.com',
                    senha: 'senha123'
                });
                const usuario4 = await Usuarios.create({
                    nome: 'Bob Johnson',
                    email: 'bob.johnson@example.com',
                    senha: 'senha123'
                });
                const usuario5 = await Usuarios.create({
                    nome: 'Charlie Brown',
                    email: 'charlie.brown@example.com',
                    senha: 'senha123'
                });
                const usuario6 = await Usuarios.create({
                    nome: 'David Walker',
                    email: 'david.walker@example.com',
                    senha: 'senha123'
                });
                const usuario7 = await Usuarios.create({
                    nome: 'Emily Davis',
                    email: 'emily.davis@example.com',
                    senha: 'senha123'
                });

                const curso1 = await Cursos.create({nome: 'Engenharia de Software'});
                const curso2 = await Cursos.create({nome: 'Ciências da Computação'});
                const curso3 = await Cursos.create({nome: 'Engenharia Mecânica'});

                const disciplina1 = await Disciplinas.create({
                    nome: 'Matemática Básica',
                    periodo: 1,
                    curso_id: curso1.id
                });
                const disciplina2 = await Disciplinas.create({nome: 'Física', periodo: 2, curso_id: curso1.id});
                const disciplina3 = await Disciplinas.create({nome: 'Programação', periodo: 1, curso_id: curso2.id});
                const disciplina4 = await Disciplinas.create({nome: 'Algoritmos', periodo: 2, curso_id: curso2.id});
                const disciplina5 = await Disciplinas.create({nome: 'Dinâmica', periodo: 3, curso_id: curso3.id});
                const disciplina6 = await Disciplinas.create({
                    nome: 'Mecânica dos Fluidos',
                    periodo: 4,
                    curso_id: curso3.id
                });

                const pergunta1 = await Perguntas.create({
                    titulo: 'O que é uma integral?',
                    descricao: 'Gostaria de saber mais sobre integrais em cálculo.',
                    usuario_id: usuario1.id,
                    disciplina_id: disciplina1.id
                });
                const pergunta2 = await Perguntas.create({
                    titulo: 'Como resolver uma equação de segundo grau?',
                    descricao: 'Preciso de ajuda para resolver equações quadráticas.',
                    usuario_id: usuario2.id,
                    disciplina_id: disciplina2.id
                });
                const pergunta3 = await Perguntas.create({
                    titulo: 'O que é o princípio de Le Chatelier?',
                    descricao: 'Alguém pode explicar o princípio de Le Chatelier em química?',
                    usuario_id: usuario3.id,
                    disciplina_id: disciplina3.id
                });
                const pergunta4 = await Perguntas.create({
                    titulo: 'Como funciona a fotossíntese?',
                    descricao: 'Gostaria de uma explicação detalhada sobre a fotossíntese.',
                    usuario_id: usuario4.id,
                    disciplina_id: disciplina4.id
                });
                const pergunta5 = await Perguntas.create({
                    titulo: 'Quais foram as causas da Primeira Guerra Mundial?',
                    descricao: 'Preciso de informações sobre as causas da Primeira Guerra Mundial.',
                    usuario_id: usuario5.id,
                    disciplina_id: disciplina5.id
                });
                const pergunta6 = await Perguntas.create({
                    titulo: 'Como funcionam os algoritmos de busca?',
                    descricao: 'Gostaria de saber mais sobre algoritmos de busca em grafos.',
                    usuario_id: usuario6.id,
                    disciplina_id: disciplina4.id
                });
                const pergunta7 = await Perguntas.create({
                    titulo: 'O que é a mecânica dos fluidos?',
                    descricao: 'Alguém pode explicar os conceitos básicos da mecânica dos fluidos?',
                    usuario_id: usuario7.id,
                    disciplina_id: disciplina6.id
                });

                const resposta1 = await Respostas.create({
                    id_usuario: usuario2.id,
                    descricao: 'Uma integral é o inverso de uma derivada.',
                    pergunta_id: pergunta1.id
                });
                const resposta2 = await Respostas.create({
                    id_usuario: usuario1.id,
                    descricao: 'Você pode usar a fórmula de Bhaskara para resolver equações quadráticas.',
                    pergunta_id: pergunta2.id
                });
                const resposta3 = await Respostas.create({
                    id_usuario: usuario4.id,
                    descricao: 'O princípio de Le Chatelier afirma que se uma condição de um sistema em equilíbrio for alterada, o sistema reagirá para minimizar essa alteração.',
                    pergunta_id: pergunta3.id
                });
                const resposta4 = await Respostas.create({
                    id_usuario: usuario3.id,
                    descricao: 'A fotossíntese é o processo pelo qual as plantas convertem luz solar em energia química.',
                    pergunta_id: pergunta4.id
                });
                const resposta5 = await Respostas.create({
                    id_usuario: usuario1.id,
                    descricao: 'As causas da Primeira Guerra Mundial incluem alianças militares, imperialismo, militarismo e o assassinato do arquiduque Francisco Ferdinando.',
                    pergunta_id: pergunta5.id
                });
                const resposta6 = await Respostas.create({
                    id_usuario: usuario5.id,
                    descricao: 'Algoritmos de busca, como BFS e DFS, são usados para navegar em grafos.',
                    pergunta_id: pergunta6.id
                });
                const resposta7 = await Respostas.create({
                    id_usuario: usuario6.id,
                    descricao: 'A mecânica dos fluidos estuda o comportamento dos fluidos em movimento ou em repouso.',
                    pergunta_id: pergunta7.id
                });

                await Comentarios.create({
                    id_usuario: usuario1.id,
                    descricao: 'Ótima explicação!',
                    id_resposta: resposta1.id
                });
                await Comentarios.create({
                    id_usuario: usuario2.id,
                    descricao: 'Isso ajudou muito, obrigado!',
                    id_resposta: resposta2.id
                });
                await Comentarios.create({
                    id_usuario: usuario3.id,
                    descricao: 'Muito claro, obrigado!',
                    id_resposta: resposta3.id
                });
                await Comentarios.create({
                    id_usuario: usuario4.id,
                    descricao: 'Exatamente o que eu precisava saber.',
                    id_resposta: resposta4.id
                });
                await Comentarios.create({
                    id_usuario: usuario5.id,
                    descricao: 'Informação muito útil!',
                    id_resposta: resposta5.id
                });
                await Comentarios.create({
                    id_usuario: usuario7.id,
                    descricao: 'Excelente explicação sobre algoritmos.',
                    id_resposta: resposta6.id
                });
                await Comentarios.create({
                    id_usuario: usuario6.id,
                    descricao: 'Muito útil, obrigado!',
                    id_resposta: resposta7.id
                });

                console.log('Banco de dados populado com sucesso!');
            } else {
                console.log('Banco de dados já populado.');
            }
        } else {
            console.log('Alguma das tabelas não existe. Certifique-se de que as tabelas estão criadas antes de tentar popular o banco de dados.');
        }
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
    }
}

module.exports = populateDatabase;
