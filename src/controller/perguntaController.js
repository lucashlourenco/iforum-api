const Perguntas = require("../models/perguntasdb.js");
const {Op} = require('sequelize');
const Usuarios = require('../models/usuariosdb');
const Disciplinas = require('../models/disciplinasdb');
const Cursos = require('../models/cursosdb');

const buscarPerguntas = async (request, response) => {
    const {courseId} = request.query; // Obtém o courseId dos parâmetros de consulta (query parameters)

    try {
        let queryOptions = {
            include: [
                {
                    model: Usuarios,
                    attributes: ['nome'],
                },
                {
                    model: Disciplinas,
                    attributes: ['nome'],
                    include: [
                        {
                            model: Cursos,
                            attributes: [],
                            where: courseId ? {id: courseId} : null, // Filtra pelo courseId se for fornecido
                        }
                    ],
                }
            ],
        };

        // Adiciona a cláusula where apenas se o courseId for fornecido
        if (courseId) {
            queryOptions.where = {
                '$Disciplina.Curso.id$': courseId, // Filtro para garantir que a pergunta pertença a uma disciplina do curso
            };
        }

        let perguntas = await Perguntas.findAll(queryOptions);

        // Retorna 404 se não encontrar nenhuma pergunta associada ao courseId
        if (perguntas.length === 0) {
            return response.status(404).json({message: "Nenhuma pergunta encontrada para o curso especificado."});
        }

        response.status(200).json(perguntas);
    } catch (error) {
        console.error("Erro ao buscar as perguntas:", error);
        response.status(500).json({error: "Erro ao buscar as perguntas"});
    }
};
const criarPergunta = async (request, response) => {
    try {
        const {titulo, descricao, usuario_id, disciplina_id} = request.body;
        let novaPergunta = await Perguntas.create({
            titulo,
            descricao,
            usuario_id,
            disciplina_id
        });
        console.log("Nova pergunta criada:", novaPergunta);

        response.status(201).json(novaPergunta);
    } catch (error) {
        console.error("Erro ao criar pergunta:", error);
        response.status(500).json({error: "Erro ao criar pergunta"});
    }
}

const atualizarPergunta = async (request, response) => {
    try {
        let id = request.params.id;
        let {titulo, descricao, usuario_id, disciplina_id} = request.body;
        let perguntas = await Perguntas.findByPk(id);
        if (perguntas) {
            perguntas.titulo = titulo ? titulo : perguntas.titulo;
            perguntas.descricao = descricao ? descricao : perguntas.descricao;
            perguntas.usuario_id = usuario_id ? usuario_id : perguntas.usuario_id;
            perguntas.disciplina_id = disciplina_id ? disciplina_id : perguntas.disciplina_id;
            await perguntas.save();
            response.status(200).json(perguntas);
        } else {
            response.status(404).json({error: "Pergunta não encontrada"});
        }
    } catch (error) {
        console.error("Erro ao atualizar pergunta:", error);
        response.status(500).json({error: "Erro ao atualizar pergunta"});
    }
}

const deletarPergunta = async (request, response) => {
    try {
        let id = request.params.id;
        let perguntas = await Perguntas.findByPk(id);
        if (perguntas) {
            await perguntas.destroy();
            response.status(200).json({message: "Pergunta deletada com sucesso"});
        } else {
            response.status(404).json({error: "Pergunta não encontrada"});
        }
    } catch (error) {
        console.error("Erro ao deletar Pergunta:", error);
        response.status(500).json({error: "Erro ao deletar pergunta"});
    }
}

const buscarPerguntasPorString = async (request, response) => {
    try {
        const searchString = request.params.string;
        let perguntas = await Perguntas.findAll({
            where: {
                descricao: {
                    [Op.like]: `%${searchString}%`
                }
            }
        });
        if (perguntas.length > 0) {
            response.status(200).json(perguntas);
        } else {
            response.status(404).json({error: "Nenhuma pergunta encontrada"});
        }
    } catch (error) {
        console.error("Erro ao buscar perguntas por string:", error);
        response.status(500).json({error: "Erro ao buscar perguntas por string"});
    }
}

const buscarPerguntasPorDisciplina = async (request, response) => {
    try {
        const disciplinaId = request.params.disciplinaId;

        let perguntas = await Perguntas.findAll({
            where: {
                disciplina_id: disciplinaId
            }
        });

        if (perguntas.length > 0) {
            response.status(200).json(perguntas);
        } else {
            response.status(404).json({error: "Nenhuma pergunta encontrada para a disciplina especificada"});
        }
    } catch (error) {
        console.error("Erro ao buscar perguntas por disciplina:", error);
        response.status(500).json({error: "Erro ao buscar perguntas por disciplina"});
    }
};

module.exports = {
    buscarPerguntas,
    criarPergunta,
    atualizarPergunta,
    deletarPergunta,
    buscarPerguntasPorString,
    buscarPerguntasPorDisciplina

}