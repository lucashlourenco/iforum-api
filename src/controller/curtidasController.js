const Curtidas = require("../models/curtidasdb.js");
const Respostas = require("../models/respostasdb.js");
const Usuarios = require("../models/usuariosdb.js");

const toggleCurtida = async (request, response) => {
    try {
        const {id_usuario, id_resposta} = request.body;

        // Busca a resposta pelo ID
        const resposta = await Respostas.findByPk(id_resposta);
        if (!resposta) {
            return response.status(404).json({error: "Resposta não encontrada"});
        }

        // Busca o dono da resposta
        const usuarioCurtido = await Usuarios.findByPk(resposta.id_usuario); // O usuário que escreveu a resposta

        if (!usuarioCurtido) {
            return response.status(404).json({error: "Usuário que escreveu a resposta não encontrado"});
        }

        // Verifica se o usuário já curtiu a resposta
        const curtidaExistente = await Curtidas.findOne({
            where: {id_usuario, id_resposta}
        });

        let message;
        let totalCurtidasResposta = resposta.curtidas;

        if (curtidaExistente) {
            // Se a curtida existir, remove a curtida (descurtir)
            await Curtidas.destroy({where: {id_usuario, id_resposta}});

            // Decrementa o número de curtidas da resposta
            if (totalCurtidasResposta > 0) {
                resposta.curtidas -= 1;
                totalCurtidasResposta = resposta.curtidas;
            }

            // Decrementa o número total de curtidas do usuário que foi curtido (dono da resposta)
            if (usuarioCurtido.total_curtidas > 0) {
                usuarioCurtido.total_curtidas -= 1;
            }

            message = "Curtida removida";
        } else {
            // Se a curtida não existir, adiciona uma nova curtida
            await Curtidas.create({id_usuario, id_resposta});

            // Incrementa o número de curtidas da resposta
            resposta.curtidas += 1;
            totalCurtidasResposta = resposta.curtidas;

            // Incrementa o número total de curtidas do usuário que foi curtido (dono da resposta)
            usuarioCurtido.total_curtidas += 1;

            message = "Curtida adicionada";
        }

        // Salva as atualizações na resposta e no usuário que foi curtido
        await resposta.save();
        await usuarioCurtido.save();

        // Retorna o resultado, incluindo a quantidade atualizada de curtidas da resposta
        return response.status(200).json({
            message,
            curtidasResposta: totalCurtidasResposta, // Retorna o total atualizado de curtidas da resposta
            curtidasUsuarioCurtido: usuarioCurtido.total_curtidas
        });

    } catch (error) {
        console.error("Erro ao alternar curtida:", error);
        return response.status(500).json({error: "Erro ao alternar curtida"});
    }
};

const verificarCurtidasUsuario = async (req, res) => {
    try {
        const {id_usuario, id_pergunta} = req.params;

        // Busca todas as curtidas do usuário relacionadas às respostas da pergunta
        const curtidas = await Curtidas.findAll({
            where: {id_usuario},
            include: [{
                model: Respostas,
                as: 'resposta', // Especifica o alias utilizado na associação
                where: {pergunta_id: id_pergunta},
                attributes: ['id']  // Apenas retorna o ID das respostas curtidas
            }]
        });

        // Retorna uma lista dos IDs das respostas que o usuário curtiu
        const respostasCurtidas = curtidas.map(curtida => curtida.id_resposta);

        res.status(200).json(respostasCurtidas);
    } catch (error) {
        console.error("Erro ao verificar curtidas:", error);
        res.status(500).json({error: "Erro ao verificar curtidas"});
    }
};

module.exports = {
    toggleCurtida,
    verificarCurtidasUsuario
};
