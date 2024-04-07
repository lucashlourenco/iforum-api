const Cursos = require('../models/Cursos');

const CursosController = {
    async getAll(req, res){
        try{
            const cursos = await Cursos.findAll();
            res.json(cursos);
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    },

    async create(req, res){
        try{
          const cursos = await Cursos.create(req.body); 
          res.status(201).json({message: "Curso criado com sucesso."});
        }
        catch(error){
            res.status(400).json({message: "Erro ao criar curso."});
        }
    },

    async getById(req, res){
        try{
            const id = req.params.id;
            const curso = await Cursos.findByPk(id);

            if(curso === null){
                res.status(404).json({message: "Curso não encontrado"});
            }
            else{
                res.status(200).send(curso);
            }

        }catch(error){
            res.status(500).json({message: error.message})
        }
    },

    async update(req, res) {
        try {
            const { nome } = req.body;
            const { id } = req.params;

            await Cursos.update({
                nome
            }, {
                where: {
                    id: id 
                }
            });
    
            res.status(200).send({ message: "Registro atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async delete(req, res){
        try{
            const curso_id = req.params.id;
            const deleted = await Cursos.destroy({
                where: {
                    id: curso_id
                }
            });
            if(deleted){
                res.json({message: "Curso deletado com sucesso."})
            }
            else{
                res.status(400).json({message: "Curso não encontrado."})
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }  

};

module.exports = CursosController;