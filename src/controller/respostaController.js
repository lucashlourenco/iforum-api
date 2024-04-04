const Respostas = require("../models/respostasdb.js");

const buscarRespostas = async(request,response) => {
    try {
        let respostas = await Respostas.findAll();
        response.status(200).json(respostas);
    } catch (error) {
        console.error("Erro ao buscar respostas:", error);
        response.status(500).json({ error: "Erro ao buscar respostas" });
    }
}

const criarResposta = async(request,response)=> {
    try {
        const {id_usuario, descricao, pergunta_id} = request.body;
        let novaResposta = await Respostas.create({
            id_usuario,
            descricao,
            pergunta_id
        });
        console.log("Nova resposta criada:", novaResposta);

        response.status(201).json(novaResposta);
    } catch (error) {
        console.error("Erro ao criar resposta:", error);
        response.status(500).json({ error: "Erro ao criar resposta" });
    }
}

const atualizarResposta = async(request,response) => {
    try {
        let id = request.params.id;
        let {id_usuario, descricao, pergunta_id} = request.body;
        let respostas = await Respostas.findByPk(id);
        if (respostas) {
            respostas.id_usuario = id_usuario ? id_usuario : respostas.id_usuario;
            respostas.descricao = descricao ? descricao : respostas.descricao;
            respostas.pergunta_id = pergunta_id ? pergunta_id : respostas.pergunta_id;
            await respostas.save();
            response.status(200).json(respostas);
        } else {
            response.status(404).json({ error: "Resposta não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao atualizar resposta:", error);
        response.status(500).json({ error: "Erro ao atualizar resposta" });
    }
}

const deletarResposta = async (request,response) => {
    try {
        let id = request.params.id;
        let respostas = await Respostas.findByPk(id);
        if (respostas) {
            await respostas.destroy();
            response.status(200).json({ message: "Resposta deletada com sucesso" });
        } else {
            response.status(404).json({ error: "Resposta não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao deletar Resposta:", error);
        response.status(500).json({ error: "Erro ao deletar resposta" });
    
    }
}

module.exports = {
    buscarRespostas,
    criarResposta,
    atualizarResposta,
    deletarResposta,
}