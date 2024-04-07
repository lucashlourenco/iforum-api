const Usuarios = require('../models/Usuarios');

const UsuariosController = {
    async getAll(req, res){
        try{
            const usuarios = await Usuarios.findAll();
            res.json(usuarios);
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    },

    async create(req, res){
        try{
          const usuario = await Usuarios.create(req.body); 
          res.status(201).json({message: "Usuário criado com sucesso."});
        }
        catch(error){
            res.status(400).json({message: "Erro ao criar usuário."});
        }
    },

    async getById(req, res){
        try{
            const id = req.params.id;
            const usuario = await Usuarios.findByPk(id);

            if(usuario === null){
                res.status(404).json({message: "Usuário não encontrado"});
            }
            else{
                res.status(200).send(usuario);
            }

        }catch(error){
            res.status(500).json({message: error.message})
        }
    },

    async update(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const { id } = req.params;

            await Usuarios.update({
                nome,
                email,
                senha
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
            const usuario_id = req.params.id;
            const deleted = await Usuarios.destroy({
                where: {
                    id: usuario_id
                }
            });
            if(deleted){
                res.json({message: "Usuario deletado com sucesso."})
            }
            else{
                res.status(400).json({message: "Usuário não encontrado."})
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }  

};

module.exports = UsuariosController;