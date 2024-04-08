const Comentarios = require("../models/comentariosdb.js");

const buscarComentarios = async(request,response) => {
    try {
        let comentarios = await Comentarios.findAll();
        response.status(200).json(comentarios);
    } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        response.status(500).json({ error: "Erro ao buscar comentários" });
    }
}

const criarComentario = async(request,response)=> {
    try {
        const {id_usuario, descricao, id_resposta} = request.body;
        let novoComentario = await Comentarios.create({
            id_usuario,
            descricao,
            id_resposta
        });
        console.log("Novo comentário criado:", novoComentario);

        response.status(201).json(novoComentario);
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        response.status(500).json({ error: "Erro ao criar comentário" });
    }
}

const atualizarComentario = async(request,response) => {
    try {
        let id = request.params.id;
        let {id_usuario, descricao, id_resposta} = request.body;
        let comentarios = await Comentarios.findByPk(id);
        if (comentarios) {
            comentarios.id_usuario = id_usuario ? id_usuario : comentarios.id_usuario;
            comentarios.descricao = descricao ? descricao : comentarios.descricao;
            comentarios.id_resposta = id_resposta ? id_resposta : comentarios.id_resposta;
            await comentarios.save();
            response.status(200).json(comentarios);
        } else {
            response.status(404).json({ error: "Comentário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar comentário:", error);
        response.status(500).json({ error: "Erro ao atualizar comentário" });
    }
}

const deletarComentario = async (request,response) => {
    try {
        let id = request.params.id;
        let comentarios = await Comentarios.findByPk(id);
        if (comentarios) {
            await comentarios.destroy();
            response.status(200).json({ message: "Comentário deletado com sucesso" });
        } else {
            response.status(404).json({ error: "Comentário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar comentário:", error);
        response.status(500).json({ error: "Erro ao deletar comentário" });
    }
}

module.exports = {
    buscarComentarios,
    criarComentario,
    atualizarComentario,
    deletarComentario,
}