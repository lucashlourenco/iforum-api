const Cursos = require("../models/cursosdb.js");
const Disciplinas = require("../models/disciplinasdb.js");


const buscarCursos = async (request, response) => {
    try {
        let cursos = await Cursos.findAll();
        response.status(200).json(cursos);
    } catch (error) {
        console.error("Erro ao buscar os cursos:", error);
        response.status(500).json({error: "Erro ao buscar os cursos"});
    }
}

const criarCurso = async (request, response) => {
    try {
        const {nome} = request.body;
        let novoCurso = await Cursos.create({
            nome
        });
        console.log("Novo curso criado:", novoCurso);

        response.status(201).json(novoCurso);
    } catch (error) {
        console.error("Erro ao criar curso:", error);
        response.status(500).json({error: "Erro ao criar curso"});
    }
}

const atualizarCurso = async (request, response) => {
    try {
        let id = request.params.id;
        let {nome} = request.body;
        let cursos = await Cursos.findByPk(id);
        if (cursos) {
            cursos.nome = nome ? nome : cursos.nome;
            await cursos.save();
            response.status(200).json(cursos);
        } else {
            response.status(404).json({error: "Usuário não encontrado"});
        }
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        response.status(500).json({error: "Erro ao atualizar curso"});
    }
}
const deletarCurso = async (request, response) => {
    try {
        let id = request.params.id;
        let cursos = await Cursos.findByPk(id);
        if (cursos) {
            await cursos.destroy();
            response.status(200).json({message: "Curso deletado com sucesso"});
        } else {
            response.status(404).json({error: "Curso não encontrado"});
        }
    } catch (error) {
        console.error("Erro ao deletar curso:", error);
        response.status(500).json({error: "Erro ao deletar curso"});
    }
}

const buscarQuantidadePeriodos = async (request, response) => {
    try {
        const {id} = request.params; // Obtém o ID do curso dos parâmetros da URL

        // Busca todas as disciplinas relacionadas ao curso específico e conta os períodos distintos
        const periodos = await Disciplinas.findAll({
            where: {curso_id: id}, // Filtra pelo ID do curso
            attributes: ['periodo'], // Seleciona apenas o campo 'periodo'
            group: ['periodo'] // Agrupa por 'periodo' para garantir que são distintos
        });

        const quantidadePeriodos = periodos.length; // Número de períodos distintos

        response.status(200).json({quantidadePeriodos});
    } catch (error) {
        console.error("Erro ao buscar a quantidade de períodos:", error);
        response.status(500).json({error: "Erro ao buscar a quantidade de períodos"});
    }
};

module.exports = {
    buscarCursos,
    criarCurso,
    atualizarCurso,
    deletarCurso,
    buscarQuantidadePeriodos
}