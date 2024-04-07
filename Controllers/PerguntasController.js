const Disciplinas = require('../models/Disciplinas');
const Usuarios = require('../models/Usuarios');
const Perguntas = require('../models/Perguntas');

const PerguntasController = {
    async getAll(req, res){
        try{
            const perguntas = await Perguntas.findAll();
            res.json(perguntas);
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    },

    async create(req, res){
        try{
          const perguntas = await Perguntas.create(req.body); 
          res.status(201).json({message: "Pergunta criada com sucesso."});
        }
        catch(error){
            res.status(400).json({message: error.message});
        }
    },

    async getById(req, res) {
        try {
            const id = req.params.id;
            const pergunta = await Perguntas.findByPk(id, {
                include: [
                    { model: Usuarios },
                    { model: Disciplinas }
                ]
            });
    
            if (!pergunta) {
                res.status(404).json({ message: "Pergunta não encontrada" });
            } else {
                res.status(200).send(pergunta);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
            const { descricao, usuario_id, disciplina_id } = req.body;
            const { id } = req.params;

            await Perguntas.update({
                descricao,
                usuario_id,
                disciplina_id
            }, {
                where: {
                    id: id 
                }
            });
    
            res.status(200).send({ message: "Disciplina atualizada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async delete(req, res){
        try{
            const pergunta_id = req.params.id;
            const deleted = await Perguntas.destroy({
                where: {
                    id: pergunta_id
                }
            });
            if(deleted){
                res.json({message: "Pergunta deletada com sucesso."})
            }
            else{
                res.status(400).json({message: "Pergunta não encontrada."})
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }  

};

module.exports = PerguntasController;