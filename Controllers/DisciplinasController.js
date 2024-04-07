const Disciplinas = require('../models/Disciplinas');
const Cursos = require('../models/Cursos')

const DisciplinasController = {
    async getAll(req, res){
        try{
            const disciplinas = await Disciplinas.findAll();
            res.json(disciplinas);
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    },

    async create(req, res){
        try{
          const disciplinas = await Disciplinas.create(req.body); 
          res.status(201).json({message: "Disciplina criado com sucesso."});
        }
        catch(error){
            res.status(400).json({message: error.message});
        }
    },

    async getById(req, res){
        try{
            const id = req.params.id;
            const disciplina = await Disciplinas.findByPk(id, { include: Cursos });

            if(!disciplina){
                res.status(404).json({message: "Disciplina não encontrada"});
            }
            else{
                res.status(200).send(disciplina);
            }

        }catch(error){
            res.status(500).json({message: error.message})
        }
    },

    async update(req, res) {
        try {
            const { nome, periodo, curso_id } = req.body;
            const { id } = req.params;

            await Disciplinas.update({
                nome,
                periodo,
                curso_id
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
            const curso_id = req.params.id;
            const deleted = await Disciplinas.destroy({
                where: {
                    id: curso_id
                }
            });
            if(deleted){
                res.json({message: "Disciplina deletada com sucesso."})
            }
            else{
                res.status(400).json({message: "Disciplina não encontrada."})
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }  

};

module.exports = DisciplinasController;