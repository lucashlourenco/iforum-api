const Respostas = require("../models/respostasdb.js");
const Usuarios = require("../models/usuariosdb.js");

const { Op } = require('sequelize');
const Comentarios = require("../models/comentariosdb");

const buscarRespostas = async (request, response) => {
  try {
    let respostas = await Respostas.findAll();
    response.status(200).json(respostas);
  } catch (error) {
    console.error("Erro ao buscar respostas:", error);
    response.status(500).json({ error: "Erro ao buscar respostas" });
  }
}


const criarResposta = async (request, response) => {
  try {
    const { id_usuario, descricao, pergunta_id } = request.body;
    p_id = parseInt(pergunta_id, 10)
    let novaResposta = await Respostas.create({
      id_usuario,
      descricao,
      pergunta_id: p_id,
      curtidas: 0
    });
    console.log("Nova resposta criada:", novaResposta);

    response.status(201).json(novaResposta);
  } catch (error) {
    console.error("Erro ao criar resposta:", error);
    response.status(500).json({ error: "Erro ao criar resposta" });
  }
};

const atualizarResposta = async (request, response) => {
  try {
    let id = request.params.id;
    let { id_usuario, descricao, pergunta_id } = request.body;
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

const deletarResposta = async (request, response) => {
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

const buscarRespostasPorString = async (request, response) => {
  try {
    const searchString = request.params.string;
    let respostas = await Respostas.findAll({
      where: {
        descricao: {
          [Op.like]: `%${searchString}%`
        }
      }
    });
    if (respostas.length > 0) {
      response.status(200).json(respostas);
    } else {
      response.status(404).json({ error: "Nenhuma resposta encontrada" });
    }
  } catch (error) {
    console.error("Erro ao buscar respostas por string:", error);
    response.status(500).json({ error: "Erro ao buscar respostas por string" });
  }
}


const buscarRespostaPorId = async (request, response) => {
  try {
    const id = request.params.id;

    let resposta = await Respostas.findByPk(id);

    if (resposta) {
      response.status(200).json(resposta);
    } else {
      response.status(404).json({ error: "Resposta não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao buscar resposta por ID:", error);
    response.status(500).json({ error: "Erro ao buscar resposta" });
  }
};

const buscarRespostasPorPerguntaId = async (request, response) => {
  try {
    console.log(request.params)
    const perguntaId = request.params.perguntaId;  // Captura o ID da pergunta da URL

    let respostas = await Respostas.findAll({
      where: { pergunta_id: perguntaId },  // Filtra pelas respostas associadas à pergunta
      include: [
        {
          model: Usuarios,  // Inclui os dados do usuário que respondeu
          attributes: ['nome']  // Retorna apenas o nome do usuário
        }
      ]
    });

    if (respostas.length > 0) {
      response.status(200).json(respostas);
    } else {
      response.status(404).json({ message: "Nenhuma resposta encontrada para esta pergunta." });
    }
  } catch (error) {
    console.error("Erro ao buscar respostas por pergunta:", error);
    response.status(500).json({ error: "Erro ao buscar respostas" });
  }
};
const buscarComentariosPorRespostaId = async (request, response) => {
  try {
    const respostaId = request.params.respostaId;  // Captura o ID da resposta da URL

    let comentarios = await Comentarios.findAll({
      where: { id_resposta: respostaId },  // Filtra pelos comentários associados à resposta
      include: [
        {
          model: Usuarios,  // Inclui os dados do usuário que postou o comentário
          attributes: ['nome']  // Retorna apenas o nome do usuário
        }
      ]
    });

    if (comentarios.length > 0) {
      response.status(200).json(comentarios);
    } else {
      response.status(404).json({ message: "Nenhum comentário encontrado para esta resposta." });
    }
  } catch (error) {
    console.error("Erro ao buscar comentários por resposta:", error);
    response.status(500).json({ error: "Erro ao buscar comentários" });
  }
};

const adicionarLike = async (request, response) => {
  try {
    let id = request.params.id;  // ID da resposta
    let resposta = await Respostas.findByPk(id);  // Busca a resposta pelo ID

    if (resposta) {
      resposta.curtidas += 1;  // Incrementa o número de curtidas
      await resposta.save();  // Salva a mudança no banco de dados
      response.status(200).json({ message: "Like adicionado com sucesso", curtidas: resposta.curtidas });
    } else {
      response.status(404).json({ error: "Resposta não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao adicionar like:", error);
    response.status(500).json({ error: "Erro ao adicionar like" });
  }
};

const removerLike = async (request, response) => {
  try {
    let id = request.params.id;  // ID da resposta
    let resposta = await Respostas.findByPk(id);  // Busca a resposta pelo ID

    if (resposta) {
      if (resposta.curtidas > 0) {  // Verifica se há curtidas para remover
        resposta.curtidas -= 1;  // Decrementa o número de curtidas
        await resposta.save();  // Salva a mudança no banco de dados
        response.status(200).json({ message: "Like removido com sucesso", curtidas: resposta.curtidas });
      } else {
        response.status(400).json({ error: "Não há curtidas para remover" });
      }
    } else {
      response.status(404).json({ error: "Resposta não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao remover like:", error);
    response.status(500).json({ error: "Erro ao remover like" });
  }
};

module.exports = {
  buscarRespostas,
  criarResposta,
  atualizarResposta,
  deletarResposta,
  buscarRespostasPorString,
  buscarRespostaPorId,
  buscarRespostasPorPerguntaId,
  buscarComentariosPorRespostaId,
  adicionarLike,
  removerLike
}
