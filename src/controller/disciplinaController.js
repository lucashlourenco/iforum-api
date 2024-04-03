const Disciplinas = require("../models/disciplinasdb.js");

const buscarDisciplinas = async(request,response) => {
    try {
        let disciplinas = await Disciplinas.findAll();
        response.status(200).json(disciplinas);
    } catch (error) {
        console.error("Erro ao buscar os disciplinas:", error);
        response.status(500).json({ error: "Erro ao buscar os disciplinas" });
    }
}

const criarDisciplina = async (request,response)=> {
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
        response.status(500).json({ error: "Erro ao criar disciplina" });
    }
}

const atualizarDisciplina = async(request,response) => {
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
            response.status(404).json({ error: "Disciplina não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao atualizar disciplina:", error);
        response.status(500).json({ error: "Erro ao atualizar disciplina" });
    }
}

const deletarDisciplina = async (request,response)=> {
    try {
        let id = request.params.id;
        let disciplinas = await Disciplinas.findByPk(id);
        if (disciplinas) {
            await disciplinas.destroy();
            response.status(200).json({ message: "Disciplina deletada com sucesso" });
        } else {
            response.status(404).json({ error: "Disciplina não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao deletar disciplina:", error);
        response.status(500).json({ error: "Erro ao deletar disciplina" });
    }
}

module.exports= {
    buscarDisciplinas,
    criarDisciplina,
    atualizarDisciplina,
    deletarDisciplina


}
