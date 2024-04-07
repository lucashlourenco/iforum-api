const Disciplinas = require('../models/Disciplinas');
const Usuarios = require('../models/Usuarios');
const Perguntas = require('../models/Perguntas');
const Respostas = require('../models/Respostas');

const RespostasController = {
    async getAll(req, res){
        try{
            const respostas = await Respostas.findAll();
            res.json(respostas);
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    },

    async create(req, res){
        try{
          const respostas = await Respostas.create(req.body); 
          res.status(201).json({message: "Resposta criada com sucesso."});
        }
        catch(error){
            res.status(400).json({message: error.message});
        }
    },

    async getById(req, res) {
        try {
            const id = req.params.id;
            const resposta = await Respostas.findByPk(id, {
                include: [
                    { model: Usuarios },
                    { model: Perguntas }
                ]
            });
    
            if (!resposta) {
                res.status(404).json({ message: "Resposta não encontrada" });
            } else {
                res.status(200).send(resposta);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
            const { descricao, curtidas, pergunta_id, usuario_id } = req.body;
            const { id } = req.params;

            await Respostas.update({
                descricao,
                curtidas,
                pergunta_id,
                usuario_id
            }, {
                where: {
                    id: id 
                }
            });
    
            res.status(200).send({ message: "Resposta atualizada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async delete(req, res){
        try{
            const resposta_id = req.params.id;
            const deleted = await Respostas.destroy({
                where: {
                    id: resposta_id
                }
            });
            if(deleted){
                res.json({message: "Resposta deletada com sucesso."})
            }
            else{
                res.status(400).json({message: "Resposta não encontrada."})
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }  

};

module.exports = RespostasController;