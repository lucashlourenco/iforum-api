const Perguntas = require("../models/perguntasdb.js");
const {Op} = require('sequelize');
const Usuarios = require('../models/usuariosdb');
const Disciplinas = require('../models/disciplinasdb');
const Cursos = require('../models/cursosdb');

const buscarPerguntas = async (request, response) => {
    const {courseId, disciplinaIds, periodos} = request.query; // Obtém courseId, disciplinaIds, e periodos dos parâmetros de consulta

    try {
        let disciplinaIdArray = [];
        let periodoArray = [];

        // Verifica se disciplinaIds foi fornecido e é um array válido
        if (disciplinaIds) {
            try {
                disciplinaIdArray = JSON.parse(disciplinaIds);
                if (!Array.isArray(disciplinaIdArray)) {
                    return response.status(400).json({error: "O parâmetro disciplinaIds deve ser um array."});
                }
            } catch (e) {
                return response.status(400).json({error: "O parâmetro disciplinaIds deve ser um array JSON válido."});
            }
        }

        // Verifica se periodos foi fornecido e é um array válido
        if (periodos) {
            try {
                periodoArray = JSON.parse(periodos);
                if (!Array.isArray(periodoArray)) {
                    return response.status(400).json({error: "O parâmetro periodos deve ser um array."});
                }
            } catch (e) {
                return response.status(400).json({error: "O parâmetro periodos deve ser um array JSON válido."});
            }
        }

        let queryOptions = {
            include: [
                {
                    model: Usuarios,
                    attributes: ['nome'],
                },
                {
                    model: Disciplinas,
                    attributes: ['nome', 'periodo'], // Inclui o período nas disciplinas
                    include: [
                        {
                            model: Cursos,
                            attributes: [],
                            where: courseId ? {id: courseId} : null, // Filtra pelo courseId se for fornecido
                        }
                    ],
                    where: {
                        ...(disciplinaIdArray.length > 0 && {id: {[Op.in]: disciplinaIdArray}}), // Filtra pelo array de disciplinaIds se for fornecido
                        ...(periodoArray.length > 0 && {periodo: {[Op.in]: periodoArray}}), // Filtra pelo array de periodos se for fornecido
                    },
                }
            ],
        };

        let perguntas = await Perguntas.findAll(queryOptions);

        // Retorna 404 se não encontrar nenhuma pergunta associada aos filtros fornecidos
        if (perguntas.length === 0) {
            return response.status(404).json({message: "Nenhuma pergunta encontrada para os filtros especificados."});
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

        // Cria a nova pergunta
        let novaPergunta = await Perguntas.create({
            titulo,
            descricao,
            usuario_id,
            disciplina_id
        });

        console.log("Nova pergunta criada:", novaPergunta);

        // Após criar a pergunta, busque ela novamente, incluindo os dados de Usuario e Disciplina
        novaPergunta = await Perguntas.findOne({
            where: {id: novaPergunta.id},
            include: [
                {model: Usuarios, attributes: ['nome']}, // Inclui o nome do usuário
                {model: Disciplinas, attributes: ['nome']} // Inclui o nome da disciplina
            ]
        });

        response.status(201).json(novaPergunta);
    } catch (error) {
        console.error("Erro ao criar pergunta:", error);
        response.status(500).json({error: "Erro ao criar pergunta"});
    }
};

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


const buscarPerguntaPorId = async (request, response) => {
    try {
        const id = request.params.id;

        let pergunta = await Perguntas.findOne({
            where: {id},
            include: [
                {
                    model: Usuarios,
                    attributes: ['nome']  // Inclui o nome do usuário que fez a pergunta
                },
                {
                    model: Disciplinas,
                    attributes: ['nome'],  // Inclui o nome da disciplina relacionada à pergunta
                    include: [
                        {
                            model: Cursos,
                            attributes: ['nome']  // Inclui o nome do curso relacionado à disciplina
                        }
                    ]
                }
            ]
        });

        if (pergunta) {
            response.status(200).json(pergunta);
        } else {
            response.status(404).json({error: "Pergunta não encontrada"});
        }
    } catch (error) {
        console.error("Erro ao buscar pergunta por ID:", error);
        response.status(500).json({error: "Erro ao buscar pergunta"});
    }
};


module.exports = {
    buscarPerguntas,
    criarPergunta,
    atualizarPergunta,
    deletarPergunta,
    buscarPerguntasPorString,
    buscarPerguntasPorDisciplina,
    buscarPerguntaPorId

}