const Comentarios = require('../models/Comentarios');
const Cursos = require('../models/Cursos');
const Respostas = require('../models/Respostas');
const Usuarios = require('../models/Usuarios');

const ComentariosController = {
    async getAll(req, res){
        try{
            const comentarios = await Comentarios.findAll();
            res.json(comentarios);
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    },

    async create(req, res){
        try{
          const comentarios = await Comentarios.create(req.body); 
          res.status(201).json({message: "Comentário criado com sucesso."});
        }
        catch(error){
            res.status(400).json({message: error.message});
        }
    },

    async getById(req, res){
        try{
            const id = req.params.id;
            const comentario = await Comentarios.findByPk(id, { 
                include: [
                { model: Respostas },
                { model: Usuarios }
            ] });

            if(!comentario){
                res.status(404).json({message: "Comentario não encontrada"});
            }
            else{
                res.status(200).send(comentario);
            }

        }catch(error){
            res.status(500).json({message: error.message})
        }
    },

    async update(req, res) {
        try {
            const { descricao, resposta_id, usuario_id } = req.body;
            const { id } = req.params;

            await Comentarios.update({
                descricao,
                resposta_id,
                usuario_id
            }, {
                where: {
                    id: id 
                }
            });
    
            res.status(200).send({ message: "Comentario atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async delete(req, res){
        try{
            const comentario_id = req.params.id;
            const deleted = await Comentarios.destroy({
                where: {
                    id: comentario_id
                }
            });
            if(deleted){
                res.json({message: "Comentario deletado com sucesso."})
            }
            else{
                res.status(400).json({message: "Comentario não encontrado."})
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }  

};

module.exports = ComentariosController;