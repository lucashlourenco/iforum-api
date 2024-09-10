const Disciplinas = require("../models/disciplinasdb.js");
const {Op} = require("sequelize");
const Cursos = require('../models/cursosdb');


const buscarDisciplinas = async (request, response) => {
    const {courseId} = request.query;

    try {
        let queryOptions = {};

        if (courseId) {
            queryOptions = {
                include: [
                    {
                        model: Cursos,
                        attributes: [],
                        where: {id: courseId}
                    }
                ]
            };
        }

        let disciplinas = await Disciplinas.findAll(queryOptions);

        if (courseId && disciplinas.length === 0) {
            return response.status(404).json({message: "Nenhuma disciplina encontrada para o curso especificado."});
        }

        response.status(200).json(disciplinas);
    } catch (error) {
        console.error("Erro ao buscar os disciplinas:", error);
        response.status(500).json({error: "Erro ao buscar os disciplinas"});
    }
};

const criarDisciplina = async (request, response) => {
    try {
        const {nome, periodo, curso_id} = request.body;
        let novaDisciplina = await Disciplinas.create({
            nome,
            periodo,
            curso_id
        });
        console.log("Nova disciplina criada:", novaDisciplina);

        response.status(201).json(novaDisciplina);
    } catch (error) {
        console.error("Erro ao criar disciplina:", error);
        response.status(500).json({error: "Erro ao criar disciplina"});
    }
}

const buscarDisciplinasPorPeriodo = async (request, response) => {
    try {
        const {periodo} = request.query;

        if (!periodo) {
            return response.status(400).json({error: "O parâmetro 'periodo' é obrigatório"});
        }

        // Se 'periodo' for uma string, divida-o em um array
        const periodos = Array.isArray(periodo) ? periodo : periodo.split(',');

        let disciplinas = await Disciplinas.findAll({
            where: {
                periodo: {
                    [Op.in]: periodos  // Utilizando o operador IN do Sequelize
                }
            }
        });

        if (disciplinas.length > 0) {
            response.status(200).json(disciplinas);
        } else {
            response.status(404).json({message: "Nenhuma disciplina encontrada para os períodos especificados"});
        }
    } catch (error) {
        console.error("Erro ao buscar as disciplinas por período:", error);
        response.status(500).json({error: "Erro ao buscar as disciplinas por período"});
    }
}

const atualizarDisciplina = async (request, response) => {
    try {
        let id = request.params.id;
        let {nome, periodo, curso_id} = request.body;
        let disciplinas = await Disciplinas.findByPk(id);
        if (disciplinas) {
            disciplinas.nome = nome ? nome : disciplinas.nome;
            disciplinas.periodo = periodo ? periodo : disciplinas.periodo;
            disciplinas.curso_id = curso_id ? curso_id : disciplinas.curso_id;
            await disciplinas.save();
            response.status(200).json(disciplinas);
        } else {
            response.status(404).json({error: "Disciplina não encontrada"});
        }
    } catch (error) {
        console.error("Erro ao atualizar disciplina:", error);
        response.status(500).json({error: "Erro ao atualizar disciplina"});
    }
}

const deletarDisciplina = async (request, response) => {
    try {
        let id = request.params.id;
        let disciplinas = await Disciplinas.findByPk(id);
        if (disciplinas) {
            await disciplinas.destroy();
            response.status(200).json({message: "Disciplina deletada com sucesso"});
        } else {
            response.status(404).json({error: "Disciplina não encontrada"});
        }
    } catch (error) {
        console.error("Erro ao deletar disciplina:", error);
        response.status(500).json({error: "Erro ao deletar disciplina"});
    }
}

const buscarDisciplinaPorId = async (request, response) => {
    try {
        const id = request.params.id;
        const disciplina = await Disciplinas.findByPk(id, {
            include: [
                {
                    model: Cursos,
                    attributes: ['nome']  // Inclui o nome do curso ao qual a disciplina pertence
                }
            ]
        });

        if (disciplina) {
            response.status(200).json(disciplina);
        } else {
            response.status(404).json({error: "Disciplina não encontrada"});
        }
    } catch (error) {
        console.error("Erro ao buscar disciplina por ID:", error);
        response.status(500).json({error: "Erro ao buscar disciplina"});
    }
};

module.exports = {
    buscarDisciplinas,
    criarDisciplina,
    atualizarDisciplina,
    deletarDisciplina,
    buscarDisciplinasPorPeriodo,
    buscarDisciplinaPorId

}
